const db = require("../../database");

class OrderRepository {
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
                WHERE producs.price = $1
                RETURNING *
            `,
      [productId]
    );
    return price;
  }

  async orderList({ orderList }) {
    const [row] = await db.query(
      `
        INSERT INTO order_products(product, quantity, price)
        VALUES(1$, $2, $3)
        RETURNING *
    `[orderList]
    );
    return row;
  }
}
module.exports = new OrderRepository();
