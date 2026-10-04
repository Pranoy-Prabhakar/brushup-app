## What is it?
Parameters are names in a function definition; arguments are the values supplied when calling it. Python supports positional, keyword, and default arguments.

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
Use keyword arguments for clarity when a call has several optional settings.

## Common mistake
Avoid mutable defaults such as `items=[]`; that same list is reused across calls. Use `None` and create a list inside instead.

## Tip
Place required parameters before optional parameters.

## Remember
Parameters define the function's interface; arguments fill it at the call site.