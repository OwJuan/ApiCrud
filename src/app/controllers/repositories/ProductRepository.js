const db = require('../../database');

class ProductRepository {
    async findAll(orderBy = 'ASC') {
        const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
        const rows = await db.query(`
            SELECT products.*, categories.name AS category_name
            FROM products
            LEFT JOIN categoriesProducts ON categoriesProducts.id = products.category_id
            ORDER BY products.name ${direction}`);
        return rows;
    }

    async findById(id) {
        const[row] = await db.query(`
            SELECT products.*, categories.name AS category_name
            FROM products
            LEFT JOIN categoriesProducts ON categoriesProducts.id = products.category_id
            WHERE products.id = $1`, [id]);
        return row;
    }

    async delete(id) {
        const deleteOp = await db.query(`
            DELETE FROM products WHERE id = $1
        `, [id]);
        return deleteOp
    }

    async create({
        name, image, price,
    }){
        const [row] = await db.query(`
            INSERT INTO products(name, image, price)
            VALUES($1, $2, $3, $4)
            RETURNING *
        `, [name, image, price]);
        
        return row;
    }

    async update(id, {
        name, image, price,
      }) {
        const [row] = await db.query(`
        UPDATE products
        SET name = $1, image = $2, price = $3
        WHERE id = $4
        RETURNING *
        `, [name, image, price, id]);
        return row;
      }
}

module.exports = new ProductRepository();
