import React from 'react';
import ReactDOM from 'react-dom';
import positions from './portfolio.json';
import {PieChart} from 'react-minimal-pie-chart';

const Holdings=()=>{
  return(
    <React.Fragment>
      <h1>Dividend Tracking App</h1>
      <h2>Total Portfolio Value: </h2>
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

// positions[0].valueOfHoldingInEuro
// positions[1].valueOfHoldingInEuro
// positions[2].valueOfHoldingInEuro
// positions[3].valueOfHoldingInEuro
// positions[4].valueOfHoldingInEuro
// positions[5].valueOfHoldingInEuro
// positions[6].valueOfHoldingInEuro
// positions[7].valueOfHoldingInEuro
// positions[8].valueOfHoldingInEuro
// positions[9].valueOfHoldingInEuro
// positions[10].valueOfHoldingInEuro
// positions[11].valueOfHoldingInEuro
// positions[12].valueOfHoldingInEuro
// positions[13].valueOfHoldingInEuro
// positions[14].valueOfHoldingInEuro
// positions[15].valueOfHoldingInEuro

const data=[
        {title: positions[0].ticker, value: 100, color: 'blue'},
        {title: positions[1].ticker, value: 100, color: '#BFFCC6'},
        {title: positions[2].ticker, value: 100, color: '#FF9CEE'},
        {title: positions[3].ticker, value: 100, color: '#C5A3FF'},
        {title: positions[4].ticker, value: 100, color: '#C4FAF8'},
        {title: positions[5].ticker, value: 100, color: '#DBFFD6'},
        {title: positions[6].ticker, value: 100, color: '#FFB5E8'},
        {title: positions[7].ticker, value: 100, color: '#FFC9DE'},
        {title: positions[8].ticker, value: 100, color: '#FFABAB'},
        {title: positions[9].ticker, value: 100, color: '#AFF8D8'},
        {title: positions[10].ticker, value: 100, color: '#85E3FF'},
        {title: positions[11].ticker, value: 100, color: '#FFBEBC'},
        {title: positions[12].ticker, value: 100, color: '#ECD4FF'},
        {title: positions[13].ticker, value: 100, color: '#FFF5BA'},
        {title: positions[14].ticker, value: 100, color: '#B28DFF'},
        {title: positions[15].ticker, value: 100, color: '#6EB5FF'},
      ];

const Chart=()=>{
  return (
    <React.Fragment>
      <PieChart style={{backgroundColor: '#404953'}} radius={20} labelPosition={112} animate data={data}/>
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