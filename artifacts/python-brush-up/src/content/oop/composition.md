## What is it?
Composition builds an object from smaller helper objects. The main object asks each helper to do its job.

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
Use composition to combine separate jobs or swap a helper without changing the main object.

## When not to use
Do not make every value a class. A function or list may be clearer.

## Common mistake
Give each helper a clear job. A vague “manager” can end up doing too much.

## Tip
Ask for the small action you need, not a large, complicated helper.

## Remember
Composition means “has a”; let each helper do its focused job.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `hasattr(obj, name)` | Checks whether an object has a named attribute. | `hasattr(payment, "charge")` |
| `getattr(obj, name)` | Reads an attribute by name. | `getattr(payment, "charge")` |
| `setattr(obj, name, value)` | Sets an attribute by name. | `setattr(report, "title", "Week")` |
| `delattr(obj, name)` | Removes a named attribute from an object. | `delattr(report, "title")` |
| `callable(value)` | Checks if a collaborator can be called. | `callable(payment.charge)` |
| `isinstance(obj, type)` | Checks whether an object has a given type. | `isinstance(payment, Gateway)` |