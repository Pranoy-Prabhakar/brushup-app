## What is it?
Set operations compare groups of unique values without writing manual nested loops.

## Syntax
```python
left | right  # union
left & right  # intersection
left - right  # difference
```

## Example
```python
online = {"Mina", "Lee", "Sol"}
editors = {"Lee", "Ari"}
shared = online & editors
newcomers = editors - online
```

## When to use
Use set algebra for membership, overlap, deduplication, and comparisons between collections.

## Common mistake
Operations discard duplicates and do not preserve meaningful sequence order.

## Tip
Use `issubset()` or `<=` to express containment directly.

## Remember
Convert to sets when uniqueness and group comparison are the point.