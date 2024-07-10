#!/bin/sh

sed -i.bak 's/\";$/"/g' dist/main.js
sed -i.bak 's/"EMPTY LINE"//g' dist/main.js
# the option "-i.bak" is a workaround because sed "-i" option has different behaviors on GNU and BSD
rm dist/main.js.bak
