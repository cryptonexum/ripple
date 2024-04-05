
const RippleAPI = require('ripple-lib').RippleAPI;

// Connect to Ripple network
const api = new RippleAPI({ server: 'wss://s.altnet.rippletest.net:51233' });

// Address you want to monitor for deposits
const targetAddress = 'rfLRtMcNQLJvXoEeSNKRtxgVd6QZxmowjK';

// Address you want to receive deposits
const account = 'rpUQzgasrRM6g9S7Adq2hpE3mbjmpYARtC';

const targetAmount =1000000;

// Connect to the Ripple server
api.connect().then(() => {
  console.log('Connected to Ripple');

  // Subscribe to transactions for the target address
  api.connection.request({
    command: 'subscribe',
    accounts: [targetAddress]
  }).then(() => {
    console.log('Subscribed to target address transactions');
  }).catch(error => {
    console.error('Error subscribing:', error);
  });

  // Listen for transactions
  api.connection.on('transaction', tx => {
    if (tx.transaction && tx.transaction.Account === account) {
      console.log('Deposit detected:', tx);
      console.log("Amount", targetAmount)
      // Handle deposit event here
    }
  });
}).catch(error => {
  console.error('Error connecting to Ripple:', error);
});
