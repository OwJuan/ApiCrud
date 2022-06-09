const sql = require('mssql');

const sqlConfig = {
    user: 'pfc-umc',
    password: '#Ju32244000',
    database: 'chefeeletronico',
    server: 'pfc-umc.database.windows.net',
    pool: {
        max: 10,
        min: 0,
    },
    options: {
        encrypt: true,
        trustServerCertificate: false
    }
}

sql.connect(sqlConfig);

exports.query = async (query, values) => {
    const { rows } = await sql.query(query, values);
    return rows;
};
