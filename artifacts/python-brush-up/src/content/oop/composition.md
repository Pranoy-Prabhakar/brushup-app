## What is it?
Composition builds a larger object by giving it smaller collaborator objects whose behavior it delegates to.

## Syntax
```python
class Report:
    def __init__(self, formatter):
        self.formatter = formatter
```

## Example
```python
class Checkout:
    def __init__(self, payment):
        self.payment = payment

    def pay(self, amount):
        return self.payment.charge(amount)
```

## When to use
Use composition to combine independent behaviors or swap collaborators without changing the host object.

## When not to use
Avoid wrapping every value in a class when a plain function or data structure is clearer.

## Common mistake
A collaborator should have a clear role; a vague “manager” dependency can hide too many responsibilities.

## Tip
Depend on the small behavior you need, not on a sprawling concrete implementation.

## Remember
Composition models “has a”; delegate work to focused collaborators.