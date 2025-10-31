// controllers/paymentController.js
import { processPayment, verifyPayment } from "../utils/paymentGatewayMock.js";

export const makePayment = (req, res) => {
  const { amount, method, user } = req.body;
  if (!amount || !method)
    return res.status(400).json({ message: "Invalid payment details" });

  const result = processPayment(amount, method, user);
  res.json(result);
};

export const verifyTransaction = (req, res) => {
  const { transactionId } = req.params;
  const result = verifyPayment(transactionId);
  res.json(result);
};
