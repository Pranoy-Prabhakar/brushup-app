---
title: "Decorators"
slug: "decorators"
category: "Pythonic Python"
summary: "Wrap a function to add behavior around its work."
keywords: "decorator @ functools wraps staticmethod classmethod property"
order: 32
related: ["functools", "functions", "classes"]
---

## What is it?
A decorator is a function that takes another function and returns a changed or wrapped version. The `@name` line applies it when the function is defined.

## Syntax
```python
def announce(function):
    def wrapper():
        print("Starting")
        return function()
    return wrapper

@announce
def greet():
    print("Hello")
```

## Example
```python
greet()
```

## When to use
Decorators help reuse behavior such as logging or timing around several functions.

## Common mistake
A wrapper should return the wrapped function's result. For decorators used in real projects, preserve the original function's name and help text with `functools.wraps`.

## Tip
Use `@property`, `@staticmethod`, and `@classmethod` for common class behaviors.

## Remember
A decorator wraps a function when Python creates it.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `@decorator` | Applies a decorator to the function below it. | `@announce` |
| `functools.wraps(function)` | Standard-library helper that preserves function details. | `@functools.wraps(function)` |
| `@property` | Lets a method be read like an attribute. | `@property` |
| `@staticmethod` | Defines a class function needing no instance. | `@staticmethod` |
| `@classmethod` | Passes the class itself as the first argument. | `@classmethod` |