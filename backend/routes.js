const express = require("express");
const router = express.Router();
const Account = require("./models/account.js");

// Get all accounts
router.get("/accounts", async (req, res) => {
    const accounts = await Account.find();
    res.send(accounts);
});

// Get individual account
router.get("/accounts/:id", async (req, res) => {
    try {
        const account = await Account.findOne({ _id: req.params.id });
        res.send(account);
    } catch {
        res.status(404);
        res.send({ error: "Account doesn't exist!" });
    }
});

// Create an account
router.post("/accounts", async (req, res) => {
    const post = new Account({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        image: {},
        // rating: null,
        joindate: Date.now(),
    });

    await post.save();
    res.send(post);
});

// Update an account
router.patch("/accounts/:id", async (req, res) => {
    try {
        const account = await Account.findOne({ _id: req.params.id });

        if (req.body.username) {
            account.username = req.body.username;
        }

        if (req.body.password) {
            account.password = req.body.password;
        }

        if (req.body.name) {
            account.name = req.body.name;
        }

        if (req.body.email) {
            account.email = req.body.email;
        }

        if (req.body.phoneNumber) {
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

// Delete an account
router.delete("/accounts/:id", async (req, res) => {
    try {
        await Account.deleteOne({ _id: req.params.id });
        res.status(204).send();
    } catch {
        res.status(404);
        res.send({ error: "Account doesn't exist!" });
    }
});

module.exports = router;
