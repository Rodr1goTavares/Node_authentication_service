let idCount = 0;

class User {
    constructor(username, email, password) {
        this.id = idCount++;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
module.exports = User;