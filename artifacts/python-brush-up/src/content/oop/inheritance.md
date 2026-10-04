## What is it?
Inheritance creates a specialized class from a parent class, reusing or overriding behavior.

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
Use inheritance when a subtype genuinely satisfies the parent's interface and can stand in for it.

## When not to use
Avoid inheritance solely to share a few lines; composition is often more flexible.

## Common mistake
Overriding a method with incompatible behavior can violate what callers expect from the parent type.

## Tip
Use `super()` to extend parent initialization or behavior without naming the parent directly.

## Remember
Inheritance models “is a”; keep the subtype substitutable for its parent.