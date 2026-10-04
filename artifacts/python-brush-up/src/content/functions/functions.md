## What is it?
A function is a named block of code you can reuse. It can take inputs and send back a result.

## Syntax
```python
def double(number):
    return number * 2
```

## Example
```python
def area(width, height):
    """Return the area of a rectangle."""
    return width * height
```

## When to use
Use a function to name a task, avoid repeating the same work, or keep one job in one place.

## Common mistake
A function without an explicit `return` returns `None`. `print()` displays a value but does not return it.

## Tip
Keep each function focused and make its name describe the result or action.

## Remember
Call a function with `()`; use `return` to send a value back.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `callable(value)` | Checks whether a value can be called. | `callable(len)  # True` |
| `help(function)` | Shows built-in help for a function. | `help(sorted)` |
| `return` | Sends a result back to the caller. | `return price * count` |
| `*args` | Accepts any number of positional values. | `def total(*values): ...` |
| `lambda args: value` | Makes a small unnamed function. | `double = lambda n: n * 2` |