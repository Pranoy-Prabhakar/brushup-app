## What is it?
A set stores unique, hashable values. It gives fast average-case membership checks and useful set algebra.

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
Use a set to remove duplicates or test membership repeatedly without caring about positional order.

## When not to use
Do not use a set when duplicate counts or stable sequence positions matter.

## Common mistake
`{}` creates an empty dictionary. Use `set()` for an empty set.

## Tip
Use `a & b`, `a | b`, and `a - b` for intersection, union, and difference.

## Remember
Sets keep one of each hashable value, not an indexable sequence.