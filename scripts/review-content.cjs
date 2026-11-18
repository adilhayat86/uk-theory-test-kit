/** Static, content-addressed review catalogue. This never executes TypeScript data. */
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const ts = require('typescript');
const { loadBank } = require('./check-mvp-content.cjs');

const ROOT = path.resolve(__dirname, '..');
const hashBytes = bytes => createHash('sha256').update(bytes).digest('hex');

function canonical(value) {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return value;
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype) {
    return Object.fromEntries(Object.keys(value).sort().filter(key => value[key] !== undefined)
      .map(key => [key, canonical(value[key])]));
  }
  throw new Error('Review content must contain only finite JSON data');
}
const hashContent = value => hashBytes(Buffer.from(JSON.stringify(canonical(value))));
const relative = (root, file) => path.relative(root, file).split(path.sep).join('/');
function within(directory, filename) {
  const value = path.relative(directory, filename);
  return value !== '..' && !value.startsWith('..' + path.sep) && !path.isAbsolute(value);
}

/** Resolve const objects/arrays, named imports, aliases and bundled PNG/MP4 requires only. */
function createStaticReader(root = ROOT) {
  root = fs.realpathSync(root);
  const dataRoot = fs.realpathSync(path.join(root, 'src/data'));
  const assetRoot = fs.realpathSync(path.join(root, 'src/assets'));
  const modules = new Map(), values = new Map(), resolving = new Set(), media = new Map();
  function fail(module, node, message) {
    const point = module.source.getLineAndCharacterOfPosition(node.getStart(module.source));
    throw new Error(`${relative(root, module.source.fileName)}:${point.line + 1}:${point.character + 1}: ${message}`);
  }
  function inspect(file) {
    const filename = fs.realpathSync(file);
    if (!within(dataRoot, filename)) throw new Error('Review data imports must stay in src/data');
    if (modules.has(filename)) return modules.get(filename);
    const source = ts.createSourceFile(filename, fs.readFileSync(filename, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    if (source.parseDiagnostics.length) throw new Error('Invalid TypeScript review source: ' + relative(root, filename));
    const module = { source, bindings: new Map(), exports: new Map() };
    modules.set(filename, module);
    const add = (name, binding, node) => {
      if (module.bindings.has(name)) fail(module, node, 'Duplicate static binding: ' + name);
      module.bindings.set(name, binding);
    };
    for (const statement of source.statements) {
      if (ts.isImportDeclaration(statement)) {
        const clause = statement.importClause;
        if (clause?.isTypeOnly) continue;
        if (!clause || clause.name || !clause.namedBindings || !ts.isNamedImports(clause.namedBindings)) {
          fail(module, statement, 'Only named static data imports are supported');
        }
        const items = clause.namedBindings.elements.filter(item => !item.isTypeOnly);
        if (!items.length) continue;
        if (!ts.isStringLiteralLike(statement.moduleSpecifier) || !/^\.\.?\//.test(statement.moduleSpecifier.text)) {
          fail(module, statement, 'Review data imports must use relative literal paths');
        }
        const target = path.resolve(path.dirname(filename), statement.moduleSpecifier.text);
        const candidates = path.extname(target) ? [target] : [target + '.ts', path.join(target, 'index.ts')];
        const imported = candidates.find(candidate => path.extname(candidate) === '.ts' && fs.existsSync(candidate));
        if (!imported) fail(module, statement, 'Missing static TypeScript data import');
        for (const item of items) add(item.name.text, { imported, name: item.propertyName?.text ?? item.name.text }, item);
      } else if (ts.isVariableStatement(statement)) {
        const constant = Boolean(statement.declarationList.flags & ts.NodeFlags.Const);
        const exported = statement.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword);
        for (const declaration of statement.declarationList.declarations) {
          if (!ts.isIdentifier(declaration.name)) continue;
          add(declaration.name.text, { constant, initializer: declaration.initializer }, declaration);
          if (exported) module.exports.set(declaration.name.text, declaration.name.text);
        }
      } else if (ts.isExportDeclaration(statement) && !statement.isTypeOnly) {
        if (statement.moduleSpecifier || !statement.exportClause || !ts.isNamedExports(statement.exportClause)) {
          fail(module, statement, 'Only local named static exports are supported');
        }
        for (const item of statement.exportClause.elements) if (!item.isTypeOnly) {
          module.exports.set(item.name.text, item.propertyName?.text ?? item.name.text);
        }
      }
    }
    return module;
  }
  function resolve(module, name) {
    const key = module.source.fileName + ':' + name;
    if (values.has(key)) return values.get(key);
    if (resolving.has(key)) throw new Error('Cyclic static review data: ' + name);
    const binding = module.bindings.get(name);
    if (!binding) throw new Error('Unknown static review binding: ' + name);
    resolving.add(key);
    try {
      let value;
      if (binding.imported) {
        const imported = inspect(binding.imported);
        const target = imported.exports.get(binding.name);
        if (!target) throw new Error('Missing static export: ' + binding.name);
        value = resolve(imported, target);
      } else {
        if (!binding.constant || !binding.initializer) throw new Error('Review data requires initialized const bindings: ' + name);
        value = literal(module, binding.initializer);
      }
      values.set(key, value);
      return value;
    } finally { resolving.delete(key); }
  }
  function property(module, node, value, key) {
    if (['__proto__', 'constructor', 'prototype'].includes(key)) fail(module, node, 'Unsafe static property');
    if (!value || typeof value !== 'object' || !Object.prototype.hasOwnProperty.call(value, key)) {
      fail(module, node, 'Missing static property: ' + key);
    }
    return value[key];
  }
  function literal(module, node) {
    if (ts.isStringLiteralLike(node)) return node.text;
    if (ts.isNumericLiteral(node)) return Number(node.text);
    if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
    if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
    if (node.kind === ts.SyntaxKind.NullKeyword) return null;
    if (ts.isAsExpression(node) || ts.isTypeAssertionExpression(node) || ts.isSatisfiesExpression(node) || ts.isParenthesizedExpression(node)) {
      return literal(module, node.expression);
    }
    if (ts.isPrefixUnaryExpression(node) && node.operator === ts.SyntaxKind.MinusToken && ts.isNumericLiteral(node.operand)) return -Number(node.operand.text);
    if (ts.isIdentifier(node)) return node.text === 'undefined' ? undefined : resolve(module, node.text);
    if (ts.isArrayLiteralExpression(node)) return node.elements.flatMap(item => {
      if (!ts.isSpreadElement(item)) return [literal(module, item)];
      const value = literal(module, item.expression);
      if (!Array.isArray(value)) fail(module, item, 'Static array spread requires an array');
      return value;
    });
    if (ts.isObjectLiteralExpression(node)) {
      const result = {};
      for (const item of node.properties) {
        if (ts.isSpreadAssignment(item)) {
          const value = literal(module, item.expression);
          if (!value || Array.isArray(value) || typeof value !== 'object') fail(module, item, 'Static object spread requires an object');
          Object.assign(result, value);
          continue;
        }
        if ((!ts.isPropertyAssignment(item) && !ts.isShorthandPropertyAssignment(item)) ||
            (!ts.isIdentifier(item.name) && !ts.isStringLiteralLike(item.name) && !ts.isNumericLiteral(item.name))) {
          fail(module, item, 'Only static object properties are supported');
        }
        const key = item.name.text;
        if (['__proto__', 'constructor', 'prototype'].includes(key)) fail(module, item, 'Unsafe static property');
        result[key] = ts.isShorthandPropertyAssignment(item) ? resolve(module, key) : literal(module, item.initializer);
      }
      return result;
    }
    if (ts.isElementAccessExpression(node)) {
      const key = literal(module, node.argumentExpression);
      if (typeof key !== 'string') fail(module, node, 'Static asset lookup requires a string');
      return property(module, node, literal(module, node.expression), key);
    }
    if (ts.isPropertyAccessExpression(node)) return property(module, node, literal(module, node.expression), node.name.text);
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 'require' &&
        node.arguments.length === 1 && ts.isStringLiteralLike(node.arguments[0])) {
      const target = path.resolve(path.dirname(module.source.fileName), node.arguments[0].text);
      if (!['.png', '.mp4'].includes(path.extname(target).toLowerCase()) || !fs.existsSync(target)) {
        fail(module, node, 'Only existing bundled PNG/MP4 files may be required');
      }
      const filename = fs.realpathSync(target);
      if (!within(assetRoot, filename)) fail(module, node, 'Bundled review media must stay in src/assets');
      if (!media.has(filename)) media.set(filename, { file: relative(root, filename), sha256: hashBytes(fs.readFileSync(filename)) });
      return media.get(filename);
    }
    fail(module, node, 'Unsupported static review expression: ' + ts.SyntaxKind[node.kind]);
  }
  return (file, name) => {
    const module = inspect(path.resolve(root, file));
    const target = module.exports.get(name);
    if (!target) throw new Error('Missing named review export: ' + name);
    return resolve(module, target);
  };
}

