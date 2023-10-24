const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql2")

const app = express()

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

app.use(express.static("public"))

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

// rotas

app.post("/register/save", (req, res) => {
    const {title, pageqty} = req.body

    const query = `
    INSERT INTO books (title, pageqty)
    VALUES ('${title}', '${pageqty}')
    `

    conn.query(query, (error) => {
        if (error){
            console.log(error)
            return
        }

        res.redirect("/")
    })
})

app.get("/register", (req, res) => {
    res.render("register")
})

app.get("/", (req, res) => {
    res.render("home")
})

//conexão com mysql

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodemysql",
    port: 3306
})

conn.connect((error) => {
    if (error){
        console.log(error)
        return
    }

    console.log("Conectado ao MySQL")

    app.listen(3000, () => {
        console.log("Servidor rodando da porta 3000.")
    })
})