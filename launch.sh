#!/bin/sh
set -xe
npx tsc

while :; do
    node dist/index.js
    sleep 5
done