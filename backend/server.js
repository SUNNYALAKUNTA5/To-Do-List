const express = require('express')
const app = express();
const cors = require('cors');
app.use(cors());
const mysql = require('mysql2');
app.use(express.json());

app.listen(3000,() => {
    console.log("server running on port 3000...");
})

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'mrsunny7989604718',
    database : 'todo'
});

db.connect((err) => {
    if(err){
        console.log("database connection error..",err);
    }
    else{
        console.log("DataBase connected succcessfully.");
    }
});


//retreiving from database
app.get('/',(req, res) => {
    db.query(`select ID as id, itemdata, completed  from todoitems`, (err,results) => {
         if(err) {
            console.log("error occured..!",err);
            return
        }
        console.log("Data:",results);
        res.send(results);
    });
});


// adding to database
app.post('/add-item',(req,res) => {
    db.query(`insert into todoitems(itemdata) values('${req.body.text}')`, (err,results) => {
        if(err) {
            console.log("error occured..!",err);
            return
        }
        console.log("added to db successfully.",req.body);
        res.send(results);
    });
       
});



//updating the database
app.put('/update-item',(req,res) => {
    db.query(`update todoitems set itemdata = '${req.body.itemdata}' where ID = ${req.body.id}`, (err,results) => {
        if(err) {
            console.log("error occured..!",err);
            return
        }
        console.log(req.body)
        console.log("updated to db successfully.");
        res.send("Update success",results); 
    });
      
});

//deleting from database
app.delete('/delete-item',(req,res) => {
    db.query(`delete from todoitems where ID = ${req.body.id}` , (err,results) => {
        if(err) {
            console.log("error occured..!",err);
            return
        }
        console.log("deleted from db successfully.",);
    });
    console.log(req.body)
    res.send("Delete success");   
});
