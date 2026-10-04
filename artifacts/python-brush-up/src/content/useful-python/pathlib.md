## What is it?
`pathlib.Path` is an object for a file or folder location. It has handy ways to join, read, and check paths.

## Syntax
```python
from pathlib import Path
path = Path("data") / "notes.txt"
```

## Example
```python
from pathlib import Path

path = Path("data") / "notes.txt"
if path.exists():
    text = path.read_text(encoding="utf-8")
```

## When to use
Use `Path` to join paths and do common file or folder tasks across operating systems.

## When not to use
A relative path starts from the folder where the program was run, not always the folder holding your code.

## Common mistake
Do not join path strings with `+`; separators differ across operating systems.

## Tip
Use `Path(__file__).parent` when a path should be anchored beside the current Python module.

## Remember
Use `/` between `Path` objects to join paths safely.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `Path(path)` | Makes a path object. | `Path("data/notes.txt")` |
| `pathlib.Path / name` | Joins two path parts. | `Path("data") / "notes.txt"` |
| `Path.exists()` | Checks whether a path exists. | `path.exists()` |
| `Path.is_file()` | Checks whether a path is a file. | `path.is_file()` |
| `Path.is_dir()` | Checks whether a path is a directory. | `path.is_dir()` |
| `Path.mkdir()` | Creates a directory. | `path.mkdir(parents=True, exist_ok=True)` |
| `Path.iterdir()` / `Path.glob()` | Lists direct children or matches a pattern. | `path.glob("*.txt")` |
| `Path.rglob()` | Searches folders below this path for matches. | `path.rglob("*.md")` |
| `Path.read_text()` | Reads a text file. | `path.read_text(encoding="utf-8")` |
| `Path.write_text(text)` | Writes text to a file. | `path.write_text("Hi", encoding="utf-8")` |
| `Path.unlink()` / `Path.rename()` | Deletes a file or renames a path. | `path.rename(path.with_name("new.txt"))` |
| `Path.name`, `.stem`, `.suffix`, `.parent` | Reads the filename parts or containing folder. | `path.suffix  # ".txt"` |