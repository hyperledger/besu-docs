# See https://github.com/markdownlint/markdownlint/blob/master/docs/creating_styles.md for doc
# on creating and modifying this style file
# rules are named by their aliases here for clarity, not their code.
# But for instance, line-length = MD013

rule 'line-length', :line_length=>100, :code_blocks=>false, :tables=> false

# excluded rule for error as kramdown has a bug.
# see https://github.com/markdownlint/markdownlint/issues/294#issuecomment-600600407
# these are now in this info style.
# to be put back in error style once bug fixed.
rule 'single-h1'
rule 'no-space-in-code'
rule "no-duplicate-header", :allow_different_nesting => true
rule 'first-line-h1'
