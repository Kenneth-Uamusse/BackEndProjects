const { v4: uuidv4 } = require("uuid");
const HttpError = require("../errors/HttpError");
const productsModel = require("../models/productsModel");

let orders = [
  {
    id: uuidv4(),
    clientId: uuidv4(),
    items: [
      {
        productId: uuidv4(),
        productName: "Iphone 12",
        quantity: 2,
        price: 559.3,
      },
    ],
    totalPrice: 1118.3,
    status: "processing",
    createdAt: new Date(),
  },
];

module.exports = {
  getAllOrders: () => orders,

  getOrderById: (id) => orders.find((order) => order.id === id),

  makeOrder: (client, items = []) => {
    const newOrder = {
      id: uuidv4(),
      clientId: client.id,
      items: items.map((item) => {
        const product = productsModel.getProductById(item.productId);
        return {
          productId: item.productId,
          productName: product.name,
          quantity: item.quantity,
          price: product.price,
        };
      }),

      totalPrice: items.reduce((total, item) => {
        const product = productsModel.getProductById(item.productId);
        return total + item.quantity * product.price;
      }, 0),

      status: "processing",
      createdAt: new Date(),
    };

    // Update product stock
    items.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        productsModel.takeProduct(item.productId);
      }
    });

    orders.push(newOrder);
    return newOrder;
  },

  showAllProducts: () => productsModel.getAllProducts(),

  specificProduct: (id) => productsModel.getProductById(id),
};
