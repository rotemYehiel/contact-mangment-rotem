const config = require('../../dbconfig');
const sql = require('mssql');
// const tableName = 'Users';
const tableName = '[dtisji7uyxch3r3].[dbo].[Users]'

const login = async (credentials) => {
    try {
        console.log("credentials:", credentials)
        var pool = await sql.connect(config);
        // let user = await pool.request().query(`select * from ${tableName} where UserName='tomas' AND [Password]='tomas12345'`)
        let user = await pool.request().query(`select * from ${tableName} where UserName='${credentials.name}' AND [Password]='${credentials.password}'`)
        console.log("user:", user)
        return user.recordset[0];
    } catch (error) {
        console.log(error)
    }
}

const signUp = async (credentials) => {
    try {
        var pool = await sql.connect(config);
        let insertUser = await pool.request()
            .query(`insert into ${tableName} (UserName, [Password]) values ('${credentials.name}','${credentials.password}')`);
        return {
            rowsAffected: insertUser.rowsAffected[0],
            id: insertUser.recordset[0].id
        };
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    login,
    signUp
}