#!/bin/bash

PID="$(ps -A | grep masters-of | awk '{print $1}')" && echo "${PID}"
ps -p $PID -o %cpu,%mem,cmd
