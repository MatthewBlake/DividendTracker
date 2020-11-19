import React from 'react';
import ReactDOM from 'react-dom';
import positions from './portfolio.json';
import { PieChart } from 'react-minimal-pie-chart';

const Holdings=()=>{
  return(
  <React.Fragment>
    <h1>Dividend Tracking App</h1>
    <h2>Total Portfolio Value: </h2>
    <br />
      {positions.map((holding, index)=>{
        return <ul>
          <li>ticker - {holding.ticker}</li>
          <li>current price - {holding.currentPrice}</li>
          <li>dividend - {holding.dividend}</li>
          <li>ex dividend date - {holding.exDividendDate}</li>
          <li>P/E Ratio - {holding.PERatio}</li>
          <li>EPS - {holding.EPS}</li>
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
      <PieChart data={[
        {title: 'JPM', value: 114.82, color: 'blue'},
        {title: 'T', value: 205.48, color: 'red'},
        {title: 'ABBV', value: 147.33, color: 'green'},
        {title: 'MMM', value: 144.54, color: 'pink'},
        {title: 'BMO', value: 176.97, color: 'black'},
        {title: 'KO', value: 133.10, color: 'white'},
        {title: 'BNS', value: 149.87, color: 'grey'},
        {title: 'CL', value: 142.71, color: 'purple'},
        {title: 'CSCO', value: 98.13, color: 'orange'},
        {title: 'JNJ', value: 166.07, color: 'yellow'},
        {title: 'LEG', value: 137.87, color: 'brown'},
        {title: 'MRK', value: 106, color: 'cyan'},
        {title: 'PEP', value: 120.91, color: 'lime'},
        {title: 'O', value: 154.81, color: 'navy'},
        {title: 'STOR', value: 138.60, color: '#C13C37'},
        {title: 'VZ', value: 137.07, color: '#6A2135'},
      ]}/>
    </React.Fragment>
  )
}

function App() {
  return (
    <>
    <Holdings></Holdings>
    <Chart></Chart>
    </>
  );
}

export default App;