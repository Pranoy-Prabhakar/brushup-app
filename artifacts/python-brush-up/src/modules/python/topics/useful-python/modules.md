## What is it?
A module is a Python file you can import into another file. A package groups related modules.

## Syntax
```python
import json
from pathlib import Path
```

## Example
```python
# geometry.py
def area(width, height):
    return width * height

# another file
from geometry import area
```

## When to use
Split code into files by job, and import only the names you need.

## Common mistake
Do not name your file after a standard module like `json.py`; Python may load your file instead.

## Tip
Keep executable setup behind `if __name__ == "__main__":` when a module should also be imported.

## Remember
A module is a file; import it to use its names elsewhere.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `import module` | Makes a module available by its name. | `import json` |
| `from module import name` | Imports one name directly. | `from pathlib import Path` |
| `__name__` | Holds a module's current name. | `if __name__ == "__main__":` |
| `dir(module)` | Lists names available on a module. | `dir(json)` |
| `help(module)` | Shows help for a module. | `help(pathlib)` |