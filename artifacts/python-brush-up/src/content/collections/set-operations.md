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
Use sets when unique values and group comparisons matter.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `a | b` | Combines both sets (union). | `readers | writers` |
| `a & b` | Keeps shared values (intersection). | `readers & writers` |
| `a - b` | Keeps values only in the left set. | `all_users - blocked` |
| `a ^ b` | Keeps values in one set, but not both. | `a ^ b` |
| `set.issubset(other)` | Checks whether all values are in another set. | `small.issubset(big)` |
| `set.isdisjoint(other)` | Checks whether sets have no shared values. | `a.isdisjoint(b)` |