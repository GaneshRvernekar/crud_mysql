const con=require('./connection');

 
// con.connect(function(err){
//     if(err){
//         throw err
//     }
//     else{
//         var sql = 'CREATE TABLE employees(name varchar(255) NOT NULL,ssn varchar(255),dob varchar(255),doj varchar(255),department varchar(255),salary varchar(255),experience varchar(255))'
//         con.query(sql,function(err,result){
//             if(err){
//                 console.log(err);
//             }
//             else{
//                 console.log("created table successfully")
//             }
//         });
//     }
// });


const express=require('express');
const app=express();
const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs')



app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/register.html")
})

app.post('/',(req,res)=>{
    const {name,ssn,dob,doj,department,salary,experience}=req.body;
    console.log(name,ssn,dob,doj,department)

    var sql="INSERT INTO employees (name,ssn,dob,doj,department,salary,experience) VALUES(?,?,?,?,?,?,?)";
    con.query(sql,[name,ssn,dob,doj,department,salary,experience],(err,result)=>{
        if(err) console.log(err);
        res.redirect('/details');
     })
})

app.get('/delete-detail',(req,res)=>{
    console.log(req.query)
    const {id}=req.query;
    console.log(id);
          
        var sql="delete from employees where id=?";
        con.query(sql,[id],(err,result)=>{
            if(err)console.log(err);
            res.redirect('/details')
        })
    })


app.get('/details',(req,res)=>{
    var sql="select * from employees";
    con.query(sql,(err,result)=>{
        if(err) console.log(err);
        res.render(__dirname+"/details.ejs",{data:result})

    })
})


app.get('/update-details',(req,res)=>{
    const id=req.query.id;
    var sql="select * from employees where id=?"
    con.query(sql,[id],(err,result)=>{
        if(err) console.log(err)
        console.log(result)
        res.render(__dirname+"/update.ejs",{data:result})
    })

})

app.post('/update-details',(req,res)=>{
    const id=req.body.id;
    console.log(req.body)
    const {name,ssn,department,salary,experience,dob,doj}=req.body
    var sql="UPDATE employees set ssn=?,name=?,department=?,salary=?,dob=?,doj=?,experience=? where id=?"
    con.query(sql,[ssn,name,department,salary,dob,doj,experience,id],(err,result)=>{
        if(err) console.log(err)
        console.log(result)
       res.redirect('/details')
    })

})



app.listen(8000,(err)=>{
    if(err) console.log(err);
    console.log("Server listening on port 8000")
})