#!/bin/bash

docker-compose up -d
sleep 5
docker exec mongo1 /scripts/mongo-rs-init.sh
docker exec api sh -c '/cooking-together/run-migrations.sh'