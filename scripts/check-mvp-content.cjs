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

function parseLiteral(node) {
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(parseLiteral);
  if (ts.isObjectLiteralExpression(node)) {
    const result = {};
    for (const property of node.properties) {
      if (!ts.isPropertyAssignment(property)) continue;
      const name = ts.isIdentifier(property.name) || ts.isStringLiteralLike(property.name)
        ? property.name.text : property.name.getText();
      result[name] = parseLiteral(property.initializer);
    }
    return result;
  }
  return undefined;
}

function loadBank(file) {
  const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'),
    ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.name.text !== 'questions'
        || !declaration.initializer || !ts.isArrayLiteralExpression(declaration.initializer)) continue;
      return parseLiteral(declaration.initializer);
    }
  }
  throw new Error('Expected a statically declared questions array in src/data/questions.ts');
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
  }

  if (topicCounts.size < MIN_TOPICS) {
    issues.push('Need at least ' + MIN_TOPICS + ' subject topics (currently ' + topicCounts.size + ')');
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
