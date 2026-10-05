## What is it?
A list comprehension makes a new list by changing each item and, optionally, keeping only items that pass a check.

## Syntax
```python
[expression for item in items if condition]
{expression for item in items if condition}
{key: value for item in items if condition}
(expression for item in items if condition)
```

## Example
```python
names = ["  noa", "Mika ", "", "Jun"]
clean = [name.strip().title() for name in names if name.strip()]
```

## When to use
Use one for a short, clear change or filter that fits on a line or two.

## When not to use
Use a regular loop when the steps are hard to read or do more than make the new list, such as changing another value or writing to a file.

## Common mistake
Adding too much logic makes the comprehension harder to read than a regular loop.

## Tip
Read it aloud as “expression for each item, if condition.”

## Remember
Comprehensions change or filter items; do not use them for side effects.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `range(stop)` | Produces integers for a comprehension. | `[n * 2 for n in range(3)]` |
| Set comprehension | Makes a set of unique results. | `{x.lower() for x in words}` |
| Dictionary comprehension | Makes key-value pairs in a new dictionary. | `{x: len(x) for x in words}` |
| Generator expression | Produces results one at a time. | `(x * 2 for x in values)` |
| `enumerate(items)` | Supplies an index as well as each item. | `[(i, x) for i, x in enumerate(items)]` |
| `zip(a, b)` | Combines matching items. | `[(a, b) for a, b in zip(xs, ys)]` |
| `filter(function, items)` | Keeps items where a test is true. | `list(filter(str.isalpha, words))` |
| `map(function, items)` | Applies a function to each item. | `list(map(str.upper, words))` |