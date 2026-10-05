---
title: "Set"
slug: "set"
category: "Collections"
summary: "Unique values and fast membership checks."
keywords: "sets unique values deduplicate membership"
order: 7
related: ["set-operations", "collections-module", "dictionary"]
---

## What is it?
A set keeps one copy of each value. It is useful for quick checks and comparing groups.

## Syntax
```python
unique = {2, 4, 6}
unique.add(8)
present = 4 in unique
```

## Example
```python
tags = ["python", "docs", "python"]
deduplicated = set(tags)
```

## When to use
Use a set to remove repeats or check often whether a value is present. Sets do not keep useful positions.

## When not to use
Do not use a set when repeats or item order matter.

## Common mistake
`{}` creates an empty dictionary. Use `set()` for an empty set.

## Tip
Use `a & b`, `a | b`, and `a - b` for intersection, union, and difference.

## Remember
Sets keep one of each value; unlike lists, you cannot get an item by its position.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `set(items)` | Makes a set from items, removing duplicates. | `set([1, 1, 2])` |
| `set.add(item)` | Adds one value. | `tags.add("docs")` |
| `set.update(items)` | Adds values from another iterable. | `tags.update(["read", "write"])` |
| `set.discard(item)` | Removes a value if present. | `tags.discard("old")` |
| `set.remove(item)` | Removes a value; errors if missing. | `tags.remove("docs")` |
| `set.pop()` / `set.clear()` | Removes an arbitrary item, or empties the set. | `tags.clear()` |
| `a & b` | Keeps values in both sets. | `staff & online` |
| `a | b` | Combines values from both sets. | `staff | online` |