const mysql_odbc = require('../db/db_conn')();
const conn = mysql_odbc.init();

const view = {

    list : (req,res) => {
        let page = req.params.page;
        let sql = "select *from board";
        conn.query(sql,(err,rows) => {
            if(err) console.error(err);
            res.render("list",{title : '리스트',rows : rows});
        })
    },

    write : (req,res) => {
        res.render("write",{title : '글쓰기'});
    },

    read : (req,res) => {
        let idx = req.params.idx;
        let sql = "select idx,name,title,content,date_format(DATE,'%Y-%m-%d %H:%i:%s') DATE from board where idx = ?";
        conn.query(sql,[idx],(err,row) => {
            if(err) console.error(err);
            res.render("read",{title: '글상세', row : row[0]});
        })
    },
    
    page : (req,res) =>{
        let page = req.params.page;
        let sql = "select idx,name,title,content,date_format(DATE,'%Y-%m-%d %H:%i:%s') DATE from board";

        conn.query(sql,(err,rows) =>{
            if(err) console.error(err);
            res.render("page",
            {
                title : '리스트',
                rows : rows,
                page : page,
                length : rows.length-1, //db는 1부터 , for문은 0부터 시작
                page_num : 10,
                pass : true
        });
        })
    }
};

const process = {

    realwrite : (req,res) => {
        let name = req.body.name;
        let title = req.body.title;
        let content = req.body.content;
        let datas = [name,title,content];
        let sql = "insert into board(name,title,content) values(?,?,?)";
        conn.query(sql,datas,function(err,rows) {
            if(err) console.error(err);
            res.redirect("/");
        });
    },
    update : (req,res) =>{
        let idx = req.body.idx;
        let name = req.body.name;
        let title = req.body.title;
        let content = req.body.content;
        let datas = [name,title,content,idx];
        let sql = "update board set name=?,title=?,content=? where idx=?";
        conn.query(sql,datas,(err,success) =>{
            if(err) console.error(err);
            if(success){
            res.redirect('/read/'+idx);
            }
        });
    },
    delete : (req,res) =>{
        let idx = req.body.idx;
        let datas = [idx];
        let sql = "delete from board where idx = ?";
        conn.query(sql,datas,(err)=>{
            if(err) console.error(err);
            res.redirect("/");
        });
    }
};

module.exports = {
    view,
    process
};