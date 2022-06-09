const { Client } = require('pg');

const client = new Client({
    host: 'pfc-umc.database.windows.net',
    port: 1433,
    user: 'pfc-umc',
    password: '#Ju32244000',
    database: 'chefeeletronico'
});

client.connect();

exports.query = async (query, values) => {
    const { rows } = await client.query(query, values);
    return rows;
};
