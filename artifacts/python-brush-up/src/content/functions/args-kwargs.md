## What is it?
`*args` gathers extra values given by position into a tuple. `**kwargs` gathers extra named values into a dictionary.

## Syntax
```python
def inspect(first, *args, **kwargs):
    ...
```

## Example
```python
def announce(message, *channels, **options):
    print(message, channels, options)

announce("Deploy", "email", "chat", urgent=True)
```

## When to use
Use them when a function should accept any number of values, such as a wrapper around another function.

## When not to use
If you already know the inputs, name them in the function instead.

## Common mistake
`args` and `kwargs` are common names; `*` and `**` do the collecting.

## Tip
Use descriptive names when the gathered values have a domain-specific role.

## Remember
One star gathers extra positional values; two gather named values.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `*items` | Unpacks items as positional arguments. | `print(*["a", "b"])` |
| `**mapping` | Unpacks keys as named arguments. | `greet(**{"name": "Ari"})` |
| `tuple(args)` | Stores collected positional values as a tuple. | `args = tuple(args)` |
| `dict(kwargs)` | Stores named options as a dictionary. | `options = dict(kwargs)` |
| `len(args)` | Counts collected positional values. | `len(args)` |