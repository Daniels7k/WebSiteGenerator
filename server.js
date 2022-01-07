const PORT = 3000;
const express = require ("express");
const path = require("path/posix");
const handlebars = require("express-handlebars")

const app = express ()

// Body Parser
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Template Engine
app.engine("handlebars", handlebars.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public", "index.html"))
})

app.listen(PORT, () => {
    console.log("Server Running on Port:", PORT)
})