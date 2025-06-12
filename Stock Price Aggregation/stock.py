import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const App = () => {
  const [symbol, setSymbol] = useState("AAPL");
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStockPrice = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.example.com/stocks/${symbol}`);
      const data = await response.json();
      setPrice(data.price);
    } catch (err) {
      setError("Failed to fetch stock data.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStockPrice();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-6">Stock Price Aggregator</h1>
      <div className="flex gap-2 mb-4">
        <Input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Enter Stock Symbol"
          className="w-40"
        />
        <Button onClick={fetchStockPrice}>Get Price</Button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {price !== null && !loading && !error && (
        <Card className="w-60">
          <CardContent className="text-center">
            <h2 className="text-xl font-semibold">{symbol} Price</h2>
            <p className="text-2xl">${price}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default App;
