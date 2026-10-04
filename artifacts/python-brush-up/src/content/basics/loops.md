## What is it?
Loops repeat a block. A `for` loop asks an iterable for each item; `while` repeats while a condition remains true.

## Syntax
```python
for item in items:
    ...

while condition:
    ...
```

## Example
```python
scores = [8, 9, 7]
total = 0
for score in scores:
    total += score
```

## When to use
Use `for` for each-item work. Use `while` when repetition depends on a condition that changes during the loop.

## When not to use
Do not use a `while` loop when iterating a known collection; `for` is shorter and avoids index mistakes.

## Common mistake
A `while` condition that never changes can loop forever. `break` exits; `continue` skips to the next iteration.

## Tip
For indices and values together, reach for `enumerate()` instead of a manual counter.

## Remember
Iterate over values directly, and make loop termination obvious.