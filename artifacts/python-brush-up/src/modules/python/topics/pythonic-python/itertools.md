---
title: "itertools"
slug: "itertools"
category: "Pythonic Python"
summary: "Combine and group items without writing extra loops."
keywords: "itertools chain count cycle repeat combinations permutations product groupby standard library"
order: 37
related: ["iterators", "generators", "enumerate"]
---

## What is it?
The standard-library `itertools` module offers tools for combining, repeating, and grouping iterable values. Many return iterators, so values arrive only as you ask for them.

## Syntax
```python
import itertools
```

## Example
```python
pairs = list(itertools.combinations(["tea", "cake", "fruit"], 2))
```

## When to use
Use an itertools helper when it expresses a pattern more clearly than a hand-written loop.

## Common mistake
Some tools can produce endless sequences. Put a limit on them before collecting results into a list.

## Tip
Import the specific helper you need, or use `itertools.name` after importing the module.

## Remember
Many itertools tools are lazy; ask for values only as needed.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `itertools.chain(a, b)` | Standard-library helper walks through inputs one after another. | `list(itertools.chain([1], [2, 3]))` |
| `itertools.count(start)` | Makes an endless stream of increasing numbers. | `next(itertools.count(1))  # 1` |
| `itertools.cycle(items)` | Repeats items endlessly in a cycle. | `next(itertools.cycle(["A", "B"]))  # "A"` |
| `itertools.repeat(value, n)` | Repeats a value a chosen number of times. | `list(itertools.repeat("x", 3))` |
| `itertools.combinations(items, r)` | Makes groups of r distinct positions, without order. | `list(itertools.combinations("abc", 2))` |
| `itertools.product(a, b)` | Makes every pair across input groups. | `list(itertools.product([1, 2], ["a"]))` |
| `itertools.groupby(items, key=...)` | Groups neighboring equal keys in sorted or grouped input. | `[(key, list(group)) for key, group in itertools.groupby(sorted(["ant", "bee", "cat"]), key=len)]` |