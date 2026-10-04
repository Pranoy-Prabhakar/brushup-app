## What is it?
Type conversion makes a value into another kind of value. For example, text from a form can become a number before a calculation.

## Syntax
```python
count = int("12")
label = str(count)
```

## Example
```python
raw_scores = ["8", "10"]
scores = [int(score) for score in raw_scores]
average = sum(scores) / len(scores)
```

## When to use
Convert at the edge of a program, such as when reading text or preparing output.

## Common mistake
Not every value can be converted. `int("eight")` raises `ValueError`, and `bool("False")` is `True` because the text is not empty.

## Tip
Handle conversions that may fail with a specific `ValueError` exception.

## Remember
Conversion changes the value's type; check that the input makes sense first.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `int(value)` | Makes a whole number when possible. | `int("12")  # 12` |
| `float(value)` | Makes a decimal number when possible. | `float("2.5")  # 2.5` |
| `str(value)` | Makes text from a value. | `str(12)  # "12"` |
| `bool(value)` | Uses Python's true/false rules. | `bool("")  # False` |
| `list(items)` | Makes a changeable list. | `list("ab")  # ["a", "b"]` |
| `tuple(items)` | Makes a fixed ordered tuple. | `tuple([1, 2])` |
| `set(items)` / `dict(items)` | Makes a set or dictionary from compatible input. | `set([1, 1, 2])  # {1, 2}` |