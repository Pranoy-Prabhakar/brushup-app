## What is it?
JSON is a text format for exchanging common data structures. Python's `json` module converts between JSON text and Python values.

## Syntax
```python
import json
text = json.dumps({"active": True})
data = json.loads(text)
```

## Example
```python
import json

record = {"name": "Mina", "scores": [8, 10]}
encoded = json.dumps(record, indent=2)
decoded = json.loads(encoded)
```

## When to use
Use JSON for interoperable, human-readable data exchange and configuration.

## When not to use
JSON has no native representation for arbitrary Python objects, tuples, or sets without a conversion scheme.

## Common mistake
`loads()` parses a string; `load()` reads from a file object. `dumps()` returns text; `dump()` writes to a file.

## Tip
Use `ensure_ascii=False` when readable non-ASCII characters are desired in the output.

## Remember
The “s” versions work with strings; the others work with file objects.