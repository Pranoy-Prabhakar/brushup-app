---
title: "Classes"
slug: "classes"
category: "OOP"
summary: "Bundle state and behavior into an object."
keywords: "class object self init"
order: 15
related: ["dataclasses", "composition", "inheritance"]
---

## What is it?
A class describes a kind of object. Each instance is one object with its own data and actions (methods).

## Syntax
```python
class Counter:
    def __init__(self, start=0):
        self.value = start
```

## Example
```python
class Counter:
    def __init__(self, start=0):
        self.value = start

    def increment(self):
        self.value += 1
```

## When to use
Use a class when some data and the actions that work on it belong together.

## When not to use
Use a simple function and a list or dictionary if there is no special behavior to keep track of.

## Common mistake
An instance method gets the current object first. By convention, that input is named `self`.

## Tip
Set required data in `__init__` so each new object is ready to use.

## Remember
A class is the plan; an instance is one object made from it.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `isinstance(obj, Class)` | Checks an object's class. | `isinstance(counter, Counter)` |
| `type(obj)` | Shows an object's exact class. | `type(counter)` |
| `issubclass(Child, Parent)` | Checks whether one class derives from another. | `issubclass(SpecialCounter, Counter)` |
| `object()` | Base class from which ordinary classes inherit. | `class Counter: ...` |
| `self` | Names the current instance inside a method. | `self.value = 0` |
| `__init__(self, ...)` | Sets up a new instance. | `def __init__(self, start=0): ...` |
| `__str__()` / `__repr__()` | Supplies readable or debugging text for an object. | `def __str__(self): return self.name` |
| `__len__()` / `__eq__()` / `__lt__()` | Lets objects define length and comparisons. | `def __len__(self): return len(self.items)` |
| `__iter__()` / `__next__()` | Lets an object provide items as an iterator. | `def __iter__(self): return iter(self.items)` |
| `__enter__()` / `__exit__()` | Makes an object usable in a `with` block. | `with resource: ...` |
| `@property` | Lets a method be read like an attribute. | `@property` |
| `property()` | Built-in for defining managed attributes. | `name = property(get_name)` |
| `super()` | Calls a parent class implementation. | `super().__init__()` |