const { Client } = require('pg')

const con = new Client({

    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "jobin",
    database: "jobin-db"

    

})
con.connect().then(() => console.log("Data Base connected"))

module.exports=con 