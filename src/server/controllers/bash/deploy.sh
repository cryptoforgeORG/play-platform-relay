#!/bin/bash

echo "deploy script started"

PID="$(ps -A | grep masters-of | awk '{print $1}')" && echo "${PID}"
# ps -p $PID -o %cpu,%mem,cmd

echo "stop old instance"
kill $(pidof masters-of-conquest-headless)
kill $PID

mv masters-of-conquest-headless/moc.log "moc_$(date +"%Y%m%d_%H%M").log"

# killall screen
# pkill screen
# screen -wipe

echo "download new build"
URL=$1

echo $URL
rm -rf masters-of-conquest-*

wget -O masters-of-conquest-headless.zip $URL

echo "unzip"
unzip masters-of-conquest-headless.zip -d masters-of-conquest-headless

# echo "set up logging"
# touch log.txt

cd masters-of-conquest-headless

# version 2
echo "start master-client-headless instance"
# screen -dmS MOC ./masters-of-conquest -quit -batchmode -nographics -logfile log.txt
# screen -dmS MOC ./masters-of-conquest-headless.x86_64 -quit -batchmode -nographics -logfile log.txt

cmd="./masters-of-conquest-headless.x86_64 -quit -batchmode -nographics -logfile"
# nohup $cmd > moc.out 2>&1
nohup $cmd > moc.log 2>&1 </dev/null &
# ln -s moc.log ../public/logs/moc.log
echo "done"

# echo "start master-client instance"
# screen -dmS MOC-LOG tail -f log.txt
# echo "done"

# version 1
# echo "start master-client-headless instance"
# # screen -dmS MOC ./masters-of-conquest -quit -batchmode -nographics -logfile log.txt
# screen -dmS MOC ./masters-of-conquest-headless.x86_64 -quit -batchmode -nographics -logfile log.txt
# echo "done"
#
# echo "start master-client instance"
# screen -dmS MOC-LOG tail -f log.txt
# echo "done"

# wget -O masters-of-conquest-headless.zip "https://unitycloud-build-user-svc-live-build.s3.amazonaws.com/2485260/93996fe3-b080-483d-995e-722c9984012e/masters-of-conquest-headless-15/masters-of-conquest-headless.zip?AWSAccessKeyId=AKIAI6ZGSQWNDMF7X33A&Expires=1530669280&Signature=vXFGbcHenLNrGfuxvcBpmC3PZCs%3D&response-content-disposition=attachment%3B%20filename%3Dplay-entertainment-llc-masters-of-conquest-masters-of-conquest-headless-15.zip&response-content-type=application%2Foctet-stream"
# wget -O masters-of-conquest-headless.zip "https://unitycloud-build-user-svc-live-build.s3.amazonaws.com/2485260/93996fe3-b080-483d-995e-722c9984012e/masters-of-conquest-headless-15/masters-of-conquest-headless.zip?AWSAccessKeyId=AKIAI6ZGSQWNDMF7X33A&Expires=1530669280&Signature=vXFGbcHenLNrGfuxvcBpmC3PZCs%3D&response-content-disposition=attachment%3B%20filename%3Dplay-entertainment-llc-masters-of-conquest-masters-of-conquest-headless-15.zip&response-content-type=application%2Foctet-stream"
