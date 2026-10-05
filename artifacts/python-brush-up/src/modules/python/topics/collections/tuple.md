## What is it?
A tuple is an ordered group of values that cannot be changed. Use it for a small, fixed set of details.

## Syntax
```python
point = (4, 7)
x, y = point
single = ("only",)
```

## Example
```python
def min_max(values):
    return min(values), max(values)

low, high = min_max([8, 2, 5])
```

## When to use
Use tuples for fixed records, multiple return values, or values that should not be reassigned item by item.

## Common mistake
Parentheses alone do not create a one-item tuple; the trailing comma does.

## Tip
Unpack into descriptive names as soon as the tuple's positions have meaning.

## Remember
Tuples keep order and cannot be changed item by item.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `tuple(items)` | Makes a tuple from a list or other group of values. | `tuple([1, 2])` |
| `len(value)` | Counts tuple items. | `len((4, 7))  # 2` |
| `tuple.count(value)` | Counts matching items. | `(1, 1, 2).count(1)` |
| `tuple.index(value)` | Finds the first matching position. | `("a", "b").index("b")` |
| `min(items)` | Returns the smallest item. | `min((8, 2, 5))` |
| `max(items)` | Returns the largest item. | `max((8, 2, 5))` |