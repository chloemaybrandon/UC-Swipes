const express = require("express");
const mongoose = require("mongoose");
connection =
    "mongodb+srv://admin:yAf0EYMaHl5ZYPRh@cluster0.agavz7f.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strictQuery", false);

mongoose
.connect(connection,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
.then(() => console.log("Conected to DB"))
.catch(console.error)

const Account = require("./models/account");

app = express();
app.use(express.json());

app.listen(3000, () => console.log("Server listening on port 3000"))


//App Endpoints

app.get('/accounts', async (req, res) => {
    const accounts = await Account.find();

    res.json(accounts);
})

app.get("/random", (request, response) => {
    // generate random number from 1-100
    const rand = Math.floor(Math.random() * 100) + 1;

    // send random number in response
    response.send(`${rand}`);
})

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

Account.find({})
    .then(Account => console.log(Account));
