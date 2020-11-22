import React from 'react';
import ReactDOM from 'react-dom';
import positions from './portfolio.json';
import {PieChart} from 'react-minimal-pie-chart';

let totalPortfolioValue = 0;

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
            <li>current price - ${holding.currentPrice}</li>
            <li>dividend - ${holding.dividend}</li>
            <li>ex dividend date - {holding.exDividendDate}</li>
            <li>P/E Ratio - {holding.PERatio}</li>
            <li>EPS - ${holding.EPS}</li>
            <li>shares owned - {holding.sharesOwned}</li>
            <li>value of holding - ${holding.valueOfHolding} (€{holding.valueOfHoldingInEuro})</li>
            <br />
          </ul>
        })}
    </React.Fragment>
  )
}

const data=[
        {title: positions[0].ticker, value: positions[0].valueOfHoldingInEuro, color: '#DCD3FF'},
        {title: positions[1].ticker, value: positions[1].valueOfHoldingInEuro, color: '#BFFCC6'},
        {title: positions[2].ticker, value: positions[2].valueOfHoldingInEuro, color: '#FF9CEE'},
        {title: positions[3].ticker, value: positions[3].valueOfHoldingInEuro, color: '#C5A3FF'},
        {title: positions[4].ticker, value: positions[4].valueOfHoldingInEuro, color: '#C4FAF8'},
        {title: positions[5].ticker, value: positions[5].valueOfHoldingInEuro, color: '#DBFFD6'},
        {title: positions[6].ticker, value: positions[6].valueOfHoldingInEuro, color: '#FFB5E8'},
        {title: positions[7].ticker, value: positions[7].valueOfHoldingInEuro, color: '#FFC9DE'},
        {title: positions[8].ticker, value: positions[8].valueOfHoldingInEuro, color: '#FFABAB'},
        {title: positions[9].ticker, value: positions[9].valueOfHoldingInEuro, color: '#AFF8D8'},
        {title: positions[10].ticker, value: positions[10].valueOfHoldingInEuro, color: '#85E3FF'},
        {title: positions[11].ticker, value: positions[11].valueOfHoldingInEuro, color: '#FFBEBC'},
        {title: positions[12].ticker, value: positions[12].valueOfHoldingInEuro, color: '#ECD4FF'},
        {title: positions[13].ticker, value: positions[13].valueOfHoldingInEuro, color: '#FFF5BA'},
        {title: positions[14].ticker, value: positions[14].valueOfHoldingInEuro, color: '#B28DFF'},
        {title: positions[15].ticker, value: positions[15].valueOfHoldingInEuro, color: '#6EB5FF'},
      ];

const Chart=()=>{
  return (
    <React.Fragment>
      <PieChart style={{backgroundColor: '#404953'}} radius={25} labelPosition={112} animate data={data}/>
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