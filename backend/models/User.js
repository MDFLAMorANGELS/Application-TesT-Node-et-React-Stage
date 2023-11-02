const db = require('../config/db');

class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    async save() {
        const sql = `
            INSERT INTO user (email, password)
            VALUES (?, ?)
        `;

        const values = [this.email, this.password];

        try {
            const [result] = await db.execute(sql, values);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async findByEmail(email) {
        const sql = `
            SELECT * FROM user WHERE email = ?
        `;
    
        try {
            const result = await db.execute(sql, [email]);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = User;
