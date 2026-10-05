---
title: "try / except"
slug: "try-except"
category: "Errors"
summary: "Handle expected failures at a boundary."
keywords: "exception errors catch finally"
order: 18
related: ["raise", "file-handling", "testing"]
---

## What is it?
`try` runs code that may fail. `except` handles a matching error. `else` runs if it worked; `finally` runs either way.

## Syntax
```python
try:
    result = int(text)
except ValueError:
    result = 0
```

## Example
```python
try:
    quantity = int(input_value)
except ValueError:
    print("Enter a whole number.")
else:
    print(quantity * 2)
```

## When to use
Handle errors when you can fix the problem or give the user a useful response.

## When not to use
Do not wrap a large block in `except Exception`; it can hide bugs you did not expect.

## Common mistake
Ignoring an error and carrying on can leave the program in a bad state.

## Tip
Catch only the error you expect, and keep the `try` block small.

## Remember
Catch only errors you can handle usefully.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `try` / `except` | Runs code and handles a matching error. | `except ValueError:` |
| `else` | Runs when the try block had no error. | `else: print(result)` |
| `finally` | Runs whether or not an error occurred. | `finally: close()` |
| `raise` | Signals an error to the caller. | `raise ValueError("bad input")` |
| `str(error)` | Turns an exception message into text. | `print(str(error))` |