# See https://github.com/markdownlint/markdownlint/blob/master/docs/creating_styles.md for doc
# on creating and modifying this style file
# rules are named by their aliases here for clarity, not their code.
# But for instance, ul-indent = MD007
all

rule 'no-trailing-punctuation', :punctuation=>'.,;:!'
rule 'ul-indent', :indent=> 4

exclude_rule 'no-bare-urls'
exclude_rule 'code-block-style'
exclude_rule 'line-length'

# excluded rule for as kramdown has a bug.
# see https://github.com/markdownlint/markdownlint/issues/294#issuecomment-600600407
# these are now in info style.
# to be put back in error style once bug fixed.
exclude_rule 'single-h1'
exclude_rule 'no-space-in-code'
exclude_rule 'no-duplicate-header'
exclude_rule 'first-line-h1'
