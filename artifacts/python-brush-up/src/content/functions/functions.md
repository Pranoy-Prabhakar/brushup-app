## What is it?
A function is a named, reusable block of work. It can accept inputs and return a result to its caller.

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
Use a function to name a task, remove meaningful duplication, or isolate a behavior with a clear input/output contract.

## Common mistake
A function without an explicit `return` returns `None`. `print()` displays a value but does not return it.

## Tip
Keep each function focused and make its name describe the result or action.

## Remember
Call a function with `()`, and use `return` to hand a value back.