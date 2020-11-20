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

const Chart=()=>{
  return (
    <React.Fragment>
      <PieChart style={{backgroundColor: '#404953'}} radius={20} labelPosition={112} animate data={[
        {title: 'ABBV', value: 147.33, color: '#DCD3FF'},
        {title: 'BMO', value: 176.97, color: '#BFFCC6'},
        {title: 'BNS', value: 149.87, color: '#FF9CEE'},
        {title: 'CL', value: 142.71, color: '#C5A3FF'},
        {title: 'CSCO', value: 98.13, color: '#C4FAF8'},
        {title: 'JNJ', value: 166.07, color: '#DBFFD6'},
        {title: 'JPM', value: 114.82, color: '#FFB5E8'},
        {title: 'KO', value: 133.10, color: '#FFC9DE'},
        {title: 'LEG', value: 137.87, color: '#FFABAB'},
        {title: 'MMM', value: 144.54, color: '#AFF8D8'},
        {title: 'MRK', value: 106, color: '#85E3FF'},
        {title: 'PEP', value: 120.91, color: '#FFBEBC'},
        {title: 'O', value: 154.81, color: '#ECD4FF'},
        {title: 'STOR', value: 138.60, color: '#FFF5BA'},
        {title: 'T', value: 205.48, color: '#B28DFF'},
        {title: 'VZ', value: 137.07, color: '#6EB5FF'},
      ]}/>
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