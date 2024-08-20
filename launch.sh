#!/bin/bash
while [ true ];
do node index.mjs;
if [ $? -eq 1 ]; then exit; fi
sleep 6;
done