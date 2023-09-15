
class AuthCredentialsValidator {
    static isRegisterValid(username, password, passwordConfirmation) {
        const notNull = username !== null && password != null && passwordConfirmation != null;
        const passwordEquals = password == passwordConfirmation;
        const usernameLimits = username.length > 2 && username.length < 30;
        const passwordLimits = password.length > 8 && password.length < 200;
        return notNull && passwordEquals && usernameLimits && passwordLimits;
    }
}

module.exports = AuthCredentialsValidator;