function questionContentHash(question, links = {}) {
  return hashContent({ schema: 'question-review-v1', question,
    questionImage: links.questionImage ?? null, reviewImage: links.reviewImage ?? null, video: links.video ?? null });
}

/** The same current bundled content used by the app; no generated snapshot is trusted as input. */
function buildCatalogue(root = ROOT) {
  const read = createStaticReader(root);
  const questions = loadBank(path.join(root, 'src/data/questions.ts'));
  const lessons = read('src/data/course.ts', 'courseLessons');
  const images = read('src/data/illustrationAssets.ts', 'illustrationAssets');
  const videos = read('src/data/caseStudies.ts', 'caseStudies');
  const studyBindings = read('src/data/studyImages.ts', 'studyImageBindings');
  const teachingBindings = read('src/data/teachingImages.ts', 'questionTeachingImages');
  const signBindings = read('src/data/studyImages.ts', 'roadSignStudyImages');
  const notes = read('src/data/roadSigns.ts', 'roadSignFacts');
  const image = id => {
    if (!images[id]) throw new Error('Unknown review image: ' + id);
    return { id, ...images[id] };
  };
  const video = id => {
    if (!videos[id]) throw new Error('Unknown review video: ' + id);
    return { id, ...videos[id] };
  };
  const entries = [];
  const entry = (kind, id, title, content, contentHash = hashContent(content), metadata = {}) => {
    const value = { kind, id, title, content_sha256: contentHash, metadata, content };
    entries.push(value);
    return value;
  };
  const byQuestion = new Map();
  for (const question of questions) {
    const teachingId = studyBindings[question.id] ?? teachingBindings[question.id];
    const links = {
      questionImage: question.imageAssetId ? image(question.imageAssetId) : null,
      reviewImage: teachingId ? image(teachingId) : question.imageAssetId ? image(question.imageAssetId) : null,
      video: question.caseStudyVideoAssetId ? video(question.caseStudyVideoAssetId) : null,
    };
    const value = entry('question', question.id, question.prompt, { schema: 'question-review-v1', question, ...links }, questionContentHash(question, links),
      { topic: question.topic, reference: question.reference, primary_source_url: question.sourceUrl });
    if (byQuestion.has(question.id)) throw new Error('Duplicate review question: ' + question.id);
    byQuestion.set(question.id, value);
  }
  for (const lesson of lessons) {
    const linkedQuestions = lesson.questionIds.map(id => {
      const question = byQuestion.get(id);
      if (!question) throw new Error('Unknown lesson question: ' + id);
      return { id, content_sha256: question.content_sha256 };
    });
    const linkedImages = lesson.sections.filter(section => section.imageAssetId).map(section => image(section.imageAssetId));
    const linkedVideos = lesson.sections.filter(section => section.caseStudyId).map(section => video(section.caseStudyId));
    entry('lesson', lesson.id, lesson.title, { schema: 'lesson-review-v1', lesson, linkedQuestions, linkedImages, linkedVideos });
  }
  for (const [id, asset] of Object.entries(videos)) entry('video', id, asset.title, { schema: 'video-review-v1', asset });
  for (const [id, asset] of Object.entries(images)) entry('image', id, asset.label, { schema: 'image-review-v1', asset });
  for (const note of notes) entry('sign-note', note.id, note.title, {
    schema: 'sign-note-review-v1', note,
    image: note.imageAssetId ? image(note.imageAssetId) : null,
    studyImage: signBindings[note.id] ? image(signBindings[note.id]) : null,
  });
  const identities = entries.map(value => `${value.kind}:${value.id}`);
  if (new Set(identities).size !== identities.length) throw new Error('Duplicate editorial content identity');
  return {
    schemaVersion: 1,
    catalogue_sha256: hashContent(entries.map(({ kind, id, content_sha256 }) => ({ kind, id, content_sha256 }))),
    counts: Object.fromEntries(['question', 'lesson', 'video', 'image', 'sign-note'].map(kind =>
      [kind, entries.filter(value => value.kind === kind).length])),
    entries,
  };
}

const TRACKERS = [
  { kind: 'question', file: 'QUESTION_REVIEW_TRACKER.csv', idColumn: 'question_id' },
  { kind: 'lesson', file: 'LESSON_REVIEW_TRACKER.csv', idColumn: 'content_id' },
  { kind: 'video', file: 'VIDEO_REVIEW_TRACKER.csv', idColumn: 'content_id' },
  { kind: 'image', file: 'IMAGE_REVIEW_TRACKER.csv', idColumn: 'content_id' },
  { kind: 'sign-note', file: 'SIGN_NOTE_REVIEW_TRACKER.csv', idColumn: 'content_id' },
];

module.exports = { ROOT, TRACKERS, canonical, hashBytes, hashContent, questionContentHash, createStaticReader, buildCatalogue };
