#!/bin/bash

export $(grep -v '^#' .env | xargs)

docker cp $SOURCE $DB_CONTAINER_NAME:$TARGET

isPresent=$(docker exec "$DB_CONTAINER_NAME" psql -U "$DB_USERNAME" -l | grep "$DB_NAME" | wc -l)

if [ $isPresent -eq 1 ]
then
    echo $DB_NAME ' database is deleting'
    docker exec $DB_CONTAINER_NAME dropdb -U $DB_USERNAME $DB_NAME
else
	echo $DB_NAME ' Not present.'
fi


docker exec $DB_CONTAINER_NAME createdb -U $DB_USERNAME $DB_NAME
docker exec $DB_CONTAINER_NAME pg_restore -U $DB_USERNAME -d $DB_NAME $DUMPED_DB
