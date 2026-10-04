## What is it?
Conditions select which block runs based on a truth value. Python uses indentation to define each branch.

## Syntax
```python
if condition:
    ...
elif another_condition:
    ...
else:
    ...
```

## Example
```python
temperature = 18
if temperature < 10:
    advice = "bring a coat"
elif temperature < 22:
    advice = "light layer"
else:
    advice = "short sleeves"
```

## When to use
Use branches when distinct cases need distinct behavior. Combine simple predicates with `and`, `or`, and `not`.

## Common mistake
Use `==` for equality, not `=`. Empty collections, zero, `None`, and `False` are all falsy.

## Tip
Prefer direct truth checks such as `if items:` over comparing a collection to `[]`.

## Remember
The first true branch wins; `else` catches everything remaining.