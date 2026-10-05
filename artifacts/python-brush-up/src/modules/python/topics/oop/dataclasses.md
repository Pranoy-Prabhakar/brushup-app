---
title: "Dataclasses"
slug: "dataclasses"
category: "OOP"
summary: "Make simple data-holding classes with less setup."
keywords: "dataclass field asdict astuple replace records"
order: 33
related: ["classes", "type-hints", "json"]
---

## What is it?
A dataclass is a class for storing related values. The standard-library `dataclasses` module can create common setup methods, such as an initializer, from the fields you declare.

## Syntax
```python
from dataclasses import asdict, astuple, dataclass, field, replace

@dataclass
class Book:
    title: str
    pages: int
```

## Example
```python
book = Book("Small Hours", 184)
print(book.title)
```

## When to use
Use a dataclass for a simple record whose fields describe the data it holds.

## Common mistake
A dataclass does not make its fields read-only. Use `frozen=True` if instances should not be changed after creation.

## Tip
Use `field(default_factory=list)` for a fresh list per instance rather than a shared mutable default.

## Remember
Dataclasses save repetitive setup; they do not replace every class.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `@dataclass` | Standard-library decorator creates common class methods. | `@dataclass` |
| `field()` | Standard-library helper configures a field. | `tags: list = field(default_factory=list)` |
| `asdict(instance)` | Standard-library helper makes a dictionary of fields. | `asdict(book)` |
| `astuple(instance)` | Standard-library helper makes a tuple of fields. | `astuple(book)` |
| `replace(instance, ...)` | Standard-library helper copies with selected changes. | `replace(book, pages=190)` |