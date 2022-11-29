const OrderRepository = require("../repositories/OrderRepository");

class OrderController {
  //AQUI VAI A CRIAÇÃO E CONTROLE DE PEDIDOS

  //LISTAGEM DE PEDIDOS
  async index(request, response) {
    //Listar todos os registros
    const { orderBy } = request.query;
    const orders = await OrderRepository.findAll(orderBy);

    response.json(orders);
  }

  //CRIAÇÃO DE PEDIDOS
  async store(request, response) {
    const { userId, orderList = [id, product, price, quantity] } = request.body;

    const status = {
      "Na fila": 1,
      "Sendo Preparado": 2,
      "Pedido Finalizado": 3,
    };

    let orderProduct;

    for (let index = 0; index < orderList; index++) {
      const value = await OrderRepository.getProductPrice(
        orderList[index][0],
        orderList[index][1],
        orderList[index][2],
        orderList[index][3]
      );

      orderProduct = value;

      return orderProduct;
    }

    if (!userId) {
      //404 Not Found
      return response.status(404).json({ error: "user not found" });
    }

    let total = 0;

    for (let index = 0; index < total; index++) {
      const value = await OrderRepository.getProductPrice(orderList[index][1]);

      total = value * orderList[index][2];

      return total;
    }

    const order = await OrderRepository.create({
      userId,
      total,
      status,
    });
    response.status(201).json(order);
  }
}

module.exports = new OrderController();
