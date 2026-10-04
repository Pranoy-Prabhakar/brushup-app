## What is it?
A module is a Python file whose names can be imported elsewhere. Packages group modules into a reusable structure.

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
Split code into modules around cohesive responsibilities and import only the names you need.

## Common mistake
Naming a file after a standard library module, such as `json.py`, can shadow the real module.

## Tip
Keep executable setup behind `if __name__ == "__main__":` when a module should also be imported.

## Remember
A module is a file; importing it makes its names available.