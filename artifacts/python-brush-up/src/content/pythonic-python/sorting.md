## What is it?
Sorting puts values in order. Python can return a newly sorted list or rearrange an existing list; a `key` function chooses which detail to compare.

## Syntax
```python
sorted(items, key=..., reverse=False)
items.sort(key=...)
```

## Example
```python
names = ["Mina", "ari", "Lee"]
by_length = sorted(names, key=len)
```

## When to use
Use `sorted()` when you want an ordered copy, or `.sort()` when changing the original list is intended.

## Common mistake
`list.sort()` changes the list in place and returns `None`. Do not assign its result to a new name.

## Tip
Python sorting is stable: items with equal keys keep their previous relative order.

## Remember
Use `key=` to say what “in order” means for your data.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `sorted(items)` | Returns a new list in ascending order. | `sorted([4, 1, 3])` |
| `sorted(items, reverse=True)` | Returns a new list in descending order. | `sorted(scores, reverse=True)` |
| `sorted(items, key=...)` | Sorts by the value returned from a function. | `sorted(names, key=str.lower)` |
| `list.sort()` | Reorders a list in place. | `names.sort()` |
| `list.sort(key=..., reverse=...)` | Reorders a list by a key and direction. | `tasks.sort(key=len, reverse=True)` |