import React, { useState } from 'react';

function App() {
  const [symbol, setSymbol] = useState('AAPL');
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchStockPrice = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=apple&vs_currencies=usd
${symbol}`);
      const data = await response.json();
      setPrice(data.price);
    } catch (err) {
      setError('Could not fetch stock data.');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Stock Price Aggregator</h1>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        placeholder="Enter stock symbol"
      />
      <button onClick={fetchStockPrice}>Get Price</button>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {price && !error && <p className="price">${price}</p>}
    </div>
  );
}

export default App;
