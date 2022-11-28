const ProductRepository = require("../repositories/ProductRepository");

class ProductController {
  async index(request, response) {
    //Listar todos os Produtos
    const { orderBy } = request.query;
    const products = await ProductRepository.findAll(orderBy);

    response.json(products);
  }

  async show(request, response) {
    //Obter um produto
    const { id } = request.params;
    const product = await ProductRepository.findById(id);

    if (!product) {
      //404 Not Found
      return response.status(404).json({ error: "Product not found" });
    }

    response.json(product);
  }

  async store(request, response) {
    //Cadastrar produto
    const { name, price, description, category } = request.body;

    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }

    const product = await ProductRepository.create({
      name,
      price,
      description,
      category,
    });
    response.status(201).json(product);
  }

  async update(request, response) {
    //Editar um Produto
    const { id } = request.params;
    const { name, price, description, category } = request.body;

    const productExists = await ProductRepository.findById(id);
    if (!productExists) {
      return response.status(404).json({ error: "Product not found" });
    }

    if (!name) {
      return response.status(400).json({ error: "Name is Required" });
    }

    const product = await ProductRepository.update(id, {
      name,
      price,
      description,
      category,
    });

    response.json(product);
  }

  async delete(request, response) {
    //Deletar um Produto
    const { id } = request.params;

    await ProductRepository.delete(id);
    //204: No Content
    response.sendStatus(204);
  }
}

module.exports = new ProductController();
