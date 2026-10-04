## What is it?
A dictionary stores values under keys, such as names or numbers. Use a key to find a value instead of its position.

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
Use a dictionary for named details, counts, saved results, or quick lookups.

## When not to use
Use a set if you only need unique values. Use a list if position matters.

## Common mistake
Indexing a missing key raises `KeyError`. Use `.get(key, default)` when absence is an expected case.

## Tip
Iterate with `.items()` when you need both keys and values.

## Remember
Dictionaries map keys to values; look up by name, not position.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `dict.get(key, default)` | Gets a value or a fallback. | `user.get("role", "reader")` |
| `dict.keys()` | Gives the dictionary's keys. | `user.keys()` |
| `dict.values()` | Gives the dictionary's values. | `user.values()` |
| `dict.items()` | Gives key-and-value pairs. | `user.items()` |
| `dict.setdefault(key, default)` | Gets a key, adding its default if missing. | `counts.setdefault("tea", 0)` |
| `dict.update(other)` | Adds or replaces entries. | `user.update({"active": True})` |