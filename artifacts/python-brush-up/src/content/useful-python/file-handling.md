## What is it?
Python's `open()` gives you a file object for reading or writing. A `with` block closes it reliably, even if an error occurs.

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
Use a context manager for file access so cleanup is automatic. Specify an encoding for text files.

## When not to use
For path construction and filesystem operations, use `pathlib` rather than string concatenation.

## Common mistake
Opening a file without `with` can leave it open longer than expected. Writing with mode `"w"` replaces existing contents.

## Tip
Use `"r"` to read, `"w"` to replace, and `"a"` to append.

## Remember
Open inside `with`; the file closes when the block ends.