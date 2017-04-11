var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
//pagina inicial
app.get("/", function(req, res){
    res.render("index");
});

//lista os itens
app.get("/items", function(req, res){
    var url = "http://localhost:50513/api/product";
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body)
            res.render("items", {data: data});
        }
    });
})

//mostra item procurado
app.get("/procura", function(req, res){
    var valor = req.query.busca;
    var url = "http://localhost:50513/api/product/" + valor;
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body)
            res.render("procura", {data: data});
        }
    });
});

//adiciona um novo item
app.post("/items", function(req, res){
    //pega a data e coloca numa array de items
    var id = req.body.id;
    var name = req.body.name;
    var category = req.body.category;
    var price = req.body.price;
    var newItem = {id: id, name: name, category: category, price: price}
    var url = "http://localhost:50513/api/product/";
    request.post(url, {form: newItem}, function(error, response, body){
        if(!error && response.statusCode == 200){
            //redireciona para a pagina de lista de items
            res.redirect("/items");
        }
    });
    
});

//form pra criar um novo item
app.get("/items/new", function(req, res){
    res.render("new");
});

//editar
app.get("/procura/:id/editar", function(req, res){
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body)
            res.render("/editar", {data: data});
        }
    }); 
});

//update item
app.put("/procura/:id", function(req, res){

});


//deletar
app.delete("/procura/:id", function(req, res){
    //detroi item
    var id = req.body.id;
    var url = "http://localhost:50513/api/product/" + id;
    request.delete(url)
    //redireciona para a pagina de lista de items
    res.redirect("/items");
});

app.listen(3000, function(){
    console.log("server on");
});