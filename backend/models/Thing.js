const db = require('../config/db');

class Thing {
  constructor( title, description, imageUrl, price, userId) {
   
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
    this.userId = userId;
  }
    save() {
      
      let sql = `
        INSERT INTO thing(
          title,
          description,
          imageUrl,
          price,
          userId
        )
        VALUES(
            '${this.title}',
            '${this.description}',
            '${this.imageUrl}',
            '${this.price}',
            '${this.userId}'
        )
        `;
        return db.execute(sql);
    }

    static find() {
      let sql= `
      SELECT thing.id, thing.created_at, thing.title,thing.description, thing.imageUrl, thing.price, thing.userId, user.email from thing INNER JOIN user ON thing.userId = user.ID;
      `;

      return db.execute(sql)
    }

    static findOne(id) {
      let sql = `
      SELECT thing.id, thing.created_at, thing.title, thing.description, thing.imageUrl, thing.price, thing.userId, user.email 
      FROM thing 
      INNER JOIN user ON thing.userId = user.ID 
      WHERE thing.id = '${id}'
    `;
      return db.execute(sql);
  }

    static deleteOne(id) {
      let sql = `DELETE FROM thing WHERE id = ${id}`;
      return db.execute(sql);
    }

    static updateOne(id, newTitle, newDescription, newImageUrl, newPrice) {
      let sql = `
        UPDATE thing
        SET thing.title = '${newTitle}',
            thing.description = '${newDescription}',
            thing.imageUrl = '${newImageUrl}',
            thing.price = '${newPrice}'
        WHERE thing.id = '${id}';
      `;
      return db.execute(sql);
  }
}

module.exports = Thing;