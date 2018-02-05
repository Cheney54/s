var express = require("express");
var app = express();
var fs = require("fs");
app.set("views", "./views");
app.set("view engine", "ejs");
app.use("/public", express.static("public"));
app.get("/", function (req, res) {
    fs.readFile("./data.json", function (err, data) {
        res.setHeader("content-type", "text/html;charset=utf-8");
        res.render("index.ejs", {result: JSON.parse(data)})
    })

});
app.get("/add", function (req, res) {
    res.render("add.ejs");
});
var objArr = [];
// app.get("/addcon", function (req, res) {
//     res.render("addcon.ejs")
//     var username = req.query.username;
//     var sex = req.query.sex;
//     var age = req.query.age;
//     var obj = {username: username, sex: sex, age: age};
//     objArr.push(obj);
//     fs.writeFile("data.json", JSON.stringify(objArr));
//     res.redirect("/");
// })


//添加数据
app.get("/addCon", function (req, res) {
    res.render("addcon.ejs");
    var username = req.query.username;
    var sex = req.query.sex;
    var age = req.query.age;
    var obj = {username: username, sex: sex, age: age};
    objArr.push(obj);
    fs.writeFile("data.json", JSON.stringify(objArr));
    res.redirect("/");
});


//删除
app.get("/del", function (req, res) {
    var id = req.query.id;
    objArr = objArr.filter(function (value, index) {
        if (id != index) {
            return value
        }
    });
    fs.writeFile("data.json", JSON.stringify(objArr));
    res.redirect("/");
});


//响应编辑的页面
app.get("/jia", function (req, res) {
    var id = req.query.id;
    res.render("jia.ejs", {result: objArr[id], id:id})

});

//修改内容
app.get("/qwe", function (req, res) {
    var id = req.query.id;
    var name = req.query.username;
    var sex = req.query.sex;
    var age = req.query.age;
    objArr.filter(function (value, index) {
        if (index == id) {
            value.name = name;
            value.sex = sex;
            value.age = age;
        }
        return value
    });
    fs.writeFile("data.json", JSON.stringify(objArr));
    res.render("addcon.ejs");
});
var server = app.listen(6565, function () {
    var host = server.address().address;
    var port = server.address().port;
});