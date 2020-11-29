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
      <h1>Dividend Tracking App</h1>
      <h2>Total Portfolio Value: €{totalPortfolioValue}</h2>
      <br />
        {positions.map((holding, index)=>{
          return <ul>
            <li>ticker - {holding.ticker}</li>
            <li>sector - {holding.sector}</li>
            <li>current price - ${holding.currentPrice}</li>
            <li>dividend - ${holding.dividend}</li>
            <li>ex dividend date - {holding.exDividendDate}</li>
            <li>dividend Date - {holding.dividendDate}</li>
            <li>P/E Ratio - {holding.PERatio}</li>
            <li>payout Ratio - {holding.payoutRatio}</li>
            <li>EPS - ${holding.EPS}</li>
            <li>shares owned - {holding.sharesOwned}</li>
            <li>value of holding - ${holding.valueOfHolding} (€{holding.valueOfHoldingInEuro})</li>
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
  fontSize: '2px',
  fontFamily: 'sans-serif',
};

const Chart=()=>{
  return (
    <React.Fragment>
      <PieChart label={({dataEntry}) => dataEntry.title} style={{backgroundColor: '#404953'}} radius={25} labelStyle={defaultLabelStyle} labelPosition={75} animate data={data}/>
    </React.Fragment>
  )
}

function App() {
  return (
    <>
    <Chart></Chart>
    <Holdings></Holdings>
    </>
  );
}

export default App;