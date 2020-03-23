# Doc quality testing scripts

Use the scripts in this directory to run CircleCI jobs on your local machine before pushing your
work to the GitHub repositories.

## Requirements

* Install the [Circle CI local CLI](https://circleci.com/docs/2.0/local-cli/)
* Install [Docker](https://docs.docker.com/install/).

## Running the scripts

Go to the besu-doc project root directory and run one of the following scripts:

* `CI/scripts/test_build.sh` runs the doc build with MkDocs.
* `CI/scripts/test_guidelines.sh` tests the doc with Vale and our custom rules.
* `CI/scripts/test_links.sh` tests the internal and external links in the doc. If a link is
  incorrect or the targeted web page is unavailable (for external sites), the test will fail and
  display the faulty link.
* `CI/scripts/test_lint.sh` tests the Markdown syntax for issues. Sometimes they are not visible
  but making sure the markdown is correct helps to make it readable and bug free.
* `CI/scripts/test_all.sh` runs all the tests in one pass.

## Known issues

You will notice messages like:

```bash
====>> Saving Cache
Error:
Skipping cache - error checking storage: not supported

Step failed
```

This is normal. Circle CI doesn't support some of the features the server version does. Ignore them.
