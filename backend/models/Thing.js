const db = require('../config/db');

class Thing {
  constructor(title, description, imageUrl, price, userId) {

    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
    this.userId = userId;
  }
  async save() {

    let sql = `
        INSERT INTO thing(
          title,
          description,
          imageUrl,
          price,
          userId
        )
        VALUES(?, ?, ?, ?, ?)
        `;

    const values = [
      this.title,
      this.description,
      this.imageUrl,
      this.price,
      this.userId
    ];

    try {
      const result = await db.execute(sql, values)
      return result
    } catch (error) {
      throw error
    }
  }

  static async find() {
    let sql = `
      SELECT thing.id, thing.created_at, thing.title,thing.description, thing.imageUrl, thing.price, thing.userId, user.email from thing INNER JOIN user ON thing.userId = user.ID;
      `;

    try {
      const [result] = await db.execute(sql);
      return result;
    } catch (error) {
      throw error
    }
  }

  static async findOne(id) {
    let sql = `
      SELECT thing.id, thing.created_at, thing.title, thing.description, thing.imageUrl, thing.price, thing.userId, user.email 
      FROM thing 
      INNER JOIN user ON thing.userId = user.ID 
      WHERE thing.id = ? ;
    `;

    try {
      const result = await db.execute(sql, [id])
      return result
    } catch (error) {
      throw error
    }
  }

  static async deleteOne(id) {
    let sql = `DELETE FROM thing WHERE id = ? ;`;

    try {
      const result = await db.execute(sql, [id])
      return result
    } catch (error) {
      throw error
    }
  }

  static async updateOne(id, newTitle, newDescription, newImageUrl, newPrice) {
    let sql = `
        UPDATE thing
        SET title = ?,
            description = ?,
            imageUrl = ?,
            price = ?
        WHERE id = ?;
      `;

    const values = [newTitle, newDescription, newImageUrl, newPrice, id];

    try {
      const result = await db.execute(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Thing;