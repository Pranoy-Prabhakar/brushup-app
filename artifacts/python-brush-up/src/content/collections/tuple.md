## What is it?
A tuple is an ordered, immutable sequence. It is useful for a small fixed group of values.

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
Tuples keep order and cannot be reassigned by index.