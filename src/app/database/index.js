const { Client } = require('pg');

const client = new Client({
    host: 'pfc-tcc-chefeeletronico.postgres.database.azure.com',
    port: 5432,
    user: 'pfc',
    password: '#Ju32244000',
    database: 'postgres'
});

client.connect();

exports.query = async (query, values) => {
    const { rows } = await client.query(query, values);
    return rows;
};
