function displayError(message) {
    const errorMsg = document.getElementById('error');
    errorMsg.innerText = message;
    errorMsg.style.display = 'block';
}

function hideError() {
    const errorMsg = document.getElementById('error');
    errorMsg.innerText = '';
    errorMsg.style.display = 'none';
}

async function getExchangeRate(fromCurrency, toCurrency) {
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    try {
        const response = await axios.get(url);
        return response.data.rates[toCurrency];
    } catch (error) {
        throw new Error('Fehler beim Abrufen der Wechselkurse. Bitte versuchen Sie es später erneut.');
    }
}

async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    hideError();

    if (isNaN(amount) || amount <= 0) {
        displayError('Bitte geben Sie einen gültigen Betrag ein.');
        return;
    }

    try {
        const rate = await getExchangeRate(fromCurrency, toCurrency);
        const result = amount * rate;
        document.getElementById('resultAmount').innerText = result.toFixed(2);
    } catch (error) {
        displayError(error.message);
    }
}
document.getElementById('convertButton').addEventListener('click', convertCurrency);