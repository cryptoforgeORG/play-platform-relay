#!/bin/bash

# turn on bash's job control
set -m

echo "Starting supervisor..."
# Start the primary process and put it in the background
/usr/bin/supervisord &

sleep 5

echo "Starting game..."
supervisorctl start game

# now we bring the primary process back into the foreground
# and leave it there
fg %1
