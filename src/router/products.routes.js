import { Router } from "express";
import { ProductManager } from "../managers/productManager.js";
import { checkProductId } from "../middlewares/checkProductId.middleware.js";
import { checkProductCode } from "../middlewares/checkProductCode.middleware.js";
import { checkProductUndefined } from "../middlewares/checkProductUndefined.middleware.js";
import { checkUpdateProductCode } from "../middlewares/checkUpdateProductCode.middleware.js"

const productManager = new ProductManager();
const router = Router();

router.get("/", async (req, res) => {

  const { limit } = req.query;
  try {
    const products = await productManager.getProducts(limit);
    res.send(products);
  } catch (error) {
    console.log(error);
    res.send(error.message);}

});

router.get("/:pid",checkProductId, async (req, res) => {
  
  const { pid } = req.params;
  const product = await productManager.getProductById(pid);
  console.log(product)
  res.send(product);
  
  });

router.post("/", checkProductCode, checkProductUndefined, async (req, res) => {

  const body = req.body;
  const product = await productManager.addProduct(body);
  console.log(product)
  res.send(product);
  
});

router.put("/:pid", checkProductId, checkProductUndefined, checkUpdateProductCode, async (req, res) => {

  const { pid } = req.params;
  const body = req.body;
  const product = await productManager.updateProduct(pid, body);
  res.send(product);

});

router.delete("/:pid", checkProductId, async (req, res) => {

  const { pid } = req.params;
  const product = await productManager.deleteProduct(pid);
  console.log(product);
  res.send(product);

});

export default router;
