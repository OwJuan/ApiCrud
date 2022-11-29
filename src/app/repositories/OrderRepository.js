const db = require("../database");

class OrderRepository {
  async findAll(orderBy = "ASC") {
    const direction = orderBy.toUpperCase() === "DESC" ? "DESC" : "ASC";
    const rows = await db.query(`
            SELECT orders.*
            FROM orders
            LEFT JOIN
            ORDER BY orders.userId ${direction}`);
    return rows;
  }

  async create({ userId, total }) {
    const [row] = await db.query(
      `
                INSERT INTO products(userId, total)
                VALUES($1, $2)
                RETURNING *
            `,
      [userId, total]
    );
    return row;
  }

  async getProductPrice({ productId }) {
    const [price] = await db.query(
      `         
                SELECT products.*
                FROM products
                WHERE products.price = $1
                RETURNING *
            `,
      [productId]
    );
    return price;
  }

  async order({ orderId, products, price, quantity }) {
    const [row] = await db.query(
      `
        INSERT INTO order_products(orderId, products, price, quantity,)
        VALUES($1, $2, $3, $4)
        RETURNING *
    `,
      [orderId, products, price, quantity]
    );
    return row;
  }
}
module.exports = new OrderRepository();
