## What is it?
`zip()` combines items from multiple iterables position by position and yields tuples lazily.

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
Use it to process aligned sequences together or construct pairs from parallel data.

## Common mistake
By default, `zip()` stops at the shortest iterable. Use `zip(..., strict=True)` when different lengths should fail.

## Tip
`zip(*pairs)` can unpack paired columns, when the input is non-empty.

## Remember
`zip` walks iterables together and normally truncates to the shortest.