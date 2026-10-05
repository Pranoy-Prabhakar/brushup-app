---
title: "Strings"
slug: "strings"
category: "Basics"
summary: "Create, format, and inspect text."
keywords: "string text f-string format"
order: 23
related: ["input-output", "type-conversion", "data-types"]
---

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
| `str.lstrip()` / `str.rstrip()` | Removes whitespace from one end. | `" hi ".lstrip()` |
| `str.split(sep)` | Splits text into a list. | `"a,b".split(",")` |
| `str.rsplit()` / `str.splitlines()` | Splits from the right or at line breaks. | `"a\\nb".splitlines()` |
| `str.join(items)` | Joins strings with a separator. | `", ".join(["a", "b"])` |
| `str.replace(old, new)` | Replaces matching text. | `"tea".replace("t", "p")` |
| `str.find()` / `str.rfind()` | Finds the first or last matching position; returns -1 when absent. | `"banana".rfind("a")  # 5` |
| `str.index()` / `str.count()` | Finds a match or counts its occurrences. | `"banana".count("a")  # 3` |
| `str.startswith()` / `str.endswith()` | Checks the start or end of text. | `"notes.txt".endswith(".txt")` |
| `str.upper()` / `str.lower()` | Changes letters to upper or lower case. | `"Hi".lower()  # "hi"` |
| `str.capitalize()` / `str.title()` / `str.swapcase()` | Applies common letter-case changes. | `"hello world".title()` |
| `str.isalpha()` / `str.isdigit()` / `str.isnumeric()` | Checks whether characters are letters or number characters. | `"42".isdigit()` |
| `str.isalnum()` / `str.isspace()` | Checks for letters-or-numbers, or whitespace. | `" ".isspace()` |
| `str.islower()` / `str.isupper()` | Checks the text's letter case. | `"HI".isupper()` |
| `str.format()` / f-string | Inserts values into formatted text. | `f"Hi, {name}"` |