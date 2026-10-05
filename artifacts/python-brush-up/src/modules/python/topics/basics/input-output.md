---
title: "Input and Output"
slug: "input-output"
category: "Basics"
summary: "Read a response and show useful information."
keywords: "input print output prompt display"
order: 29
related: ["strings", "type-conversion", "testing"]
---

## What is it?
Input brings information into a program; output shows information to a person or another tool. In a terminal program, `input()` reads a line of text and `print()` displays it.

## Syntax
```python
name = input("Your name? ")
print(f"Hello, {name}")
```

## Example
```python
raw_age = input("Age in years? ")
try:
    age = int(raw_age)
except ValueError:
    print("Please enter a whole number.")
else:
    print(f"Next year: {age + 1}")
```

## When to use
Use these built-ins for simple command-line programs and quick output.

## Common mistake
`input()` always returns a string, even if the person types digits. Convert it before doing arithmetic.

## Tip
Keep prompts specific and output easy to understand.

## Remember
Input reads text; output displays values.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `input(prompt)` | Shows a prompt and reads a line of text. | `city = input("City? ")` |
| `print(value)` | Displays a value followed by a newline. | `print("Ready")` |
| `print(a, b, sep=...)` | Puts chosen text between values. | `print("a", "b", sep=", ")` |
| `print(value, end=...)` | Chooses what to add after output. | `print("Hi", end="!")` |
| `str(value)` | Converts a value to displayable text. | `str(24)  # "24"` |