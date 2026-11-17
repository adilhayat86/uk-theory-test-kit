const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { loadBank, evaluate } = require('./check-mvp-content.cjs');

let directory;
beforeEach(() => { directory = fs.mkdtempSync(path.join(os.tmpdir(), 'theorykit-content-loader-')); });
afterEach(() => {
  const resolved = path.resolve(directory);
  const prefix = path.join(path.resolve(os.tmpdir()), 'theorykit-content-loader-');
  if (!resolved.startsWith(prefix)) throw new Error('Refusing to remove an unexpected fixture directory');
  fs.rmSync(resolved, { recursive: true, force: true });
});
function fixture(name, source) {
  const file = path.join(directory, name);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, source);
  return file;
}

test('literal bank API remains valid without importing or executing TypeScript', () => {
  const file = fixture('questions.ts', `
    export const questions: unknown[] = [{id:'one', options:['A','B','C','D'], correctIndex:0}];
  `);
  expect(loadBank(file)).toEqual([{ id: 'one', options: ['A', 'B', 'C', 'D'], correctIndex: 0 }]);
});

test('named imports, aliases, array spreads and local URL constants resolve through static module exports', () => {
  fixture('types.ts', `throw new Error('Type imports must not be executed or resolved');`);
  fixture('case.ts', `
    import type { Question } from './questions';
    const url = 'https://www.gov.uk/example';
    const sourceUrl = url;
    const local = [{id:'case',sourceUrl}];
    export {local as caseQuestions};
  `);
  fixture('course.ts', `
    import {caseQuestions as linked} from './case';
    export const courseQuestions = [{id:'course'}, ...linked] as const;
  `);
  const file = fixture('questions.ts', `
    import type {Unknown} from 'nonexistent-type-package';
    import {type Question} from './types';
    import {courseQuestions as extra} from './course';
    const base = [{id:'base'}];
    export const questions = [...base, ...extra] satisfies unknown[];
  `);
  expect(loadBank(file)).toEqual([{ id: 'base' }, { id: 'course' }, { id: 'case', sourceUrl: 'https://www.gov.uk/example' }]);
});

test('function calls and side effects are not evaluated by the loader', () => {
  global.__contentLoaderExecuted = false;
  const file = fixture('questions.ts', `
    export const questions = (() => {global.__contentLoaderExecuted = true;return []})()
  `);
  expect(() => loadBank(file)).toThrow(/Unsupported static data expression: CallExpression/);
  expect(global.__contentLoaderExecuted).toBe(false);
  delete global.__contentLoaderExecuted;
});

test('cycles, mutable bindings, missing exports and non-array spreads fail explicitly', () => {
  fixture('cycle.ts', `import {questions} from './questions';export const more=[...questions];`);
  let file = fixture('questions.ts', `import {more} from './cycle';export const questions=[...more];`);
  expect(() => loadBank(file)).toThrow(/Cyclic static data reference/);
  file = fixture('questions.ts', `let mutable=[];export const questions=mutable;`);
  expect(() => loadBank(file)).toThrow(/initialized const/);
  fixture('private.ts', `const privateQuestions=[];`);
  file = fixture('questions.ts', `import {privateQuestions} from './private';export const questions=privateQuestions;`);
  expect(() => loadBank(file)).toThrow(/Missing named data export/);
  file = fixture('questions.ts', `const text='not an array';export const questions=[...text];`);
  expect(() => loadBank(file)).toThrow(/Array spread requires/);
});

test('unsupported imports and unsafe object names do not gain execution or prototype access', () => {
  for (const source of [
    `import {thing} from 'node:fs';export const questions=thing;`,
    `import thing from './other';export const questions=thing;`,
    `import * as things from './other';export const questions=things;`,
    `export const questions=[{'__proto__':{polluted:true}}];`,
  ]) {
    expect(() => loadBank(fixture('questions.ts', source))).toThrow();
  }
  expect({}.polluted).toBeUndefined();
});

test('the real composed bank contains all 309 questions and resolves case-study source references', () => {
  const bank = loadBank(path.resolve(__dirname, '../src/data/questions.ts'));
  expect(bank).toHaveLength(309);
  expect(evaluate(bank).ready).toBe(true);
  expect(bank.filter(question => question.id.startsWith('course-'))).toHaveLength(72);
  expect(bank.filter(question => question.id.startsWith('case-'))).toHaveLength(9);
  expect(bank.find(question => question.id === 'case-zebra-001').sourceUrl)
    .toBe('https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203');
});
