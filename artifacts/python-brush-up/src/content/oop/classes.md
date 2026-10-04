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
| `self` | Names the current instance inside a method. | `self.value = 0` |
| `__init__(self, ...)` | Sets up a new instance. | `def __init__(self, start=0): ...` |
| `@property` | Lets a method be read like an attribute. | `@property` |
| `super()` | Calls a parent class implementation. | `super().__init__()` |