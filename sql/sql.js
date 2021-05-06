const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

createTable().catch(err => console.log(err));


async function listPast(){
    let db = await openDb()
    return await db.all('SELECT hash, name, syntax, time FROM pasteTable')
}



async function searchPaste(hash){
    let db = await openDb()
    let sql = 'SELECT * FROM pasteTable WHERE hash = ?'
    const row = await db.get(sql, [hash])
    return row
}


async function insertPaste(data){
    let db = await openDb()
        await db.run('INSERT INTO pasteTable (hash, name, content, syntax, time , expiration) VALUES (:hash, :name, :content, :syntax, :time , :expiration)'
        ,{
            ':hash': data.hash,
            ':name': data.name,
            ':content': data.main,
            ':syntax': data.syntax,
            ':time': data.time ,
            ':expiration': data.expiration
        }
    )
    console.log(data)
}

module.exports = {searchPaste, insertPaste, listPast}


// Create table
async function createTable(){
    let db = await openDb()
    await db.exec('CREATE TABLE IF NOT EXISTS pasteTable (hash text, name varchar(100), content varchar(10000), syntax text, time text, expiration int, UNIQUE(hash))')
    // pasteTable (hash, name, content, syntax, time , expiration)
}

async function openDb(){
    const db = await open({
        filename: './sql/db.db',
        driver: sqlite3.Database
    })
    return db
}




