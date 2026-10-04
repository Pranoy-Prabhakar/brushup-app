## What is it?
Python values have types that determine which operations make sense. Core built-ins include `int`, `float`, `str`, `bool`, and `None`.

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
Choose a type that expresses the role of the data; convert explicitly at input and output boundaries.

## Common mistake
`input()` always returns text. Comparing `"4"` with `4` does not compare equivalent values.

## Tip
Use `is None` to test for the sentinel `None`; use `isinstance(value, int)` when type inspection is genuinely needed.

## Remember
Types shape behavior, and conversion should be deliberate.