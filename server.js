const cors = require('cors');
const express = require('express');
const app = express();
const actions = require('./src/getData.js')
const bodyParser = require('body-parser');
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
const { Client } = require('pg');
const { response } = require('express');
const client = new Client(
  {
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "",
    port: 5432,
  });

client.connect((err) =>{
    if (err) {
        console.error(err);
        return;
    }
    console.log('Database Connected');
});

// app.get("/", actions.getData());
// app.post("/", actions.addData());
// app.delete("/", actions.deleteData());
// app.put("/", actions.updateDate());


app.get('/',(req, res) => {
    const query = 'select * from workout'
    client.query(query , (err, results) => {
        if (err) {
            console.error(err);
            return;
        }
        res.send(results.rows);
    });
});

app.post('/', function(req, res) {
    const query = `INSERT INTO workout (id, hari, olahraga1, olahraga2, olahraga3, olahraga4) VALUES ('${req.body.id}', '${req.body.hari}', '${req.body.olahraga1}',  '${req.body.olahraga2}',  '${req.body.olahraga3}',  '${req.body.olahraga4}')`
    client.query(query, (err, results) => {
        if (err) {
            console.error('gabisa dong');
            res.send("tolong masukin lagi");
            return;
        }
        console.log("data kamu berhasil tersimpan, selamat olahraga");
    });
});

app.put('/', function(req, res) {
    const query = `Update workout set olahraga1='${req.body.olahraga1}', olahraga2='${req.body.olahraga2}', olahraga3='${req.body.olahraga3}', olahraga4 ='${req.body.olahraga4}' where id='${req.body.id}'`
    client.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("ye");
    });
});

app.delete('/:id', function(req, res) {
    const query = `delete from workout where id = ${req.params.id}`
    client.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("ue");
    });
  });

//server listening
app.listen(8080, () => {
    console.log(`running at port 8080`);
});