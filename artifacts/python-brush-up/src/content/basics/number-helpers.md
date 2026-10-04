## What is it?
Number helpers are built-in functions for everyday arithmetic: measuring distance from zero, rounding, splitting, or finding totals and extremes.

## Syntax
```python
abs(number)
round(number, digits)
```

## Example
```python
prices = [4.25, 2.50, 3.00]
total = sum(prices)
smallest = min(prices)
```

## When to use
Use these built-ins to make common calculations direct and readable.

## Common mistake
Rounding a float does not make decimal money fully exact. For financial calculations, consider the standard-library `decimal` module.

## Tip
`divmod(a, b)` gives both the quotient and remainder in one pair.

## Remember
Prefer the built-in that names the calculation you mean.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `abs(number)` | Gets the distance from zero. | `abs(-4)  # 4` |
| `round(number, digits)` | Rounds to a chosen number of decimal places. | `round(3.141, 2)  # 3.14` |
| `pow(base, exponent)` | Raises one number to a power. | `pow(2, 3)  # 8` |
| `divmod(a, b)` | Returns quotient and remainder together. | `divmod(17, 5)  # (3, 2)` |
| `min(items)` / `max(items)` | Finds the smallest or largest item. | `max([3, 8, 2])  # 8` |
| `sum(numbers)` | Adds numbers from an iterable. | `sum([2, 3])  # 5` |