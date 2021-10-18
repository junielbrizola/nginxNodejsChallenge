const express = require('express')
const cors = require('cors')
const { connection, migrate } = require('./database')
const axios = require('axios')
const server = express()
server.use(cors())
migrate()
server.use(async (req, res, next) => {
    try {
        req.db = await connection()
        next()
    } catch (e) {
        res.send(500, 'failed connection mysql')
    }
})
server.get('/', async (req, res) => {
    const { db } = req
    const { data } = await axios.get('https://gerador-nomes.herokuapp.com/nomes/1')
    await db.execute(`INSERT INTO people ( Name ) VALUES ( '${data[0]}' );`)
    const [rows, _] = await db.execute('SELECT * FROM people;')
    let content = '<h1>Full Cycle Rocks!</h1>'
    rows.forEach(row => {
        content = content.concat(`<p> ${row.Name} <p/>`)
    }); 
    res.send(content)
})
server.listen(8001)