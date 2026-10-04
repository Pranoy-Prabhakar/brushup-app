## What is it?
A variable is a name bound to an object. Python infers the type from the value, and names can be rebound as your program runs.

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
Use names to make values explicit, give intermediate results meaning, and avoid repeating a calculation.

## When not to use
Avoid a variable that merely renames a clear one-off expression; extra indirection can make a short operation harder to read.

## Common mistake
`=` assigns a value; `==` compares two values. A name also points to an object rather than becoming a typed storage box.

## Tip
Prefer descriptive `snake_case` names and keep one concept per name.

## Remember
Names point to values; assignment binds or rebinds a name.