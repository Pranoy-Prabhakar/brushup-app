## What is it?
Strings hold text. They cannot be changed in place, but you can search, slice, and format them.

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
Use f-strings to put values into text. Use string methods for common text changes.

## Common mistake
Strings cannot be changed in place; methods such as `replace()` return a new string.

## Tip
Use `.strip()` at input boundaries, not indiscriminately inside trusted content.

## Remember
String methods make new text; f-strings make values easy to read.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `str.strip()` | Removes whitespace at both ends. | `" hi ".strip()` |
| `str.split(sep)` | Splits text into a list. | `"a,b".split(",")` |
| `str.join(items)` | Joins strings with a separator. | `", ".join(["a", "b"])` |
| `str.replace(old, new)` | Replaces matching text. | `"tea".replace("t", "p")` |
| `str.startswith(prefix)` | Checks the beginning of text. | `"notes.txt".startswith("notes")` |
| `str.lower()` | Makes letters lowercase. | `"Hi".lower()` |