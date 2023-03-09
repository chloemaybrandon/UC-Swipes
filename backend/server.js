const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Account = require("./models/account");
const Listing = require("./models/listing");

app = express();
app.use(express.json());
app.use(cors());

var port = "8080";
connection =
    "mongodb+srv://admin:yAf0EYMaHl5ZYPRh@cluster0.agavz7f.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strictQuery", false);

mongoose
    .connect(connection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Conected to DB"))
    .catch(console.error);

app.listen(port, () => console.log("Server listening on port " + port));

//App Endpoints

app.get("/accounts", async (req, res) => {
    const accounts = await Account.find();
    res.json(accounts);
});

app.post("/accounts", async (req, res) => {
    const account = new Account({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        image: {},
        // rating: null,
        joindate: Date.now(),
    });

    account.save();
    res.json(account);
});

app.get("/listings", async (req, res) => {
    const listings = await Listing.find();
    res.json(listings);
});

app.post("/listings", async (req, res) => {
    const listing = new Listing({
        poster_name: req.body.poster_name,
        price: req.body.price,
        location: req.body.location,
        date: Date.now(),
    });

    listing.save();
    res.json(listing);
});

app.get("/random", (request, response) => {
    // generate random number from 1-100
    const rand = Math.floor(Math.random() * 100) + 1;
    app.listen(3000, () => {
        console.log("Server has started!");
    });
});

// const newAccount = new Account({
//     username: "Chloe",
//     password: "333",
//     name: "TESTCHLOE",
//     email: "CHLOE@gmail.com",
//     phonenum: 333333,
//     rating: 5,
//     joindate: Date(Date.now())
// });
// newAccount.save();

Account.find({}).then((Account) => console.log(Account));
