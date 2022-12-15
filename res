# Bold, underline and negative formats
Get-Bold bold
Get-Underline underline
Get-Negative negative

# Strike through (available in PowerShell v7.2.0-preview.3 +)
# See https://github.com/PowerShell/PowerShell/pull/14461
Get-StrikeThrough strikethrough

# They can be combined too (e.g. using pipes)
'hello there' | Get-Bold | Get-Underline
