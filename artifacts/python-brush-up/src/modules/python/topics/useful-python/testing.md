---
title: "Testing"
slug: "testing"
category: "Useful Python"
summary: "Check that code gives the result you expect."
keywords: "assert pytest raises fixture parametrize monkeypatch tests"
order: 40
related: ["functions", "try-except", "type-hints"]
---

## What is it?
Testing checks that code behaves as expected. A small test can catch a mistake before it reaches someone using the program.

## Syntax
```python
assert double(3) == 6
```

## Example
```python
def double(number):
    return number * 2

assert double(3) == 6
```

## When to use
Use quick assertions for simple checks. For a project with many checks, a test framework such as the third-party `pytest` package can organize and run them.

## Common mistake
Python can skip `assert` statements when run with optimization. Use a test runner for checks that must always run in production.

## Tip
Test both a normal case and important edge cases, such as empty input or invalid values.

## Remember
A test states what should happen and checks the actual result.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `assert condition` | Built-in statement fails if a check is false. | `assert total == 5` |
| `pytest.raises(Error)` | Third-party pytest checks that code raises an error. | `with pytest.raises(ValueError): ...` |
| `@pytest.fixture` | Third-party pytest prepares reusable test data. | `@pytest.fixture` |
| `@pytest.mark.parametrize` | Third-party pytest runs one test with several inputs. | `@pytest.mark.parametrize("n", [1, 2])` |
| `monkeypatch` | Third-party pytest fixture replaces behavior during a test. | `monkeypatch.setattr(module, "send", fake)` |