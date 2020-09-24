#!/usr/bin/env bash

set -o pipefail

if [ -z "$1" ]
  then
    echo "No job mame supplied. See .circleci/config.yml for job names."
    exit 1
  else
    JOB=$1
fi

exec < /dev/tty

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
LOGFILE=${DIR}/${JOB}.log

echo -e "\rRunning ${JOB} test job, please wait.\r"

circleci config process .circleci/config.yml > .circleci/process.yml && circleci local execute -c .circleci/process.yml --job $JOB > ${LOGFILE} 2>&1

if [ "$?" -eq "0" ]
then
  echo -e "\r✓ ${JOB} test job succeeded\r"
  exit 0
else
  echo -e "\r✖ ${JOB} test job failed. See ${LOGFILE}"
  exit 1
fi
