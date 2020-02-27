all

rule "no-duplicate-header", :allow_different_nesting => true
rule 'no-trailing-punctuation', :punctuation=>'.,;:!'

exclude_rule 'no-bare-urls'
exclude_rule 'code-block-style'
exclude_rule 'line-length'
