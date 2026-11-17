#!/usr/bin/env node
/**
 * Structural release gate for the independently written GB car question bank.
 * This is NOT an editorial, legal or driving-rule accuracy review.
 *
 * Use 'npm run check:mvp:content' before any paid launch.
 * CI can exercise it without failing an incomplete prototype:
 *   npm run check:mvp:content -- --report-only
 */
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const MIN_QUESTIONS = 200;
const MIN_TOPICS = 10;
const MIN_PER_TOPIC = 10;

/** Read only a small static TypeScript data subset; never execute imported modules. */
function loadBank(file) {
  const modules = new Map();
  const values = new Map();
  const resolving = new Set();

  function fail(source, node, message) {
    const position = source.getLineAndCharacterOfPosition(node.getStart(source));
    throw new Error(`${source.fileName}:${position.line + 1}:${position.character + 1}: ${message}`);
  }

  function targetFile(source, node, specifier) {
    if (!specifier.startsWith('./') && !specifier.startsWith('../')) {
      fail(source, node, 'Only relative TypeScript data imports are supported');
    }
    const target = path.resolve(path.dirname(source.fileName), specifier);
    const extension = path.extname(target);
    if (extension && extension !== '.ts') fail(source, node, 'Data imports must resolve to TypeScript files');
    const candidates = extension ? [target] : [target + '.ts', path.join(target, 'index.ts')];
    const found = candidates.find(candidate => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
    if (!found) fail(source, node, 'Cannot resolve static data import: ' + specifier);
    return fs.realpathSync(found);
  }

  function inspect(moduleFile) {
    const canonical = fs.realpathSync(moduleFile);
    if (modules.has(canonical)) return modules.get(canonical);
    const source = ts.createSourceFile(canonical, fs.readFileSync(canonical, 'utf8'),
      ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    if (source.parseDiagnostics.length) throw new Error('Invalid TypeScript data source: ' + canonical);
    const module = { source, bindings: new Map(), exports: new Map() };
    modules.set(canonical, module);
    function add(name, binding, node) {
      if (module.bindings.has(name)) fail(source, node, 'Duplicate static binding: ' + name);
      module.bindings.set(name, binding);
    }
    for (const statement of source.statements) {
      if (ts.isImportDeclaration(statement)) {
        const clause = statement.importClause;
        if (clause?.isTypeOnly) continue;
        if (!clause || clause.name || !clause.namedBindings || !ts.isNamedImports(clause.namedBindings)) {
          fail(source, statement, 'Only named TypeScript data imports are supported');
        }
        const imports = clause.namedBindings.elements.filter(item => !item.isTypeOnly);
        if (!imports.length) continue;
        if (!ts.isStringLiteralLike(statement.moduleSpecifier)) fail(source, statement, 'Import path must be a literal');
        const target = targetFile(source, statement, statement.moduleSpecifier.text);
        for (const item of imports) add(item.name.text,
          { imported: target, name: item.propertyName?.text ?? item.name.text }, item);
      } else if (ts.isVariableStatement(statement)) {
        const constant = Boolean(statement.declarationList.flags & ts.NodeFlags.Const);
        const exported = statement.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword);
        for (const declaration of statement.declarationList.declarations) {
          if (!ts.isIdentifier(declaration.name)) continue;
          const name = declaration.name.text;
          add(name, { initializer: declaration.initializer, constant }, declaration);
          if (exported) module.exports.set(name, name);
        }
      } else if (ts.isExportDeclaration(statement) && !statement.isTypeOnly) {
        if (statement.moduleSpecifier || !statement.exportClause || !ts.isNamedExports(statement.exportClause)) {
          fail(source, statement, 'Only local named data exports are supported');
        }
        for (const item of statement.exportClause.elements) {
          if (!item.isTypeOnly) module.exports.set(item.name.text, item.propertyName?.text ?? item.name.text);
        }
      }
    }
    return module;
  }

  function resolve(module, name) {
    const key = module.source.fileName + ':' + name;
    if (values.has(key)) return values.get(key);
    if (resolving.has(key)) throw new Error('Cyclic static data reference: ' + key);
    const binding = module.bindings.get(name);
    if (!binding) throw new Error('Unknown static data identifier: ' + key);
    resolving.add(key);
    let value;
    try {
      if (binding.imported) {
        const imported = inspect(binding.imported);
        const exported = imported.exports.get(binding.name);
        if (!exported) throw new Error('Missing named data export: ' + binding.name + ' in ' + binding.imported);
        value = resolve(imported, exported);
      } else {
        if (!binding.constant || !binding.initializer) throw new Error('Static data must use initialized const bindings: ' + key);
        value = literal(binding.initializer, module);
      }
      values.set(key, value);
      return value;
    } finally {
      resolving.delete(key);
    }
  }

  function literal(node, module) {
    const source = module.source;
    if (ts.isStringLiteralLike(node)) return node.text;
    if (ts.isNumericLiteral(node)) return Number(node.text);
    if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
    if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
    if (node.kind === ts.SyntaxKind.NullKeyword) return null;
    if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isTypeAssertionExpression(node) || ts.isSatisfiesExpression(node)) {
      return literal(node.expression, module);
    }
    if (ts.isPrefixUnaryExpression(node) && node.operator === ts.SyntaxKind.MinusToken && ts.isNumericLiteral(node.operand)) {
      return -Number(node.operand.text);
    }
    if (ts.isIdentifier(node)) return node.text === 'undefined' ? undefined : resolve(module, node.text);
    if (ts.isArrayLiteralExpression(node)) {
      const result = [];
      for (const element of node.elements) {
        if (ts.isSpreadElement(element)) {
          const spread = literal(element.expression, module);
          if (!Array.isArray(spread)) fail(source, element, 'Array spread requires a static array');
          result.push(...spread);
        } else {
          result.push(literal(element, module));
        }
      }
      return result;
    }
    if (ts.isObjectLiteralExpression(node)) {
      const result = {};
      for (const property of node.properties) {
        if (!ts.isPropertyAssignment(property) && !ts.isShorthandPropertyAssignment(property)) {
          fail(source, property, 'Only static property assignments are supported in question objects');
        }
        if (!ts.isIdentifier(property.name) && !ts.isStringLiteralLike(property.name) && !ts.isNumericLiteral(property.name)) {
          fail(source, property, 'Computed data property names are not supported');
        }
        const name = property.name.text;
        if (['__proto__', 'constructor', 'prototype'].includes(name)) fail(source, property, 'Unsafe static property name');
        result[name] = ts.isShorthandPropertyAssignment(property) ? resolve(module, name) : literal(property.initializer, module);
      }
      return result;
    }
    fail(source, node, 'Unsupported static data expression: ' + ts.SyntaxKind[node.kind]);
  }

  const result = resolve(inspect(path.resolve(file)), 'questions');
  if (!Array.isArray(result)) throw new Error('Expected a statically declared questions array in ' + file);
  return result;
}

