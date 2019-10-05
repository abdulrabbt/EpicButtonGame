var express = require("express");
var app = express();
var server = app.listen(1337);
var io = require("socket.io")(server);
var counter = 0;

app.use(express.static(__dirname +"/static"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

io.on("connection", function(socket){
 
    console.log("Connected and count initialized!");
    socket.emit("new_count", {
        newCount : `This button has been pushed ${counter} times`
    });
    socket.broadcast.emit("new_count", {
        newCount : `This button has been pushed ${counter} times`
    });
    socket.on("epic_push", function(){
        counter += 1;
        socket.emit("new_count", {
            newCount : `This button has been pushed ${counter} times`
        });
        socket.broadcast.emit("new_count", {
            newCount : `This button has been pushed ${counter} times`
        });
    })
    socket.on("reset_push", function(){
        counter = 0;
        socket.emit("reset_count", {
            newCount : `This button has been pushed ${counter} times`
        });
        socket.broadcast.emit("reset_count", {
            newCount : `This button has been pushed ${counter} times`
        });
    })
})

app.get("/", function(req, res){
    res.render("index");
})