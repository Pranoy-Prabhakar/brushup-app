## What is it?
An iterable can produce an iterator; an iterator returns one item at a time through `next()` until it raises `StopIteration`.

## Syntax
```python
iterator = iter(values)
first = next(iterator)
```

## Example
```python
for line in open("notes.txt"):
    print(line)
```

## When to use
Most of the time, consume iterators with `for`, comprehensions, or built-ins such as `next()`.

## When not to use
Do not manually implement the protocol for ordinary loops; Python already handles it.

## Common mistake
An iterator is usually exhausted after one pass; create a new iterator from a reusable iterable to start again.

## Tip
Iterators enable lazy processing without materializing an entire sequence in memory.

## Remember
`for` asks for an iterator and keeps requesting values until it is exhausted.