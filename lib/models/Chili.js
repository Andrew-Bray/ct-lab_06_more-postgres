const pool = require('../utils/pool.js');

module.exports = class Chili {
    id;
    brand;
    description;
    image_url;

    constructor(row) {
      this.id = row.id;
      this.brand = row.brand;
      this.description = row.description;
      this.image_url = row.image_url;

    }

    // time for some quality CRUD
    static async insert({ brand, description, image_url }) {
      const { rows } = await pool.query(
        `INSERT INTO chilis (brand, description, image_url)
        VALUES ($1, $2, $3) RETURNING *`,
        [brand, description, image_url]
      );

      return new Chili(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        `SELECT * FROM chilis
          WHERE id=$1`,
        [id]
      );

      if(!rows[0]) throw new Error(`No chili with id ${id}`);
      return new Chili(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        `SELECT * 
        FROM Chilis`
      );
        
      if(!rows[0]) throw new Error('No Chili');
      return rows.map(row => new Chili(row)
      );
    }

    static async update(id, { brand, description, image_url }) {
      const { rows } = await pool.query(
        `UPDATE chilis
                SET breed=$1,
                    description=$2,
                    image_url=$3
                WHERE id=$4
                RETURNING *
            `,
        [brand, description, image_url, id]
      );

      return new Chili(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        `DELETE FROM chilis 
          WHERE id=$1 
          RETURNING *`,
        [id]
      );
  
      return new Chili(rows[0]);
    }
};
