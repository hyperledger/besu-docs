#!/usr/bin/env bash

echo -e "\r================================="
echo -e "\rRunning all tests jobs, please wait."
echo -e "\r================================="

CI/scripts/run_job.sh build & buildPID=$!
CI/scripts/run_job.sh vale & guidelinesPID=$!
CI/scripts/run_job.sh linkchecker & linksPID=$!
CI/scripts/run_job.sh markdownlint & syntaxPID=$!

wait $buildPID $linksPID $syntaxPID $guidelinesPID

echo -e "\r================================="
echo -e "\rAll tests jobs completed."
echo -e "\r================================="
