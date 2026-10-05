---
title: "Type Inspection"
slug: "type-inspection"
category: "Basics"
summary: "Find out what a value is and what it can do."
keywords: "type isinstance id dir help callable inspect object"
order: 27
related: ["type-conversion", "data-types", "type-hints"]
---

## What is it?
Type inspection means asking Python about a value. It helps when a program must handle different kinds of values or when you are exploring unfamiliar code.

## Syntax
```python
type(value)
isinstance(value, str)
```

## Example
```python
value = "hello"
if isinstance(value, str):
    print(value.upper())
```

## When to use
Use `isinstance()` when behavior really depends on a value's type. Use `type()` when you want to see its exact type while learning or debugging.

## Common mistake
`type()` checks the exact type; `isinstance()` also accepts a value whose class inherits from the requested type.

## Tip
Often it is clearer to try the operation and handle a specific error than to check a type first.

## Remember
Ask about a type when the answer changes what your code should do.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `type(value)` | Shows the exact type of a value. | `type(4)  # int` |
| `isinstance(value, type)` | Checks a type, including parent classes. | `isinstance(True, int)  # True` |
| `id(value)` | Shows an identity number for this object. | `id(name)` |
| `dir(value)` | Lists names available on a value. | `dir("tea")` |
| `help(value)` | Opens Python's built-in help for a value. | `help(str)` |
| `callable(value)` | Checks whether the value can be called. | `callable(len)  # True` |