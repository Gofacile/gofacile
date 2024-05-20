const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

let userWallet = {
    balance: 1000 // Set initial balance to 1000 Rs
};

app.use(bodyParser.json());

// Endpoint to check balance
app.get('/check-balance', (req, res) => {
    res.json({ balance: userWallet.balance });
});

// Endpoint to pay for the ticket and deduct fare from the balance
app.post('/pay-fare', (req, res) => {
    const { fare } = req.body;
    if (userWallet.balance >= fare) {
        userWallet.balance -= fare; // Deduct fare from the balance
        res.json({ message: "Payment successful", balance: userWallet.balance });
    } else {
        res.status(400).json({ error: "Insufficient balance" });
    }
});

// Route to handle recharge requests
app.post('/recharge-wallet', (req, res) => {
    const rechargeAmount = req.body.amount; // Assuming amount is sent in the request body

    // Check if rechargeAmount is a valid number
    if (isNaN(rechargeAmount) || rechargeAmount <= 0) {
        return res.status(400).json({ error: 'Invalid recharge amount' });
    }

    // Update the user's wallet balance
    userWallet.balance += rechargeAmount;

    // Send response with updated balance
    res.json({ message: 'Wallet recharged successfully', balance: userWallet.balance });
});

// Route to check wallet balance
app.get('/check-balance', (req, res) => {
    res.json({ balance: userWallet.balance });
});

app.listen(port, () => {
    console.log('Server is running on http://localhost:3000');
});
