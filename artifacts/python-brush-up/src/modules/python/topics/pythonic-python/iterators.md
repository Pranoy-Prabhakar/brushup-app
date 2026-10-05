## What is it?
An iterable is a value you can loop over, like a list or string. An iterator gives you one item at a time when you call `next()`.

## Syntax
```python
iterator = iter(values)
first = next(iterator)
```

## Example
```python
with open("notes.txt", encoding="utf-8") as file:
    for line in file:
        print(line)
```

## When to use
Most of the time, use a `for` loop; Python handles the iterator for you. Use `next()` when you need to choose when to get each item.

## When not to use
Do not build an iterator just to run a normal loop; Python handles that for you.

## Common mistake
An iterator usually runs out after one pass. Start again by making a new one from the original list or other source.

## Tip
Iterators can handle items one at a time instead of storing them all in memory.

## Remember
`for` gets items one at a time until there are no more.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `iter(items)` | Makes an iterator from a list or other source. | `it = iter(names)` |
| `next(it)` | Gets the next item; errors when exhausted. | `next(it)` |
| `next(it, default)` | Gets the next item or a fallback. | `next(it, None)` |
| `iter(callable, stop_value)` | Calls a function until it returns the stop value. | `iter(read_line, "")` |
| `__iter__()` / `__next__()` | Methods that make an object follow the iterator protocol. | `def __iter__(self): return self` |
| `enumerate(items)` | Gives each item with its position. | `enumerate(names)` |
| `itertools.islice(items, stop)` | Takes only a chosen number of items. | `itertools.islice(numbers, 3)` |