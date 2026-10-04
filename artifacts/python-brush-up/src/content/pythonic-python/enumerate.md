## What is it?
`enumerate()` yields each item together with a running index, without a separate counter variable.

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
Use it whenever a loop needs both the current item and its position.

## Common mistake
Do not pair `range(len(values))` with repeated indexing when you can loop over values directly.

## Tip
Pass `start=1` for human-facing numbering while keeping Python's default zero-based indexing elsewhere.

## Remember
`enumerate(iterable)` gives you `(index, value)` pairs.