db.createUser({
    user: process.env.MONGO_INITDB_ROOT_USERNAME,
    pwd: process.env.MONGO_INITDB_PASSWORD,
    roles: [
        {
            role: 'admin',
            db: process.env.MONGO_INITDB_DATABASE,
        },
    ],
});