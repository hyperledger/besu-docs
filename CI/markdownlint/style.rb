# See https://github.com/markdownlint/markdownlint/blob/master/docs/creating_styles.md for doc
# on creating and modifying this style file
# rules are named by their aliases here for clarity, not their code.
# But for instance, ul-indent = MD007
all

rule "no-duplicate-header", :allow_different_nesting => true
rule 'no-trailing-punctuation', :punctuation=>'.,;:!'
rule 'ul-indent', :indent=> 4

exclude_rule 'no-bare-urls'
exclude_rule 'code-block-style'
exclude_rule 'line-length'
