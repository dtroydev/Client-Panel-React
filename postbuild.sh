#!/bin/bash

main=$(find build/static/js -name main*)
echo Obfuscating: $main
echo Before Obfuscation:
ls -l $main
npx javascript-obfuscator $main --output $main --config 'obfuscatorconfig.js'
echo After Obfuscation:
ls -l $main
