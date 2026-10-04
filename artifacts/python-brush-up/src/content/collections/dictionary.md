## What is it?
A dictionary maps unique, hashable keys to values. Lookups use a key instead of a numeric position.

## Syntax
```python
profile = {"name": "Inez", "active": True}
profile["name"]
profile["level"] = 3
```

## Example
```python
prices = {"tea": 3.25, "bread": 4.10}
total = sum(prices[item] for item in ["tea", "bread"])
```

## When to use
Use a dictionary for named fields, counters, caches, and fast key-based lookup.

## When not to use
If you only need unique values, a set is simpler. If position is the meaning, use a list.

## Common mistake
Indexing a missing key raises `KeyError`. Use `.get(key, default)` when absence is an expected case.

## Tip
Iterate with `.items()` when you need both keys and values.

## Remember
Dictionaries map unique keys to values; lookup by meaning, not position.