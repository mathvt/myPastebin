const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

start()


async function start(){
    await createTable().catch(err => console.log(err))
    setInterval(() => {
        controlExpiration()
    }, 3600*1000);
}


async function listPaste(){
    let db = await openDb()
    let row = await db.all('SELECT hash, name, syntax, time, timeOfExpiration FROM pasteTable')
    return row
}



async function searchPaste(hash){
    let db = await openDb()
    let sql = 'SELECT * FROM pasteTable WHERE hash = ?'
    const row = await db.get(sql, [hash])
    return row
}


async function insertPaste(data){
    let db = await openDb()
        await db.run('INSERT INTO pasteTable (hash, name, content, syntax, time , expiration, timeOfExpiration) VALUES (:hash, :name, :content, :syntax, :time , :expiration, :timeOfExpiration)'
        ,{
            ':hash': data.hash,
            ':name': data.name,
            ':content': data.main,
            ':syntax': data.syntax,
            ':time': data.time ,
            ':expiration': data.expiration,
            ':timeOfExpiration': data.timeOfExpiration
        }
    )
    console.log(data)
}

module.exports = {searchPaste, insertPaste, listPaste}




async function createTable(){
    let db = await openDb()
    await db.exec('CREATE TABLE IF NOT EXISTS pasteTable (hash text, name varchar(100), content varchar(10000), syntax text, time text, expiration int, timeOfExpiration int, UNIQUE(hash))')
    // pasteTable (hash, name, content, syntax, time , expiration, timeOfExpiration)
    await controlExpiration()
}



async function openDb(){
    const db = await open({
        filename: './sql/db.db',
        driver: sqlite3.Database
    })
    return db
}


async function controlExpiration(){
    let db = await openDb()
    let time = Date.now()
    await db.all('DELETE FROM pasteTable WHERE timeOfExpiration <= ?', [time])
}