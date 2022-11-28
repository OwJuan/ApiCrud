const OrderRepository = require("../repositories/OrderRepository");

class OrderController {
  //AQUI VAI A CRIAÇÃO E CONTROLE DE PEDIDOS

  async store(request, response) {
    const { userId, orderList = [id, product, price, quantity] } = request.body;

    // let listProduct;
    // let listquantity;
    // let listprice;
    // let listId;

    let orderProduct;

    for (let index = 0; index < orderList; index++) {
      const value = await OrderRepository.getProductPrice(
        orderList[index][0],
        orderList[index][1],
        orderList[index][2],
        orderList[index][3]
      );

      orderProduct = value;
    }

    if (!userId) {
      //404 Not Found
      return response.status(404).json({ error: "user not found" });
    }

    // const orderProduct = await OrderRepository.order({
    //   listId,
    //   listProduct,
    //   listprice,
    //   listquantity,
    // });

    let total = 0;

    // for (let index = 0; index < total; index++) {
    //   const value = await OrderRepository.getProductPrice(orderList[index][1]);

    //   total = value * orderList[index][2];
    // }

    const order = await OrderRepository.create({
      userId,
      total,
    });
    response.status(201).json(order);
  }
}

module.exports = new OrderController();
