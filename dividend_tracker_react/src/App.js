import React from 'react';
import ReactDOM from 'react-dom';
import positions from './portfolio.json';
import {PieChart} from 'react-minimal-pie-chart';

let totalPortfolioValue = 0;
const data = [];
const colours = ['#DCD3FF', '#BFFCC6', '#FF9CEE', '#C5A3FF', '#C4FAF8', '#DBFFD6', '#FFB5E8', '#FFC9DE', '#FFABAB', '#AFF8D8', '#85E3FF', '#FFBEBC', '#ECD4FF', '#FFF5BA', '#B28DFF', '#6EB5FF'];

for(let i=0; i<positions.length; i++){
    totalPortfolioValue += positions[i].valueOfHoldingInEuro;
  }

totalPortfolioValue = totalPortfolioValue.toFixed(2);

const Holdings=()=>{
  return(
    <React.Fragment>
        {positions.map((holding, index)=>{
          return <ul>
            <ul><h3>{holding.ticker}</h3>
            <li>sector - <strong>{holding.sector}</strong></li>
            <li>current price - <strong>${holding.currentPrice}</strong></li>
            <li>dividend - <strong>${holding.dividend}</strong></li>
            <li>ex dividend date - <strong>{holding.exDividendDate}</strong></li>
            <li>dividend Date - <strong>{holding.dividendDate}</strong></li>
            <li>P/E Ratio - <strong>{holding.PERatio}</strong></li>
            <li>payout Ratio - <strong>{holding.payoutRatio}</strong></li>
            <li>EPS - <strong>${holding.EPS}</strong></li>
            <li>shares owned - <strong>{holding.sharesOwned}</strong></li>
            <li>value of holding - <strong>${holding.valueOfHolding} (€{holding.valueOfHoldingInEuro})</strong></li>
            </ul>
            <br />
          </ul>
        })}
    </React.Fragment>
  )
}

for(let i=0; i<positions.length;i++){
  data.push({title: positions[i].ticker, value: positions[i].valueOfHoldingInEuro, color: colours[i]});
}

const defaultLabelStyle = {
  fontSize: '1.25px',
  fontFamily: 'sans-serif',
};

const Chart=()=>{
  return (
    <React.Fragment>
      <PieChart label={({dataEntry}) => dataEntry.title + "\n " + ((dataEntry.value/totalPortfolioValue)*100).toFixed(2) + "%"} style={{backgroundColor: '#404953'}} radius={25} labelStyle={defaultLabelStyle} labelPosition={85} animate data={data}/>
    </React.Fragment>
  )
}

function App() {
  return (
    <>
    <h1>Dividend Tracking App</h1>
    <h2>Total Portfolio Value: €{totalPortfolioValue}</h2>
    <Chart></Chart>
    <Holdings></Holdings>
    </>
  );
}

export default App;