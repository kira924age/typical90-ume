#!/bin/bash -eu

SCRIPT_DIR=$(cd $(dirname $0); pwd)
BACKEND_ROOT_DIR=$SCRIPT_DIR/../

pm2 start $BACKEND_ROOT_DIR/dist/index.js --name typical90-backend
