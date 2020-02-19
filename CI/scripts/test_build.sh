#!/usr/bin/env bash
circleci config process .circleci/config.yml > .circleci/process.yml && circleci local execute -c .circleci/process.yml --job build
