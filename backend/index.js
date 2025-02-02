import express from 'express'
import mysql from 'mysql'

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Silverrayleigh97',
    database: 'test'
})

app.get("/", (req, res) => {
    res.send("Hello this is the backend")
})

app.listen(8800, () => {
    console.log("Connected to backend")
})

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
})

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book created successfully")
    })
})