---
title: "Variables"
slug: "variables"
category: "Basics"
summary: "Names, values, and assignment in Python."
keywords: "variable assignment name state"
order: 1
related: ["data-types", "type-conversion", "type-inspection"]
---

## What is it?
A variable is a name that points to a value. Python gets the type from that value, and you can point the name to a new value later.

## Syntax
```python
count = 3
label = "ready"
count += 1
```

## Example
```python
price = 12.5
quantity = 4
total = price * quantity
print(total)  # 50.0
```

## When to use
Use names to make values clear, label a result, or avoid repeating a calculation.

## When not to use
Skip a variable that only renames a clear, one-time expression. An extra name can make short code harder to follow.

## Common mistake
`=` sets a value; `==` compares values. A name points to an object; it is not a typed storage box.

## Tip
Prefer descriptive `snake_case` names and keep one concept per name.

## Remember
Names point to values; assignment sets or changes that link.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `type(value)` | Shows a value's type. | `type("hi")  # str` |
| `id(value)` | Gives an identity number for an object. | `id(item)` |
| `is` / `is not` | Checks whether names refer to the same object. | `value is None` |
| `+=` | Adds to and reassigns a number. | `count += 1` |
| `:=` | Assigns inside an expression. | `if (n := len(items)) > 0:` |