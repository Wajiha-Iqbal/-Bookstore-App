import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "6606",
    database: "test"
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("hello this is the backend")
})

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
});

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`tittle`, `desc`,`price`,`cover`) VALUES (?)";
    const values = [
        req.body.tittle,
        req.body.desc,
        req.body.price,
        req.body.cover
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has been created succesfully!")
    });
});

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id=?"

    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has been deleted succesfully!")
    });

})

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `tittle`= ?, `desc`= ?, `price` = ?, `cover` =? WHERE id=?";
    const values = [
        req.body.tittle,
        req.body.desc,
        req.body.price,
        req.body.cover
    ];

    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has been updated succesfully!")
    });

})

app.listen(8800, () => {
    console.log("Connected to backend!")
})