#!/bin/bash -eu

SCRIPT_DIR=$(cd $(dirname $0); pwd)
BACKEND_ROOT_DIR=$SCRIPT_DIR/../

cd $BACKEND_ROOT_DIR
rm -rf node_modules

npm install
npx prisma generate
npx tsc
