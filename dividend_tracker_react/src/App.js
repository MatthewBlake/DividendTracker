import './App.css';
import data from './portfolio.json'

function App() {
  return (
    <div className="App">
      <h1>Dividend Tracking App</h1>
        {data.map((holding, index)=>{
          return <ul>
            <li>ticker - {holding.ticker}</li>
            <li>currentPrice - {holding.currentPrice}</li>
            <li>dividend - {holding.dividend}</li>
            <li>ex dividend date - {holding.exDividendDate}</li>
            <li>P/E Ratio - {holding.PERatio}</li>
            <li>EPS - {holding.EPS}</li>
            <li>shares owned - {holding.sharesOwned}</li>
            <li>value of holding - ${holding.valueOfHolding} (€{holding.valueOfHoldingInEuro})</li>
            <br />
          </ul>
        })}  
    </div>
  );
}

export default App;
