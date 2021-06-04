const express  = require('express');
require("./db/conn");
const User =require("./models/user");
const app            = express();
const port = process.env.PORT||8000;

app.use(express.json());

app.post("/signup",(req,res) => {
    console.log(req.body);
    const user = new User(req.body);
    user.save().then(() =>{
        res.send(user); 
     }).catch((e) =>{
         res.send(e);
     })
    
})



app.get("/search/:Fullname",function(req,res){
var regex= new RegExp(req.params.Fullname,'i');
User.find({Fullname:regex}).then((result)=>{
    res.status(200).json(result)
})
})

async function pagingUsers(){
    const Users = await User.find().
    skip(2).
    select('Fullname').limit(2)
    console.log(Users)
}

pagingUsers();

async function sortUsers(){
    const Sortuser = await User.find()
    .select({name:1})
    .sort("Fullname:1");
    console.log(Sortuser)
}

sortUsers()

app.get("/sort",function(req,res){
    
    User.sort("Fullname : 1").then((result)=>{
        res.status(200).json(result)
    })
    })




app.listen(port, () => { 
    console.log(`We are live on  ${port}`);
   });
