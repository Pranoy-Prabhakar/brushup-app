---
title: "Collections Module"
slug: "collections-module"
category: "Collections"
summary: "Use ready-made containers for common data tasks."
keywords: "collections Counter defaultdict deque namedtuple standard library"
order: 36
related: ["list", "dictionary", "set-operations"]
---

## What is it?
The standard-library `collections` module provides useful container types beyond lists, tuples, sets, and dictionaries. These types solve common counting, grouping, and queue tasks.

## Syntax
```python
from collections import Counter, defaultdict, deque, namedtuple
```

## Example
```python
from collections import Counter

counts = Counter(["tea", "cake", "tea"])
print(counts["tea"])  # 2
```

## When to use
Reach for these containers when their built-in behavior makes your code simpler.

## Common mistake
`defaultdict` creates a value when a missing key is read. A plain dictionary's `.get()` may be clearer for occasional lookups.

## Tip
A `deque` is a double-ended queue: adding or removing at either end is efficient.

## Remember
These are standard-library tools, so import the name before using it.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `Counter(items)` | Standard-library counter counts repeated values. | `Counter("aba")  # {'a': 2, 'b': 1}` |
| `Counter.most_common(n)` | Lists the most frequent values and counts. | `counts.most_common(1)` |
| `defaultdict(factory)` | Makes a default value for missing keys. | `defaultdict(list)` |
| `deque(items)` | Makes a queue that works at both ends. | `deque(["first", "last"])` |
| `deque.appendleft(item)` | Adds an item to the front of a deque. | `queue.appendleft("urgent")` |
| `namedtuple(name, fields)` | Standard-library factory makes tuple fields readable by name. | `Point = namedtuple("Point", "x y")` |