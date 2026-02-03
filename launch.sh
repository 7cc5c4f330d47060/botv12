#!/bin/sh
set -e

while :; do
    node dist/index.js $@
    sleep 5
done