const db = require('../config/db');

class User {
    constructor( email, password) {
        this.email = email;
        this.password = password;
    }

    save() {

        let sql = `
        INSERT INTO user(
           email,
           password
        )
        VALUES(
            '${this.email}',
            '${this.password}'
        )
        `;

        return db.execute(sql);
    }

    static findByEmail(email) {
        let sql= `
            SELECT * FROM user WHERE email = '${email}';
        `;

        return db.execute(sql);
    }
}

module.exports = User;