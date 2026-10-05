## What is it?
Parameters are input names in a function. Arguments are the values you pass when calling it. You can pass them by position or name, and set default values.

## Syntax
```python
def greet(name, punctuation="!"):
    return f"Hello, {name}{punctuation}"
```

## Example
```python
greet("Ari")
greet(name="Ari", punctuation=".")
```

## When to use
Use named arguments when a call has several optional settings.

## Common mistake
Do not use a list like `items=[]` as a default. The same list is reused each time. Use `None` and make a new list inside.

## Tip
Place required parameters before optional parameters.

## Remember
Parameters name the inputs; arguments provide their values.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `*args` | Collects extra positional arguments. | `def f(first, *rest): ...` |
| `**kwargs` | Collects extra named arguments. | `def f(**options): ...` |
| `None` default | Lets a function create a fresh list per call. | `def f(items=None): ...` |
| `inspect.signature()` | Shows a function's parameters. | `inspect.signature(greet)` |
| `callable(value)` | Checks whether a value is a function-like object. | `callable(greet)` |