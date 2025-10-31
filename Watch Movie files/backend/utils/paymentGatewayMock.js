// 💳 Mock Payment Gateway Integration

export const processPayment = (amount, method, customer) => {
  console.log(`💳 Processing ${method} payment of ₹${amount} for ${customer}`);
  return {
    status: "success",
    transactionId: "TXN" + Date.now(),
    timestamp: new Date().toISOString(),
  };
};

export const verifyPayment = (transactionId) => {
  console.log(`✅ Verifying payment ID: ${transactionId}`);
  return {
    valid: true,
    transactionId,
    verifiedAt: new Date().toISOString(),
  };
};
