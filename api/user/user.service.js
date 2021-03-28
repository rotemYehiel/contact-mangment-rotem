const config = require('../../dbconfig');
const sql = require('mssql');
// const tableName = 'Users';
const tableName = '[dtisji7uyxch3r3].[dbo].[Users]'

const login = async (credentials) => {
    try {
        console.log("credentials:", credentials)
        var pool = await sql.connect(config);
        let user = await pool.request().query(`select * from ${tableName} where UserName='tomas' AND [Password]='tomas12345'`)
        console.log("user:", user)
        return user.recordset[0];
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    login
}