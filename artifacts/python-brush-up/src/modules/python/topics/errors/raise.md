## What is it?
`raise` reports an error so the caller knows the operation could not continue.

## Syntax
```python
raise ValueError("amount must be positive")
```

## Example
```python
def withdraw(balance, amount):
    if amount <= 0:
        raise ValueError("amount must be positive")
    if amount > balance:
        raise ValueError("insufficient funds")
    return balance - amount
```

## When to use
Raise a clear, specific error when input breaks a rule.

## Common mistake
Use bare `raise` inside an `except` block to pass the same error on. Outside one, there is no error to re-raise.

## Tip
Use built-in exception types when they fit, and write messages that explain how to fix the problem.

## Remember
Raise an error as soon as you know something is wrong.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `ValueError(message)` | Describes a value that is not allowed. | `raise ValueError("bad age")` |
| `TypeError(message)` | Describes a value of the wrong type. | `raise TypeError("name must be text")` |
| `raise` | Stops work by raising an exception. | `raise RuntimeError("offline")` |
| `raise` (inside `except`) | Raises the caught exception again. | `except OSError: raise` |
| `str(exception)` | Gets the exception message as text. | `str(error)` |