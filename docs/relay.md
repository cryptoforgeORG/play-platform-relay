# relay
ec2-52-33-139-242.us-west-2.compute.amazonaws.com

### Bash
```
ssh -i ~/.ssh/playent.pem ubuntu@relay-1.playentertainment.online
sudo -s
docker exec -it $(docker ps --latest --quiet) bash
```

## Scripts
```
 chmod u+x ./scripts/docker.sh
./scripts/docker.sh
```

## Reset 
```
supervisorctl stop relay
cd /relay && rm -rf sphinx.db && touch sphinx.db 
supervisorctl start relay
```

## Logs
```
tail -f /var/log/supervisor/relay.log
tail -f /var/log/supervisor/lnd.log
```

## Code
```
cat /relay/connection_string.txt 
```

## Lightning

```
lncli --lnddir=/relay/.lnd/ --macaroonpath=/relay/.lnd/data/chain/bitcoin/testnet/admin.macaroon getinfo
```