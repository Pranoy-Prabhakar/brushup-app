export type Topic = { title: string; slug: string; category: string; summary: string; keywords: string };

export const topics: Topic[] = [
  { title: 'Variables', slug: 'variables', category: 'Basics', summary: 'Names, values, and assignment in Python.', keywords: 'variable assignment name state' },
  { title: 'Data Types', slug: 'data-types', category: 'Basics', summary: 'The built-in values Python works with.', keywords: 'types str int float bool none' },
  { title: 'Conditions', slug: 'conditions', category: 'Basics', summary: 'Choose a path with if, elif, and else.', keywords: 'if elif else branching' },
  { title: 'Loops', slug: 'loops', category: 'Basics', summary: 'Repeat work with for and while.', keywords: 'for while iteration iterate' },
  { title: 'List', slug: 'list', category: 'Collections', summary: 'An ordered, changeable sequence.', keywords: 'lists append index sequence' },
  { title: 'Tuple', slug: 'tuple', category: 'Collections', summary: 'An ordered sequence that stays fixed.', keywords: 'tuples immutable unpack' },
  { title: 'Set', slug: 'set', category: 'Collections', summary: 'Unique values and fast membership checks.', keywords: 'sets unique values deduplicate membership' },
  { title: 'Dictionary', slug: 'dictionary', category: 'Collections', summary: 'Look up values by meaningful keys.', keywords: 'dict mapping key value lookup hash map' },
  { title: 'Functions', slug: 'functions', category: 'Functions', summary: 'Name reusable behavior and return a result.', keywords: 'def return reusable' },
  { title: 'Parameters', slug: 'parameters', category: 'Functions', summary: 'Pass information into a function clearly.', keywords: 'arguments args parameters defaults keyword' },
  { title: '*args and **kwargs', slug: 'args-kwargs', category: 'Functions', summary: 'Collect extra positional and keyword arguments.', keywords: 'args kwargs variadic unpack' },
  { title: 'List Comprehensions', slug: 'list-comprehensions', category: 'Pythonic Python', summary: 'Build a list with a compact expression.', keywords: 'comprehension list transform filter' },
  { title: 'enumerate', slug: 'enumerate', category: 'Pythonic Python', summary: 'Loop over values with their index.', keywords: 'index loop counter' },
  { title: 'zip', slug: 'zip', category: 'Pythonic Python', summary: 'Walk through sequences in parallel.', keywords: 'pair combine parallel' },
  { title: 'Classes', slug: 'classes', category: 'OOP', summary: 'Bundle state and behavior into an object.', keywords: 'class object self init' },
  { title: 'Inheritance', slug: 'inheritance', category: 'OOP', summary: 'Specialize behavior from a parent class.', keywords: 'parent subclass super' },
  { title: 'Composition', slug: 'composition', category: 'OOP', summary: 'Build behavior by assembling focused objects.', keywords: 'has-a object design' },
  { title: 'try / except', slug: 'try-except', category: 'Errors', summary: 'Handle expected failures at a boundary.', keywords: 'exception errors catch finally' },
  { title: 'raise', slug: 'raise', category: 'Errors', summary: 'Signal that an operation cannot continue.', keywords: 'raise exception errors' },
  { title: 'File Handling', slug: 'file-handling', category: 'Useful Python', summary: 'Read and write files safely with context managers.', keywords: 'files open read write with' },
  { title: 'JSON', slug: 'json', category: 'Useful Python', summary: 'Exchange data with JSON text.', keywords: 'serialize parse loads dumps' },
  { title: 'pathlib', slug: 'pathlib', category: 'Useful Python', summary: 'Work with filesystem paths as objects.', keywords: 'path directory file pathlib' },
  { title: 'Strings', slug: 'strings', category: 'Basics', summary: 'Create, format, and inspect text.', keywords: 'string text f-string format' },
  { title: 'Modules', slug: 'modules', category: 'Useful Python', summary: 'Organize code and import reusable names.', keywords: 'import module package' },
  { title: 'Iterators', slug: 'iterators', category: 'Pythonic Python', summary: 'Understand the protocol behind for loops.', keywords: 'iterator iterable next iter' },
  { title: 'Set operations', slug: 'set-operations', category: 'Collections', summary: 'Compare groups with union and intersection.', keywords: 'unique values union intersection difference' },
];

export const categories = ['Basics', 'Collections', 'Functions', 'Pythonic Python', 'OOP', 'Errors', 'Useful Python'];
export const markdownFiles = import.meta.glob('./**/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;
export function getLesson(slug: string) {
  const topic = topics.find((item) => item.slug === slug);
  if (!topic) return undefined;
  const categoryFolder: Record<string, string> = {
    Basics: 'basics', Collections: 'collections', Functions: 'functions', 'Pythonic Python': 'pythonic-python',
    OOP: 'oop', Errors: 'errors', 'Useful Python': 'useful-python',
  };
  const path = `./${categoryFolder[topic.category]}/${slug}.md`;
  return { topic, markdown: markdownFiles[path] };
}