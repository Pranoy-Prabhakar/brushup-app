## What is it?
Use `open()` to read or write a file. A `with` block closes it for you, even if an error happens.

## Syntax
```python
with open("notes.txt", "r", encoding="utf-8") as file:
    text = file.read()
```

## Example
```python
with open("notes.txt", "a", encoding="utf-8") as file:
    file.write("One more note\n")
```

## When to use
Use `with` when opening files so Python closes them automatically. Set an encoding for text files.

## When not to use
For path construction and filesystem operations, use `pathlib` rather than string concatenation.

## Common mistake
Opening a file without `with` can leave it open longer than expected. Writing with mode `"w"` replaces existing contents.

## Tip
Use `"r"` to read, `"w"` to replace, and `"a"` to append.

## Remember
Open files inside `with`; Python closes them when the block ends.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `open(path, mode)` | Opens a file for reading or writing. | `open("notes.txt", encoding="utf-8")` |
| `file.read()` | Reads file contents as text. | `text = file.read()` |
| `file.readline()` | Reads one line. | `line = file.readline()` |
| `file.write(text)` | Writes text to a file. | `file.write("Hello\n")` |
| `file.readlines()` | Reads remaining lines into a list. | `lines = file.readlines()` |
| `with` | Closes the file automatically after the block. | `with open(path) as file:` |