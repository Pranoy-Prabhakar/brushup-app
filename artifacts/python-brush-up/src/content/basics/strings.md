## What is it?
Strings are immutable sequences of Unicode text. They support slicing, searching, and formatting.

## Syntax
```python
name = "Mina"
greeting = f"Hello, {name}!"
```

## Example
```python
line = "  green,blue  "
colors = [part.strip() for part in line.split(",")]
print(" / ".join(colors))
```

## When to use
Use f-strings for readable interpolation and string methods for common text transformations.

## Common mistake
Strings cannot be changed in place; methods such as `replace()` return a new string.

## Tip
Use `.strip()` at input boundaries, not indiscriminately inside trusted content.

## Remember
Text operations return new strings; f-strings keep formatting legible.