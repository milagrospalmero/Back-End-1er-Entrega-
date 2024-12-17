import { Router } from 'express';
import { CartManager } from '../managers/cartManager.js';
import { checkCartId } from '../middlewares/checkCartId.middleware.js';
import { checkCartProductId } from '../middlewares/checkCartProductId.middleware.js';

const cartManager = new CartManager();
const router = Router();

router.get('/', async (req, res) => {
  const { limit } = req.query;
  try {
    const carts = await cartManager.getCarts(limit);
    res.send(carts);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

router.get('/:cid', checkCartId, async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getCartById(cid);
  console.log(cart);
  res.send(cart);
});

router.post('/', async (req, res) => {
  const cart = await cartManager.addCart();
  console.log(cart);
  res.send(cart);
});

router.post('/:cid/product/:pid', checkCartId, checkCartProductId, async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await cartManager.updateCart(cid, pid);
  res.send(cart);
});

router.delete("/:cid", checkCartId, async (req, res) => {

    const { cid } = req.params;
    const cart = await cartManager.deleteCart(cid);
    console.log(cart);
    res.send(cart);
  
  });

export default router;
