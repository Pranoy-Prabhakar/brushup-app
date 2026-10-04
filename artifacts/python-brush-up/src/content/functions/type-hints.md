## What is it?
Type hints are notes about the kinds of values a function expects or returns. They help readers and editor tools; Python does not normally enforce them while the program runs.

## Syntax
```python
from typing import Callable, Literal, Protocol

def greet(names: list[str]) -> str:
    return ", ".join(names)
```

## Example
```python
def lookup(scores: dict[str, int], name: str) -> int | None:
    return scores.get(name)
```

## When to use
Add hints when they make a function's inputs and result easier to understand.

## Common mistake
A hint is not a conversion or a guarantee. Passing the wrong value may still run until an operation fails.

## Tip
Modern Python supports built-in generic forms such as `list[str]` and `dict[str, int]`. Some advanced names come from the standard-library `typing` module.

## Remember
Hints explain intent to people and tools; they do not change values.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `list[str]` | Hints at a list containing text values. | `names: list[str] = []` |
| `dict[str, int]` | Hints at text keys and integer values. | `scores: dict[str, int] = {}` |
| `str | None` | Hints at text or no value (Python 3.10+). | `name: str | None = None` |
| `Literal[...]` | Standard-library typing form limits allowed values. | `mode: Literal["read", "write"]` |
| `Callable` | Standard-library typing form describes a callable value. | `action: Callable[[], None]` |
| `Protocol` | Standard-library typing form describes required behavior. | `class HasName(Protocol): ...` |