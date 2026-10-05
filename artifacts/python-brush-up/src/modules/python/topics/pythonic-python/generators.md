## What is it?
A generator produces values one at a time instead of building them all at once. A function becomes a generator when it uses `yield`; `yield` sends out a value and pauses until the next request.

## Syntax
```python
def count_up_to(limit):
    number = 1
    while number <= limit:
        yield number
        number += 1
```

## Example
```python
for number in count_up_to(3):
    print(number)
```

## When to use
Use a generator when a sequence may be large or when values can be made as they are needed.

## Common mistake
A generator is usually used up after one pass. Call its generator function again to start a fresh one.

## Tip
A generator expression uses parentheses: `(n * 2 for n in numbers)`.

## Remember
`yield` pauses a function and gives the next value when asked.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `yield value` | Produces one value and pauses the generator. | `yield item` |
| `next(generator)` | Requests the next produced value. | `next(count_up_to(2))  # 1` |
| `iter(items)` | Gets an iterator from an iterable. | `iter([1, 2])` |
| `list(generator)` | Collects all produced values into a list. | `list(n * 2 for n in range(3))` |
| Generator expression | Produces values lazily with parentheses. | `(x for x in values)` |