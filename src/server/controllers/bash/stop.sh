#!/bin/bash

echo "stop script started"

PID="$(ps -A | grep masters-of | awk '{print $1}')" && echo "${PID}"
# ps -p $PID -o %cpu,%mem,cmd

echo "stop old instance"
kill -9 $(pidof masters-of-conquest-headless)
kill -9 $PID
