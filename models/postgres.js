const {Pool}  = require('pg')
const { DB_URL } = require('../config')

const pool = new Pool({
    connectionString:DB_URL
})

async function query(query, arg){
    try {
        const result = await pool.query(query, arg)
        return result.rows
    } catch (error) {
        console.log(error)
    }
}

module.exports = query