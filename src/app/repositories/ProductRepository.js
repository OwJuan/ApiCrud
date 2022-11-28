const db = require("../database");

class ProductRepository {
  async findAll(orderBy = "ASC") {
    const direction = orderBy.toUpperCase() === "DESC" ? "DESC" : "ASC";
    const rows = await db.query(`
              SELECT products.*
              FROM products
              `);
    //   LEFT JOIN products ON products.id = products
    //   ORDER BY products.name ${direction}
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(
      `
            SELECT products.*
            FROM products
            WHERE products.id = $1`,
      [id]
    );
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query(
      `
            DELETE FROM products WHERE id = $1
        `,
      [id]
    );
    return deleteOp;
  }

  async create({ name, price, description, category }) {
    const [row] = await db.query(
      `
            INSERT INTO products(name, price, description, category)
            VALUES($1, $2, $3, $4)
            RETURNING *
        `,
      [name, price, description, category]
    );

    return row;
  }

  async update(id, { name, price, description, category }) {
    const [row] = await db.query(
      `
        UPDATE products
        SET name = $1, price = $2, description = $3, category = $4
        WHERE id = $5
        RETURNING *
        `,
      [name, price, description, category, id]
    );
    return row;
  }
}

module.exports = new ProductRepository();
