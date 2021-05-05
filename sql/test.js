const sqlite3 = require('sqlite3')



async function searchInDb(hash, fn){
    let db = await openDb('./sql/db.db')
    let sql = 'SELECT * FROM myTable WHERE hash = ?'
    db.get(sql, [hash], async (err, row) => {
        err && console.error(err.message)
        fn(row)
    })
    closeDb(db)
}


function insertPost(data){
    let db = openDb('./sql/db.db')
    let sql = db.prepare('INSERT INTO myTable VALUES ($hash, $name, $content, $syntax, $time , $expiration)')
    sql.run({
        $hash: data.hash,
        $name: data.name,
        $content: data.main,
        $syntax: data.syntax,
        $time: data.time ,
        $expiration: data.expiration
    })
    sql.finalize()
    closeDb(db)
}

module.exports = {searchInDb, insertPost}


// Create table
function createTable(){
    let db = openDb('./sql/db.db')
    db.run('CREATE TABLE IF NOT EXISTS myTable (hash text, name varchar(100), content varchar(10000), syntax text, time text, expiration int)')
    // (hash, name, content, syntax, time , expiration)
    closeDb(db) 
}

function openDb(path){
    let db = new sqlite3.Database(path, 
        (err) => {
            err && console.log(err.message)
            console.log('connected')
    });
    return db
}

function closeDb(db){
    db.close((err) =>{
        err && console.log(err.message)
        return console.log('closed')
    })
}


