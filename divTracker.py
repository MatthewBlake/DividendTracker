import requests
import bs4
import json

class Stock:
    def __init__(self, ticker, currentPrice, dividend, exDividendDate, PERatio, EPS, sharesOwned, exchangeRate):
        self.ticker = ticker
        self.currentPrice = currentPrice
        self.dividend = dividend
        self.exDividendDate = exDividendDate
        self.PERatio = PERatio
        self.EPS = EPS
        self.sharesOwned = sharesOwned
        self.valueOfHolding = float("{:.2f}".format(currentPrice*sharesOwned))
        self.valueOfHoldingInEuro = "{:.2f}".format(self.valueOfHolding*exchangeRate)

tickers = ['JPM', 'AAPL', 'T', 'ABBV', 'MMM', 'BMO', 'KO', 'BNS', 'CL', 'XOM', 'JNJ', 'LEG', 'MRK', 'MSFT', 'PEP', 'O', 'STOR', 'VZ', 'DIS']
tickers.sort()
portfolio = []
sharesOwned = 1.2

currencyConverter = requests.get('https://finance.yahoo.com/quote/EURUSD=X?p=EURUSD=X&.tsrc=fin-srch')
converterSoup = bs4.BeautifulSoup(currencyConverter.text, 'lxml')
exchangeRate = float(1/float(((converterSoup.find("span", class_="Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)")).getText())))

for t in tickers:
    res = requests.get('https://finance.yahoo.com/quote/'+t+'?p='+t)
    soup = bs4.BeautifulSoup(res.text, 'lxml')
    currentPrice = float((soup.find("span", class_="Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)")).getText())
    dividend = soup.find_all("td", class_="Ta(end) Fw(600) Lh(14px)")
    stock = Stock(t, currentPrice, dividend[13].getText(), dividend[14].getText(), dividend[10].getText(), dividend[11].getText(), sharesOwned, exchangeRate)
    jsonStock = json.dumps(stock.__dict__)
    portfolio.append(jsonStock)

with open('portfolio.txt', 'w') as outfile:
    json.dump(portfolio, outfile)
# print(portfolio)