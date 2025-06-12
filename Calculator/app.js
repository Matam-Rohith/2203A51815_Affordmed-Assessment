import React, { useState } from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const App = () => {
  const [numberType, setNumberType] = useState('p');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchNumbers = async () => {
    try {
      const response = await fetch(`http://localhost:8000/numbers/${numberType}`);
      if (!response.ok) throw new Error('Server Error');
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  return (
    <div>
      <h1>Average Calculator</h1>
      <select value={numberType} onChange={(e) => setNumberType(e.target.value)}>
        <option value="p">Prime</option>
        <option value="f">Fibonacci</option>
        <option value="e">Even</option>
        <option value="r">Random</option>
      </select>
      <button onClick={fetchNumbers}>Fetch Numbers</button>

      <div className="output">
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {data && (
          <>
            <p><strong>Previous Window:</strong> [{data.previousWindow.join(', ')}]</p>
            <p><strong>Current Window:</strong> [{data.currentWindow.join(', ')}]</p>
            <p><strong>Average:</strong> {data.avg}</p>
          </>
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
