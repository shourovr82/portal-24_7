#!/bin/bash

# export $(grep -v '^#' .env | xargs)
SOURCE=portal_247db-2023-12-05-1701804210772.dump
TARGET=/

DB_CONTAINER_NAME=postgres
DB_NAME=portal_247db
DB_USERNAME=postgres
DUMPED_DB=portal_247db-2023-12-05-1701804210772.dump
BACKUP_DIRECTORY=/home/mashod/Projects/CodeQuivers/portal-247/backend/data/backup/


CURRENT_DATE=$(date "+%Y%m%d")
TIMESTAMP=$(date "+%s")

BACKUP_DB_NAME=$BACKUP_DIRECTORY$DB_NAME-$CURRENT_DATE-$TIMESTAMP.dump

# Database named (command line argument) use pg_dump for targed backup
docker exec $DB_CONTAINER_NAME pg_dump -U $DB_USERNAME -Fc $DB_NAME > $BACKUP_DB_NAME

# Cleanup old backups

# find $BACKUP_DIRECTORY/* -mtime +7 -exec rm {} \;
