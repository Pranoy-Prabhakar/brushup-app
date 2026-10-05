---
title: "List"
slug: "list"
category: "Collections"
summary: "An ordered, changeable sequence."
keywords: "lists append index sequence"
order: 5
related: ["list-comprehensions", "sorting", "collections-module"]
---

## What is it?
A list keeps items in order and can be changed. It can hold different kinds of values, but similar items are easier to work with.

## Syntax
```python
items = ["tea", "bread"]
items.append("pear")
first = items[0]
```

## Example
```python
queue = ["build", "test"]
queue.insert(0, "lint")
last = queue.pop()
```

## When to use
Use a list when order matters or you need to add, remove, or change items.

## When not to use
Use a tuple for fixed records or a set when uniqueness and membership matter more than order.

## Common mistake
`list.sort()` mutates the list and returns `None`; use `sorted(items)` to get a new sorted list.

## Tip
Use `append()` to add one item and `extend()` to add all items from another list or sequence.

## Remember
Lists keep order and can change; indexes start at zero.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `list.append(item)` | Adds one item at the end. | `items.append("pear")` |
| `list.extend(items)` | Adds each item from another iterable. | `items.extend(["tea", "bread"])` |
| `list.insert(index, item)` | Adds an item at a position. | `items.insert(0, "first")` |
| `list.remove(value)` / `list.pop(index)` | Removes a matching value or removes and returns by position. | `last = items.pop()` |
| `list.clear()` | Removes every item. | `items.clear()` |
| `list.index(value)` / `list.count(value)` | Finds the first position or counts matches. | `items.count("tea")` |
| `list.sort()` | Sorts this list in place. | `scores.sort()` |
| `list.reverse()` / `list.copy()` | Reverses this list in place or makes a shallow copy. | `backup = items.copy()` |
| `len`, `min`, `max`, `sum` | Counts, finds extremes, or totals suitable values. | `sum([2, 3])  # 5` |
| `sorted`, `enumerate`, `zip` | Returns sorted items, adds indexes, or pairs sequences. | `list(zip(names, scores))` |
| `any(items)` / `all(items)` | Checks whether any or every list item is true. | `any([0, 2])  # True` |
| `sorted(items)` | Returns a new sorted list. | `sorted(scores)` |