async function deposit() {
    const amount = document.getElementById('amountInput').value;
    const address = document.getElementById('yourAddress').value;
    const status = document.getElementById('status')
    status.innerText = `Waiting For Deposit.....`;
    const cancel = document.getElementById('cancel')
    cancel.style.display = 'block';
    const response = await fetch('/checkDeposit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "amount":amount,"address":address })
    });
    const data = await response.json();
    status.innerText = `Status: ${data.status}`;
}

async function cancel() {
    const status = document.getElementById('status')
    status.innerText = `Cancelling Deposit.....`;
    const response = await fetch('/cancel', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: ``
    });
    const data = await response.json();
    status.innerText = `Status: ${data.status}`;
}
