const { orderList } = require("./repositories/OrderRepository");
const OrderRepository = require("./repositories/OrderRepository");

class OrderController {
  //AQUI VAI A CRIAÇÃO E CONTROLE DE PEDIDOS

  async store(request, response) {
    const { userId, orderList } = request.body;

    if (!userId) {
      //404 Not Found
      return response.status(404).json({ error: "user not found" });
    }

    // if (!productId) {
    //   //404 Not Found
    //   return response.status(404).json({ error: "Product not found" });
    // }

    console.log("!!!");

    // const orderProduct = await OrderRepository.orderList({
    //   orderList,
    // });

    console.log("!!!2");

    let total = 0;

    for (let index = 0; index < total; index++) {
      const value = await OrderRepository.getProductPrice(orderList[index][0]);

      total = value * orderList[index][1];
    }

    const order = await OrderRepository.create({
      userId,
      total,
    });
    response.status(201).json(order);
  }
}

module.exports = new OrderController();
