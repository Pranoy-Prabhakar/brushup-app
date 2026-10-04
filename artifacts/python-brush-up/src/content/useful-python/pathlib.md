## What is it?
`pathlib.Path` represents a filesystem path with methods for joining, reading, and inspecting paths.

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
Use `Path` for portable path composition and common filesystem operations.

## When not to use
Do not assume a relative path is relative to the source file; it is resolved from the process working directory.

## Common mistake
Joining paths with string `+` can produce incorrect separators and fragile platform-specific code.

## Tip
Use `Path(__file__).parent` when a path should be anchored beside the current Python module.

## Remember
Use `/` between `Path` objects to build paths portably.