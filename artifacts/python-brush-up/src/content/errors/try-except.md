## What is it?
`try` runs risky work; matching `except` blocks handle specific exceptions. Optional `else` runs on success and `finally` always runs.

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
Handle errors where you can recover, add context, or present a useful response to the caller.

## When not to use
Do not wrap large blocks in a broad `except Exception` that hides unrelated bugs.

## Common mistake
Catching an exception and silently continuing can turn a visible failure into corrupted state.

## Tip
Catch the narrowest expected exception and keep the protected `try` block small.

## Remember
Handle only errors you can do something useful about.