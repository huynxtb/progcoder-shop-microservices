const ShopServerConfig = (server) => {
  server.get("/products", (schema) => {
    return schema.products.all();
  });
  server.get("/products/:id", (schema, request) => {
    let id = request.params.id;

    return schema.products.find(id);
  });
};

export default ShopServerConfig;
