const { v4: uuidv4 } = require("uuid");
const HttpError = require("../errors/HttpError");

let products = [
  {
    id: uuidv4(),
    name: "Iphone 15",
    description: "Latest Apple smartphone",
    price: 669.5,
    onStock: 20,
    category: "Eletronics",
  },
  {
    id: uuidv4(),
    name: "Dell Vostro 5590",
    description: "Latest Dell PC",
    price: 999.5,
    onStock: 10,
    category: "Eletronics",
  },
];

module.exports = {
  getAllProducts: () =>
    products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category
    })),

  getProductById: (id) => products.find((product) => product.id === id),

  createProduct: (name, description, price, onStock, category) => {
    const newProduct = {
      id: uuidv4(),
      name,
      description,
      price,
      onStock,
      category,
    };

    products.unshift(newProduct);

    return newProduct;
  },

  updateBook: (productId, updatedProduct) => {
    const productIndex = products.findIndex(
      (product) => product.id === productId
    );
    if (productIndex === -1) throw new HttpError(404, "Product not found");

    products[productIndex] = { ...products[productIndex], ...updatedProduct };

    return products[productIndex];
  },

  deleteProduct: (id) => {
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex === -1) throw new HttpError(404, "Product not found!!");

    const deletedProduct = products[productIndex];
    products = products.filter((product) => product.id !== id);

    return deletedProduct;
  },

  takeProduct: (id) => {
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex === -1) throw new HttpError(404, "Product not found!!");

    products[productIndex].onStock -=1
  },
};
