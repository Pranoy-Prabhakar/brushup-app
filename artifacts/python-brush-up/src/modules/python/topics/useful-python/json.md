---
title: "JSON"
slug: "json"
category: "Useful Python"
summary: "Exchange data with JSON text."
keywords: "serialize parse loads dumps"
order: 21
related: ["dictionary", "file-handling", "type-conversion"]
---

## What is it?
JSON is a text format for sharing data. Python's `json` module turns JSON text into Python values and back.

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
Use JSON to share data between programs or save simple settings in a readable format.

## When not to use
JSON cannot directly store every Python object, tuple, or set. Convert them to supported values first.

## Common mistake
`loads()` parses a string; `load()` reads from a file object. `dumps()` returns text; `dump()` writes to a file.

## Tip
Use `ensure_ascii=False` when readable non-ASCII characters are desired in the output.

## Remember
The names ending in `s` use strings; the others use files.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `json.loads(text)` | Parses JSON text into Python values. | `json.loads('{"ok": true}')` |
| `json.dumps(value)` | Turns Python values into JSON text. | `json.dumps({"ok": True})` |
| `json.load(file)` | Reads JSON from a file. | `json.load(file)` |
| `json.dump(value, file)` | Writes JSON to a file. | `json.dump(data, file)` |
| `json.dumps(..., indent=2)` | Adds line breaks and spaces for readability. | `json.dumps(data, indent=2)` |
| `json.dumps(..., ensure_ascii=False)` | Keeps readable non-ASCII text. | `json.dumps(data, ensure_ascii=False)` |