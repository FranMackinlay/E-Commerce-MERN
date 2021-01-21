import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../schemas/orderModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.get('/history', isAuth, expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.send(orders);
}));

orderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
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

orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) return res.send(order);

  return res.status.apply(404).send({ message: 'Order not found' });
}));

orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.flags.isPaid = true;
    order.flags.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address
    };

    const updatedOrder = await order.save();
    res.send({ message: 'Order paid', order: updatedOrder });
  } else {
    res.status(404).send({ message: 'Order not found' });
  }
}));

export default orderRouter;
