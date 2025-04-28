import { useState } from 'react';

function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState(null);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };


  const handleConvert = async () => {
    const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY;
    try {
      const response = await fetch(
        `https://api.exchangerate.host/live?access_key=${API_KEY}&source=${fromCurrency}&currencies=${toCurrency}&format=1`
      );
      const data = await response.json();
      
      if (data.success) {
        const rate = data.quotes[`${fromCurrency}${toCurrency}`];
        if (rate) {
          setResult(rate * amount);
        } else {
          setResult('error');
        }
      } else {
        setResult('error');
      }
    } catch (error) {
      console.error('Fehler bei der Umrechnung:', error);
      setResult('error');
    }
  };
  
  
  
  

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <input
        type="number"
        value={amount}
        onChange={handleAmountChange}
        placeholder="Betrag"
      />

      <select value={fromCurrency} onChange={handleFromCurrencyChange}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CHF">CHF</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
      </select>

      <select value={toCurrency} onChange={handleToCurrencyChange}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CHF">CHF</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
      </select>

      <button onClick={handleConvert}>
        Umrechnen
      </button>

      {result !== null && result !== 'error' && (
        <h2>{amount} {fromCurrency} = {Number(result).toFixed(2)} {toCurrency}</h2>
      )}
      
      {result === 'error' && (
        <h2> Umrechnung nicht möglich, bitte Währungen prüfen.</h2>
        )}
    </div>
  );
}

export default CurrencyConverter;