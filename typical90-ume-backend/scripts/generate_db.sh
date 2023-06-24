#!/bin/bash -eu

SCRIPT_DIR=$(cd $(dirname $0); pwd)
cd $SCRIPT_DIR

wget https://s3-ap-northeast-1.amazonaws.com/kenkoooo/submissions.csv.gz
gzip -d submissions.csv.gz
python3 generate_csv.py
rm submissions.csv

sqlite3 typical90.db < ./create_table.sql
rm typical90_submissions.csv
mv typical90.db ../db/
