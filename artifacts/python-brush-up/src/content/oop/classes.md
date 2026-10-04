## What is it?
A class defines a type; each instance holds its own state and can expose behavior through methods.

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
Use a class when data and the operations that maintain its rules belong together.

## When not to use
Prefer a simple function and built-in data structure when there is no meaningful object behavior or invariant.

## Common mistake
Instance methods receive the instance as their first argument, conventionally named `self`.

## Tip
Initialize required instance state in `__init__` so every instance begins valid.

## Remember
A class describes; an instance is the concrete object.