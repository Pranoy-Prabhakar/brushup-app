## What is it?
`raise` signals an error by creating or re-raising an exception. It lets invalid operations fail clearly.

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
Raise a specific exception when an input or state violates a documented requirement.

## Common mistake
Bare `raise` is for re-raising inside an exception handler; outside it there is no active exception.

## Tip
Use built-in exception types when they fit, and write messages that explain how to fix the problem.

## Remember
Raise at the point an invalid state becomes clear.