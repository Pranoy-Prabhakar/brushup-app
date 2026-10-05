---
title: "Inheritance"
slug: "inheritance"
category: "OOP"
summary: "Specialize behavior from a parent class."
keywords: "parent subclass super"
order: 16
related: ["classes", "composition", "dataclasses"]
---

## What is it?
Inheritance makes a new class from an existing one. The new class can reuse or change its behavior.

## Syntax
```python
class Child(Parent):
    ...
```

## Example
```python
class TimedTask(Task):
    def __init__(self, name, seconds):
        super().__init__(name)
        self.seconds = seconds
```

## When to use
Use inheritance when the new class really is a kind of the parent and works in its place.

## When not to use
Do not inherit just to share a few lines of code; using a helper object is often easier to change.

## Common mistake
If a changed method behaves very differently, code expecting the parent class may break.

## Tip
Use `super()` to extend parent initialization or behavior without naming the parent directly.

## Remember
Inheritance means “is a”; a child should still work wherever its parent is expected.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `super()` | Calls a parent class method. | `super().__init__(name)` |
| `isinstance(obj, Class)` | Checks a class or one of its parent classes. | `isinstance(task, Task)` |
| `issubclass(Child, Parent)` | Checks whether one class inherits from another. | `issubclass(TimedTask, Task)` |
| `type(obj)` | Shows an object's exact class. | `type(task)` |
| `object.__str__()` | Provides a readable text form to override. | `def __str__(self): ...` |