function evaluate(bank) {
  const issues = [];
  if (bank.length < MIN_QUESTIONS) {
    issues.push('Need at least ' + MIN_QUESTIONS + ' original questions (currently ' + bank.length + ')');
  }
  const topicCounts = new Map();
  const questionIds = new Set();
  const questionPrompts = new Set();
  for (const [index, item] of bank.entries()) {
    if (!item || typeof item !== 'object') {
      issues.push('Invalid question at index ' + index);
      continue;
    }
    const id = String(item.id ?? '');
    const prompt = String(item.prompt ?? '').trim();
    const topic = String(item.topic ?? '').trim();
    if (!id || questionIds.has(id)) issues.push('Missing or duplicate question ID: ' + id);
    questionIds.add(id);
    const normalizedPrompt = prompt.toLocaleLowerCase('en-GB');
    if (prompt.length < 15 || questionPrompts.has(normalizedPrompt)) {
      issues.push('Missing, too short or duplicate prompt for ' + id);
    }
    questionPrompts.add(normalizedPrompt);
    if (!topic) issues.push('Missing topic for ' + id);
    else topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1);
    if (!Array.isArray(item.options) || item.options.length !== 4 ||
      !item.options.every((option) => typeof option === 'string' && option.trim().length > 0) ||
      new Set(item.options.map((option) => option.trim().toLocaleLowerCase('en-GB'))).size !== 4) {
      issues.push('Four distinct, non-empty options required for ' + id);
    }
    if (!Number.isInteger(item.correctIndex) || item.correctIndex < 0 || item.correctIndex > 3) {
      issues.push('Invalid answer index for ' + id);
    }
    if (typeof item.explanation !== 'string' || item.explanation.trim().length < 25) {
      issues.push('Missing detailed explanation for ' + id);
    }
    if (typeof item.reference !== 'string' || item.reference.trim().length < 6) {
      issues.push('Missing reference for ' + id);
    }
    // A reference must be inspectable against the official source. This tests
    // URL syntax/host, not whether the human interpretation is correct.
    if (typeof item.sourceUrl !== 'string' ||
      !/^https:\/\/(www\.)?gov\.uk\//.test(item.sourceUrl)) {
      issues.push('Missing canonical GOV.UK source URL for ' + id);
    }
  }

  if (topicCounts.size < MIN_TOPICS) {
    issues.push('Need at least ' + MIN_TOPICS + ' subject topics (currently ' + topicCounts.size + ')');
  }
  const choices = bank.filter((item) => item && Array.isArray(item.options) && Number.isInteger(item.correctIndex))
    .map((item) => item.correctIndex);
  const answersUsed = new Set(choices);
  if (answersUsed.size !== 4) {
    issues.push('Correct options must occupy all four answer positions in the full bank');
  }
  for (const [topic, count] of topicCounts) {
    if (count < MIN_PER_TOPIC) {
      issues.push(topic + ' has only ' + count + ' questions (minimum ' + MIN_PER_TOPIC + ')');
    }
  }
  return { ready: issues.length === 0, count: bank.length, topics: topicCounts.size, issues };
}

function main() {
  const file = path.resolve(__dirname, '../src/data/questions.ts');
  const result = evaluate(loadBank(file));
  console.log('MVP automated question-content gate: ' + (result.ready ? 'STRUCTURALLY READY' : 'NOT READY'));
  console.log('Questions: ' + result.count + ' / ' + MIN_QUESTIONS + ' minimum');
  console.log('Topics: ' + result.topics + ' / ' + MIN_TOPICS + ' minimum');
  for (const issue of result.issues) console.log('  - ' + issue);
  console.log('Separate human rule/source review, original-content/IP sign-off and hardware QA are always mandatory.');
  if (!result.ready && !process.argv.includes('--report-only')) process.exitCode = 1;
}

if (require.main === module) main();
module.exports = { evaluate, loadBank };
