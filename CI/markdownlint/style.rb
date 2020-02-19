all

rule "no-duplicate-header", :allow_different_nesting => true
rule 'line-length', :line_length=>100, :code_blocks=>false, :tables=> false
rule 'no-trailing-punctuation', :punctuation=>'.,;:!'

exclude_rule 'no-bare-urls'
exclude_rule 'code-block-style'
