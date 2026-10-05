---
title: "enumerate"
slug: "enumerate"
category: "Pythonic Python"
summary: "Loop over values with their index."
keywords: "index loop counter"
order: 13
related: ["zip", "loops", "iterators"]
---

## What is it?
`enumerate()` gives each item with a running number, so you do not need a separate counter.

## Syntax
```python
for index, value in enumerate(values, start=0):
    ...
```

## Example
```python
tasks = ["write", "review", "ship"]
for number, task in enumerate(tasks, start=1):
    print(f"{number}. {task}")
```

## When to use
Use it when a loop needs both an item and its position.

## Common mistake
Avoid `range(len(values))` and repeated indexing when you can loop over the items directly.

## Tip
Pass `start=1` for human-facing numbering while keeping Python's default zero-based indexing elsewhere.

## Remember
`enumerate()` gives each item with its index.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `enumerate(items)` | Pairs each item with its index. | `enumerate(names)` |
| `enumerate(items, start=1)` | Starts the index at a chosen number. | `enumerate(names, start=1)` |
| `range(stop)` | Produces numbers from zero up to (not including) stop. | `range(3)` |
| `len(items)` | Counts items. | `len(names)` |
| `list(enumerate(items))` | Makes all index-item pairs into a list. | `list(enumerate(names))` |