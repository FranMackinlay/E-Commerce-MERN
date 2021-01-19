import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../schemas/orderModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.get('/', isAuth, expressAsyncHandler(async (req, res) => {
  const orderItems = req?.body?.orderItems;

  if (!orderItems) return res.send(400).send({ message: 'Cart is empty' });

  const order = new Order({
    orderItems,
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    itemsPrice: req.body.itemsPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
    user: req.user._id,
  });

  const createdOrder = await order.save();

  res.status(201).send({ message: 'New order created', order: createdOrder })
}));

export default orderRouter;
