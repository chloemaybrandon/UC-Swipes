const mongoose = require('mongoose');
connection = "mongodb+srv://admin:yAf0EYMaHl5ZYPRh@cluster0.agavz7f.mongodb.net/?retryWrites=true&w=majority";

mongoose.set('strictQuery', false);

mongoose
    .connect(connection,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }    
    )
    .then(() => console.log("Connected to DB"))
    .catch(console.error);


// const Account = require("./models/account");
//
// const newAccount = new Account({
//     username: "test1",
//     password: "12345678",
//     name: "TEST1",
//     email: "TEST1@gmail.com",
//     phonenum: 1234567891,
//     // image: {},
//     joindate: Date(Date.now())
// });
// newAccount.save();

// Account.find({})
//     .then(Account => console.log(Account));