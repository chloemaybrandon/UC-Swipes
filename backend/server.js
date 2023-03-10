const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Account = require("./models/account");
const Listing = require("./models/listing");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "randomNumbersAndLetters123456789";

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
    .then(() => console.log("Connected to DB"))
    .catch(console.error);

app.listen(port, () => console.log("Server listening on port " + port));

//App Endpoints

// get all accounts
app.get("/accounts", async (req, res) => {
    const accounts = await Account.find();
    res.json(accounts);
});

// get a specific account
app.get("/accounts/:id", async (req, res) => {
    try {
        const account = await Account.findOne({ _id: req.params.id });
        res.send(account);
    } catch {
        res.status(404);
        res.send({ error: "Account doesn't exist!" });
    }
});

// update an account
app.patch("/accounts/:id", async (req, res) => {
    try {
        const account = await Account.findOne({ _id: req.params.id });

        if (req.body.username != account.username) {
            account.username = req.body.username;
        }

        if (
            req.body.password != account.password &&
            !req.body.password.includes("*")
        ) {
            account.password = req.body.password;
        }

        if (req.body.name != account.name) {
            account.name = req.body.name;
        }

        if (req.body.email != account.email) {
            account.email = req.body.email;
        }

        if (req.body.phoneNumber != account.phoneNumber) {
            account.phoneNumber = req.body.phoneNumber;
        }

        if (req.body.image) {
            account.image = req.body.image;
        }

        if (req.body.rating) {
            account.rating = req.body.rating;
        }

        // joindate should not be modified

        await account.save();
        res.send(account);
    } catch {
        res.status(404);
        res.send({ error: "Account doesn't exist!" });
    }
});

// create a new account
app.post("/register", async (req, res) => {
    const { username, password, name, email, phoneNumber } = req.body;
    try {
        // throw an error if there already exists an account with the username provided
        const existingAccount = await Account.findOne({ username });
        if (existingAccount) {
            return res
                .status(400)
                .send({ error: "Username is already in use" });
        }

        await Account.create({
            username,
            password,
            name,
            email,
            phoneNumber,
            image: {},
            joindate: Date.now(),
        });
        res.status(200);
        res.send({ status: "ok" });
    } catch (error) {
        res.status(404);
        res.send({ status: "error" });
    }
});

// log into an existing account
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await Account.findOne({ username });

    // if there is no account with the provided username, throw an error
    if (!user) {
        return res.status(400).json({ error: "User not found" });
    }

    // if the password is correct
    if (password == user.password) {
        const token = jwt.sign({ username: user.username }, JWT_SECRET, {
            expiresIn: 86400, // token expires after 24 hours
        });

        if (res.status(201)) {
            return res.json({ status: "OK", data: token });
        } else {
            return res.json({ error: "error" });
        }
    }

    return res
        .status(400)
        .json({ status: "error", error: "Password incorrect" });
});

// get the account information
app.post("/accountData", async (req, res) => {
    const { token } = req.body;

    try {
        const user = jwt.verify(token, JWT_SECRET, (err, res) => {
            if (err) {
                return "token expired";
            }
            return res;
        });

        if (user === "token expired") {
            return res.send({ status: "error", data: "token expired" });
        }

        const username = user.username;
        Account.findOne({ username: username })
            .then((data) => {
                res.json({ status: "OK", data: data });
            })
            .catch((error) => {
                res.send({ status: "error", data: error });
            });
    } catch (error) {
        console.log(error);
    }
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
