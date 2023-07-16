#!/bin/bash

docker-compose up -d

docker exec mongo1 /scripts/mongo-rs-init.sh