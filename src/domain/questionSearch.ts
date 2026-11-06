import type { TheoryQuestion } from '../data/questions';

/** Local-only text search. Never sends study terms or questions to a server. */
export function searchQuestions(bank: TheoryQuestion[], query: string): TheoryQuestion[] {
  const terms = query.trim().toLocaleLowerCase('en-GB').split(/\s+/u).filter(Boolean);
  const seen = new Set<string>();
  return bank.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    if (!terms.length) return true;
    const haystack = [item.topic, item.prompt, item.explanation, item.reference, ...item.options]
      .join(' ').toLocaleLowerCase('en-GB');
    return terms.every((term) => haystack.includes(term));
  });
}
