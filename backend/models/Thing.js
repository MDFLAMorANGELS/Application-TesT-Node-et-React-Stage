const db = require('../config/db');

class Thing {
  constructor( title, description, imageUrl, price) {
   
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
  }
    save() {
      
      let sql = `
        INSERT INTO thing(
          title,
          description,
          imageUrl,
          price
        )
        VALUES(
            '${this.title}',
            '${this.description}',
            '${this.imageUrl}',
            '${this.price}'
        )
        `;
        return db.execute(sql);
    }

    static find() {
      let sql= `
          SELECT * FROM thing;
      `;

      return db.execute(sql)
    }

    static findOne(id) {
      let sql = `SELECT * FROM thing WHERE ID = '${id}';
      `;
      return db.execute(sql);
  }
}

module.exports = Thing;