mongosh -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD --eval "
db = db.getSiblingDB('$DB_NAME');
db.createUser({
  user: '$DB_USER',
  pwd: '$DB_PASS',
  roles: [{ role: 'readWrite', db: '$DB_NAME' }],
});
"
