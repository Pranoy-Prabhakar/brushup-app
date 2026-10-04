## What is it?
The standard-library `functools` module contains helpers for working with functions. It can preserve a wrapped function's details, pre-fill an argument, or remember results.

## Syntax
```python
import functools

@functools.cache
def square(number):
    return number * number
```

## Example
```python
square(8)  # calculated and remembered
square(8)  # reused from the cache
```

## When to use
Use a helper when it makes repeated function work easier to express or avoids safe, repeated calculations.

## Common mistake
Cached arguments must be hashable, and a cache can keep results in memory. Do not cache changing or side-effecting work without a clear reason.

## Tip
Use `functools.wraps` when writing your own decorator wrapper.

## Remember
Import these helpers from the standard-library `functools` module.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `functools.wraps(function)` | Preserves wrapped function details in a decorator. | `@functools.wraps(function)` |
| `functools.partial(function, ...)` | Makes a new function with some inputs filled in. | `square = functools.partial(pow, exp=2)` |
| `functools.reduce(function, items)` | Applies a two-input function across the items to make one result. | `functools.reduce(max, [1, 3, 2])  # 3` |
| `functools.cache` | Remembers results for each set of arguments. | `@functools.cache` |
| `functools.lru_cache(maxsize=...)` | Remembers recent results up to a limit. | `@functools.lru_cache(maxsize=128)` |