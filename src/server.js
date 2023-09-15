const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');

const UserCrudService = require("./service/userCrudService");
const User = require("./entity/user");
const TokenService = require("./service/tokenService");
const AuthCredentialsValidator = require("./service/validation/authCredentialsValidation");

app.use(bodyParser.json())

const viewsDirectory = path.join(__dirname, '../view');

app.get("/", (req, res) => {
    res.sendFile(path.join(viewsDirectory, 'index.html'));
});

app.get("/login-page", (req, res) => {
    res.sendFile(path.join(viewsDirectory, 'loginPage.html'));
});

app.get("/register-page", (req, res) => {
    res.sendFile(path.join(viewsDirectory, 'registerPage.html'));
});

app.post("/login", (req, res) => {
    const { login, password } = req.body;
});

app.post("/register", async (req, res) => {
    try {
        const { username, password, passwordConfirmation, email } = req.body;
        if (!AuthCredentialsValidator.isRegisterValid(username, password, passwordConfirmation, email)) {
            console.log("Invalid credentials error");
            throw new Error("Invalid credentials.");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User(username, email, hashedPassword);
        UserCrudService.create(user);
        const token = TokenService.generateToken(user.id, user.username, user.email);
        console.log(`Token sends to: hostname(${req.hostname}) ip(${req.ip})`);
        res.header("Authorization", `Bearer ${token}`);
        res.sendStatus(200);
    }
    catch (error) {
        res.sendStatus(400);
        console.log("Error to recive register data: " + error);
    }
});

app.listen(port, () => {
    console.log(`Running (http://localhost:${port}/)`);
});