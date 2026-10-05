## What is it?
Conditions choose which code runs when something is true or false. Indentation shows where each block starts and ends.

## Syntax
```python
if condition:
    ...
elif another_condition:
    ...
else:
    ...
```

## Example
```python
temperature = 18
if temperature < 10:
    advice = "bring a coat"
elif temperature < 22:
    advice = "light layer"
else:
    advice = "short sleeves"
```

## When to use
Use branches when different cases need different actions. Combine checks with `and`, `or`, and `not`.

## Common mistake
Use `==` to compare; `=` assigns a value. Empty collections, zero, `None`, and `False` count as false in a condition.

## Tip
Prefer direct truth checks such as `if items:` over comparing a collection to `[]`.

## Remember
The first true branch runs; `else` handles the rest.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `bool(value)` | Checks whether a value is true-like. | `bool([])  # False` |
| `any(items)` | True if at least one item is true-like. | `any([0, 2])  # True` |
| `all(items)` | True only if every item is true-like. | `all([1, 2])  # True` |
| `in` / `not in` | Checks whether a value is present. | `"x" in "text"` |
| `and`, `or`, `not` | Combine or reverse true/false checks. | `ready and not busy` |