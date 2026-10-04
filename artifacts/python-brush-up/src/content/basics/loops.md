## What is it?
Loops repeat code. A `for` loop visits each item in a collection (or other source of items). A `while` loop repeats as long as its check stays true.

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
Use `for` to work through items. Use `while` when you repeat until a check changes.

## When not to use
Do not use `while` for a collection you can loop over directly; `for` is simpler and avoids index mistakes.

## Common mistake
A `while` condition that never changes can loop forever. `break` exits; `continue` skips to the next iteration.

## Tip
For indices and values together, reach for `enumerate()` instead of a manual counter.

## Remember
Loop over values directly, and make it clear when a loop ends.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `range(stop)` | Produces a run of integers. | `range(3)  # 0, 1, 2` |
| `enumerate(items)` | Yields each index and item. | `enumerate(names, start=1)` |
| `zip(a, b)` | Yields matching items from iterables. | `zip(names, scores)` |
| `reversed(items)` | Iterates over items in reverse order. | `reversed([1, 2])` |
| `sorted(items)` | Returns items in sorted order for a loop. | `for n in sorted(scores): ...` |
| `iter(items)` | Makes an iterator that supplies items one at a time. | `iterator = iter(names)` |
| `next(iterator)` | Gets the next item, or raises `StopIteration`. | `next(iterator)` |
| `break` | Exits the current loop. | `if done: break` |
| `continue` | Skips to the next loop item. | `if skip: continue` |