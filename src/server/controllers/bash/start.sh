#!/bin/bash

echo "start script started"

rm -rf log.txt

touch log.txt

cd masters-of-conquest-headless

echo "start master-client-headless instance"

cmd="./masters-of-conquest-headless.x86_64 -quit -batchmode -nographics -logfile"

# nohup $cmd > moc.out 2>&1
nohup $cmd > moc.log 2>&1 </dev/null &
# ln -s moc.log ../public/logs/moc.log
echo "done"
