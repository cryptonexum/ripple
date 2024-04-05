const express = require('express');
const path = require('path');
const RippleAPI = require('ripple-lib').RippleAPI;

const app = express();
const port = 3000;

// Connect to Ripple network
const api = new RippleAPI({ server: 'wss://s.altnet.rippletest.net:51233' });
const companyAddress = 'rfLRtMcNQLJvXoEeSNKRtxgVd6QZxmowjK'; // Replace with your company address

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/checkDeposit', async (req, res) => {
    const { amount } = req.body;
    const { address } = req.body;
    try {
        api.connect().then(() => {
            console.log('Connected to Ripple');
          
        api.connection.request({
            command: 'subscribe',
            accounts: [companyAddress]
          }).then(() => {
            console.log('Subscribed to target address transactions');
          }).catch(error => {
            console.error('Error subscribing:', error);
          });

       // Listen for transactions
        api.connection.on('transaction', tx => {
            console.log(tx)
            console.log("address",address)
            if (tx.transaction && tx.transaction.Account === address) {
            console.log('Deposit detected:', tx);
            console.log("Amount", amount*10**6)
            res.send({ status: 'Deposit received from!'+address });
            }
            // else{
            //     res.send({ status: 'Deposit Not received!' });
            // }
        });
    })
    } catch (error) {
        console.error('Error checking deposit:', error);
        res.status(500).send({ status: 'Error occurred' });
    }
});
// // "ripple-lib": "^1.10.2"
app.post('/cancel', async (req, res) => {
    api.disconnect().then(() => {
        res.send({ status: 'Cancelled' });
    }).catch(error => {
        res.status(500).send({ status: 'Error occurred' });
    });

});

// Route handler for the root URL
app.get('/', (req, res) => {
    // Send the index.html file
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
