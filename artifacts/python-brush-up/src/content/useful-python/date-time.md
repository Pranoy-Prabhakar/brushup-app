## What is it?
The standard-library `datetime` module represents calendar dates, clock times, and spans of time. It helps avoid treating dates as plain text during calculations.

## Syntax
```python
from datetime import date, datetime, timedelta
today = date.today()
tomorrow = today + timedelta(days=1)
```

## Example
```python
from datetime import datetime

meeting = datetime.fromisoformat("2025-06-18T14:30:00")
label = meeting.strftime("%b %d at %H:%M")
```

## When to use
Use date and time objects to compare moments, add durations, or format dates for display.

## Common mistake
A date string is not a date object. Also, real-world time zones and daylight saving rules need deliberate handling.

## Tip
Use ISO-formatted text for simple, clear date exchange when possible.

## Remember
Parse text into a date/time value before doing date calculations.

## Useful built-ins and methods
| API or method | what it does | short example |
| --- | --- | --- |
| `date.today()` | Standard-library call returns today's date. | `date.today()` |
| `datetime.now()` | Standard-library call returns local current date and time. | `datetime.now()` |
| `datetime.strptime(text, format)` | Parses text with a chosen format. | `datetime.strptime("18/06/25", "%d/%m/%y")` |
| `datetime.strftime(format)` | Formats a date/time as text. | `meeting.strftime("%Y-%m-%d")` |
| `timedelta(days=...)` | Standard-library duration for date arithmetic. | `today + timedelta(days=1)` |
| `datetime.fromisoformat(text)` | Parses a supported ISO date/time string. | `datetime.fromisoformat("2025-06-18")` |