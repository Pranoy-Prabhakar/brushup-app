---
title: "zip"
slug: "zip"
category: "Pythonic Python"
summary: "Walk through sequences in parallel."
keywords: "pair combine parallel"
order: 14
related: ["enumerate", "itertools", "dictionary"]
---

## What is it?
`zip()` pairs items from two or more sources, in order, one pair at a time.

## Syntax
```python
for left, right in zip(left_items, right_items):
    ...
```

## Example
```python
keys = ["host", "port"]
values = ["localhost", 8000]
config = dict(zip(keys, values))
```

## When to use
Use it to handle related lists together or pair matching values.

## Common mistake
By default, `zip()` stops when one input runs out of items. On Python 3.10 or newer, use `strict=True` to raise an error if the inputs have different lengths.

## Tip
Use `zip(*pairs)` to split paired rows into columns. `pairs` must contain at least one row.

## Remember
`zip()` walks iterables together and stops at the shortest by default.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `zip(a, b)` | Pairs items by position and stops when either input runs out. | `zip(names, scores)` |
| `zip(a, b, strict=True)` | Python 3.10+: raises an error if input lengths differ. | `zip(names, scores, strict=True)` |
| `dict(zip(keys, values))` | Makes a dictionary from paired items. | `dict(zip(keys, values))` |
| `enumerate(items)` | Pairs items with their positions. | `enumerate(names)` |
| `zip(*pairs)` | Unzips non-empty paired items. | `names, scores = zip(*pairs)` |