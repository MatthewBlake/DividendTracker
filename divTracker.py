import requests
import bs4
import json
from array import *

portfolioValue = float(0.00)

class Stock:
    def __init__(self, ticker, currentPrice, dividend, exDividendDate, PERatio, EPS, sharesOwned, exchangeRate):
        global portfolioValue
        self.ticker = ticker
        self.currentPrice = currentPrice
        self.dividend = dividend
        self.exDividendDate = exDividendDate
        self.PERatio = PERatio
        self.EPS = EPS
        self.sharesOwned = sharesOwned
        self.valueOfHolding = float("{:.2f}".format(currentPrice*sharesOwned))
        self.valueOfHoldingInEuro = "{:.2f}".format(self.valueOfHolding*exchangeRate)
        print(ticker + "    " + dividend + "    " + self.valueOfHoldingInEuro)
        portfolioValue = float("{:.2f}".format(portfolioValue + float(self.valueOfHoldingInEuro)))

tickers = [['JPM', 0.9776646], ['AAPL', 1.1359216], ['T', 8.513788], ['ABBV', 1.405067], ['MMM', 1], ['BMO', 3], ['KO', 3], ['BNS', 3.187735], ['CL', 2], ['JNJ', 1.336297], ['LEG', 3], ['MRK', 1.276408], ['MSFT', 0.6064628], ['PEP', 1], ['O', 3], ['STOR', 5.214147], ['VZ', 1.916961], ['DIS', 1]]
#tickers.sort()
portfolio = []
#sharesOwned = [0.9776646, 1.1359216, 8.513788, 1.405067, 1, 3, 3, 3.187735, 2, 1.336297, 3, 1.276408, 0.6064628, 1, 3, 5.214147,1.916961, 1]

currencyConverter = requests.get('https://finance.yahoo.com/quote/EURUSD=X?p=EURUSD=X&.tsrc=fin-srch')
converterSoup = bs4.BeautifulSoup(currencyConverter.text, 'lxml')
exchangeRate = float(1/float(((converterSoup.find("span", class_="Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)")).getText())))

for t in range (len(tickers)):
    res = requests.get('https://finance.yahoo.com/quote/'+tickers[t][0]+'?p='+tickers[t][0])
    soup = bs4.BeautifulSoup(res.text, 'lxml')
    currentPrice = float((soup.find("span", class_="Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)")).getText())
    dividend = soup.find_all("td", class_="Ta(end) Fw(600) Lh(14px)")
    stock = Stock(tickers[t][0], currentPrice, dividend[13].getText(), dividend[14].getText(), dividend[10].getText(), dividend[11].getText(), tickers[t][1], exchangeRate)
    jsonStock = json.dumps(stock.__dict__)
    portfolio.append(jsonStock)

with open('portfolio.txt', 'w') as outfile:
    json.dump(portfolio, outfile)
# print(portfolio)

print(portfolioValue)