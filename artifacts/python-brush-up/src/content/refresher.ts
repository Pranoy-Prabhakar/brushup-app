export const refresher = [
  { name: 'Variables', slug: 'variables', summary: 'Names point to values. Assignment sets or changes what a name points to.', code: 'count = 3\\ncount += 1' },
  { name: 'Conditions', slug: 'conditions', summary: 'The first true branch runs. Use elif to check another case.', code: 'if ready:\\n    start()\\nelse:\\n    wait()' },
  { name: 'Loops', slug: 'loops', summary: 'Use for to visit items; while repeats as long as a condition is true.', code: 'for item in items:\\n    process(item)' },
  { name: 'Lists', slug: 'list', summary: 'Ordered collections you can change. Add one item with append; indexes start at zero.', code: 'tasks = ["read", "ship"]\\ntasks.append("review")' },
  { name: 'Dictionaries', slug: 'dictionary', summary: 'Store values under named keys for quick lookup.', code: 'user = {"name": "Mina"}\\nuser.get("role", "reader")' },
  { name: 'Sets', slug: 'set', summary: 'Keep unique values and check whether a value is present.', code: 'unique = set(values)\\nshared = a & b' },
  { name: 'Functions', slug: 'functions', summary: 'Give a task a name, accept inputs, and return a result.', code: 'def double(number):\\n    return number * 2' },
  { name: 'Comprehensions', slug: 'list-comprehensions', summary: 'Build a list by changing or filtering items in one expression.', code: '[x * 2 for x in values if x > 0]' },
  { name: 'Exceptions', slug: 'try-except', summary: 'Catch a known problem where you can explain or fix it.', code: 'try:\\n    value = int(text)\\nexcept ValueError:\\n    value = 0' },
  { name: 'Classes', slug: 'classes', summary: 'Keep related data and the actions that use it together.', code: 'class Counter:\\n    def __init__(self):\\n        self.value = 0' },
  { name: 'Files', slug: 'file-handling', summary: 'A with block closes a file for you, even if an error occurs.', code: 'with open(path, encoding="utf-8") as f:\\n    text = f.read()' },
];

export const handyApis = [
  { name: 'len(value)', description: 'Count items or characters.', example: 'len(["a", "b"])  # 2' },
  { name: 'range(stop)', description: 'Make numbers for a loop.', example: 'range(3)  # 0, 1, 2' },
  { name: 'enumerate(items)', description: 'Pair each item with its index.', example: 'enumerate(["a", "b"])' },
  { name: 'zip(a, b)', description: 'Pair items from two iterables.', example: 'zip(["x"], [1])' },
  { name: 'sorted(items)', description: 'Return a new sorted list.', example: 'sorted([3, 1])  # [1, 3]' },
  { name: 'str.strip()', description: 'Remove whitespace at both ends.', example: '" hi ".strip()  # "hi"' },
  { name: 'dict.get(key, default)', description: 'Look up a key with a fallback.', example: '{"x": 2}.get("y", 0)' },
  { name: 'list.append(item)', description: 'Add one item to a list.', example: 'items.append("tea")' },
  { name: 'pathlib.Path / name', description: 'Join filesystem paths safely.', example: 'Path("data") / "notes.txt"' },
];