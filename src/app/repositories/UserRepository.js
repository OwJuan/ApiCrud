const db = require("../database");

class UserRepository {
  async findAll(orderBy = "ASC") {
    const direction = orderBy.toUpperCase() === "DESC" ? "DESC" : "ASC";
    const rows = await db.query(`
            SELECT users.*, categories.name AS category_name
            FROM users
            LEFT JOIN categories ON categories.id = users.category_id
            ORDER BY users.email ${direction}`);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(
      `
            SELECT users.*, categories.name AS category_name
            FROM users
            LEFT JOIN categories ON categories.id = users.category_id
            WHERE users.id = $1`,
      [id]
    );
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query("SELECT * FROM users WHERE email = $1 ", [
      email,
    ]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query(
      `
            DELETE FROM users WHERE id = $1
        `,
      [id]
    );
    return deleteOp;
  }

  async create({ email, password, category_id }) {
    const [row] = await db.query(
      `
            INSERT INTO users( email, password, category_id)
            VALUES($1, $2, $3)
            RETURNING *
        `,
      [email, password, category_id]
    );

    return row;
  }

  async update(id, { email, password, category_id }) {
    const [row] = await db.query(
      `
        UPDATE users
        SET email = $1, password = $2, category_id = $3
        WHERE id = $4
        RETURNING *
        `,
      [email, password, category_id, id]
    );
    return row;
  }

  async findOne({ email, password }) {
    const row = await db.query(
      `
             SELECT users.* FROM users
             WHERE users.email = $1
                AND users.password = $2
             `,
      [email, password]
    );
    return row[0] ? row : undefined;
  }
}

module.exports = new UserRepository();
