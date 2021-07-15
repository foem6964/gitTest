const express = require('express');
const app = express();
const home = require('./src/route/router');

app.listen(3001,()=>{
    console.log("start-server");
});

//setting
app.set("views","./src/views");
app.set("view engine","ejs");

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use("/",home);

