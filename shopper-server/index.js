

var mongoClient = require("mongodb").MongoClient;
var express = require("express");
var cors = require("cors");

var app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

var connectionString = "mongodb://127.0.0.1:27017";

app.get("/get-admin", (req, res)=>{

    mongoClient.connect(connectionString).then(connectionObject=>{
        var database = connectionObject.db("shopperdb");
        database.collection("tbladmin").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });

});


app.get("/get-products", (req, res)=>{

    mongoClient.connect(connectionString).then(connectionObject=>{
        var database = connectionObject.db("shopperdb");
        database.collection("tblproducts").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });

});


app.get("/get-categories", (req, res)=>{

    mongoClient.connect(connectionString).then(connectionObject=>{
        var database = connectionObject.db("shopperdb");
        database.collection("tblcategories").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });

});

app.get("/get-customers", (req, res)=>{

    mongoClient.connect(connectionString).then(connectionObject=>{
        var database = connectionObject.db("shopperdb");
        database.collection("tblcustomers").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });

});

app.get("/get-customer/:customerid", (req, res)=>{

    mongoClient.connect(connectionString).then(connectionObject=>{
        var database = connectionObject.db("shopperdb");
        database.collection("tblcustomers").find({CustomerId:req.params.customerid}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });

});

app.get("/get-product/:id", (req, res)=>{

    mongoClient.connect(connectionString).then(connectionObject=>{
        var database = connectionObject.db("shopperdb");
        database.collection("tblproducts").find({Id:parseInt(req.params.id)}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });

});

// app.get("/filter-products/:category", (req, res)=>{

//     mongoClient.connect(connectionString).then(connectionObject=>{
//         var database = connectionObject.db("shopperdb");
//         database.collection("tblproducts").find({Category:req.params.category}).toArray().then(documents=>{
//             res.send(documents);
//             res.end();
//         });
//     });

// });



app.get("/filter-products/:category", (req, res) => {
    mongoClient.connect(connectionString).then(connectionObject => {
        var database = connectionObject.db("shopperdb");

        database.collection("tblproducts").find({
            Category: { $regex: `^${req.params.category}$`, $options: "i" } // Case-insensitive
        }).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
            
});





app.post("/register-customer", (req, res)=>{

    mongoClient.connect(connectionString).then(connectionObject=>{
        var database = connectionObject.db("shopperdb");
        
        var customer = {
            CustomerId: req.body.CustomerId,
            CustomerName: req.body.CustomerName,
            Password: req.body.Password,
            Email: req.body.Email,
            Mobile: req.body.Mobile
        };

        database.collection("tblcustomers").insertOne(customer).then(()=>{
            console.log(`Customer Registered`);
            res.end();
        });

    });

});


app.post("/add-product", (req, res)=>{

    mongoClient.connect(connectionString).then(connectionObject=>{
        var database = connectionObject.db("shopperdb");
        
        var product = {
            Id: parseInt(req.body.Id),
            Title: req.body.Title,
            Image: req.body.Image,
            Price:parseFloat(req.body.Price),
            Description: req.body.Description,
            rating:{
                Rate: parseInt(req.body.Rating.Rate),
                Count: parseInt(req.body.Rating.Count)
            },
            Category: req.body.Category
        };

        database.collection("tblproducts").insertOne(product).then(()=>{
            console.log(`Product Added`);
            res.end();
        });

    });

});


app.delete("/delete-product/:id", (req, res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database = connectionObject.db("shopperdb");

        database.collection("tblproducts").deleteOne({Id:parseInt(req.params.id)})
        .then(()=>{
            console.log("Product Deleted.");
            res.end();
        })

    })
})




app.listen(5070);
console.log(`Server Started at : http://127.0.0.1:5070`);

