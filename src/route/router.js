const express = require('express');
const route = express.Router();
const ctrl = require('./main.ctr');


/*
페이징 전 리스트
route.get("/list:page",ctrl.view.list);
route.get("/list",(req,res) => {
    res.redirect("/list/1");
});
*/

route.get("/page/:page",ctrl.view.page);

route.get("/",(req,res) =>{
    res.redirect("/page/1");
});

route.get("/read/:idx",ctrl.view.read);

route.get("/write",ctrl.view.write);
route.post("/write",ctrl.process.realwrite);
route.post("/update",ctrl.process.update);
route.post("/delete",ctrl.process.delete);





module.exports = route;

