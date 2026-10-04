## What is it?
A list is an ordered, mutable collection. It can hold mixed values, though a consistent element type is usually easier to reason about.

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
Use a list when order matters and the collection may grow, shrink, or change.

## When not to use
Use a tuple for fixed records or a set when uniqueness and membership matter more than order.

## Common mistake
`list.sort()` mutates the list and returns `None`; use `sorted(items)` to get a new sorted list.

## Tip
Use `append()` to add one item and `extend()` to add each item from an iterable.

## Remember
Lists are ordered and mutable; indices start at zero.