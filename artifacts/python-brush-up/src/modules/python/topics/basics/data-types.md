---
title: "Data Types"
slug: "data-types"
category: "Basics"
summary: "The built-in values Python works with."
keywords: "types str int float bool none"
order: 2
related: ["type-conversion", "type-inspection", "variables"]
---

## What is it?
Every Python value has a type. Its type tells Python what it can do. Common types are `int` (whole number), `float` (decimal), `str` (text), `bool` (true or false), and `None` (no value).

## Syntax
```python
age = 31           # int
ratio = 0.75        # float
active = True       # bool
nickname = None    # no value
```

## Example
```python
raw = "42"
number = int(raw)
message = f"Next: {number + 1}"
```

## When to use
Choose a type that fits the value. Convert it when reading input or showing output.

## Common mistake
`input()` always returns text. Comparing `"4"` with `4` does not compare equivalent values.

## Tip
Use `is None` to check for no value. Use `isinstance(value, int)` only when you need to check its type.

## Remember
Types shape what values can do. Convert on purpose.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `type(value)` | Shows a value's exact type. | `type(4)  # int` |
| `isinstance(value, type)` | Checks a value's type, including subclasses. | `isinstance(4, int)` |
| `int(value)` | Converts compatible input to an integer. | `int("12")  # 12` |
| `float(value)` | Converts compatible input to a decimal number. | `float("2.5")` |
| `str(value)` | Converts a value to text. | `str(12)  # "12"` |
| `bool(value)` | Converts a value to True or False. | `bool("")  # False` |