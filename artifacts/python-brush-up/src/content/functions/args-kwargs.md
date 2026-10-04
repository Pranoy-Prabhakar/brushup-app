## What is it?
`*args` gathers extra positional arguments into a tuple; `**kwargs` gathers extra keyword arguments into a dictionary.

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
Use them for flexible wrappers, decorators, or APIs that intentionally accept a variable number of arguments.

## When not to use
Do not use them to avoid designing a clear function signature when the accepted inputs are already known.

## Common mistake
The names `args` and `kwargs` are conventions; the `*` and `**` markers do the collecting.

## Tip
Use descriptive names when the gathered values have a domain-specific role.

## Remember
One star collects positional values; two stars collect named values.