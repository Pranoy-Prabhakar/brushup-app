## What is it?
A list comprehension builds a list by transforming each item in an iterable, optionally filtering items.

## Syntax
```python
[expression for item in iterable if condition]
```

## Example
```python
names = ["  noa", "Mika ", "", "Jun"]
clean = [name.strip().title() for name in names if name.strip()]
```

## When to use
Use one for a short, readable transformation or filter that fits naturally on a line or two.

## When not to use
Use a regular loop when the logic has multiple branches, side effects, or becomes difficult to scan.

## Common mistake
Putting too much logic in the expression makes a concise comprehension less readable than a loop.

## Tip
Read it aloud as “expression for each item, if condition.”

## Remember
Comprehensions transform and filter; they are not a home for side effects.