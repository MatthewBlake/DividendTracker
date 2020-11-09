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
        print(ticker + "    " + dividend + "    " + self.valueOfHoldingInEuro)
        #portfolioValue = portfolioValue + self.valueOfHoldingInEuro

tickers = ['JPM', 'AAPL', 'T', 'ABBV', 'MMM', 'BMO', 'KO', 'BNS', 'CL', 'JNJ', 'LEG', 'MRK', 'MSFT', 'PEP', 'O', 'STOR', 'VZ', 'DIS']
#tickers.sort()
portfolio = []
sharesOwned = [0.9776646, 1.1359216, 8.513788, 1.405067, 1, 3, 3, 3.187735, 2, 1.336297, 3, 1.276408, 0.6064628, 1, 3, 5.214147,1.916961, 1]

currencyConverter = requests.get('https://finance.yahoo.com/quote/EURUSD=X?p=EURUSD=X&.tsrc=fin-srch')
converterSoup = bs4.BeautifulSoup(currencyConverter.text, 'lxml')
exchangeRate = float(1/float(((converterSoup.find("span", class_="Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)")).getText())))

for i in range(len(tickers)):
    res = requests.get('https://finance.yahoo.com/quote/'+tickers[i]+'?p='+tickers[i])
    soup = bs4.BeautifulSoup(res.text, 'lxml')
    currentPrice = float((soup.find("span", class_="Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)")).getText())
    dividend = soup.find_all("td", class_="Ta(end) Fw(600) Lh(14px)")
    stock = Stock(tickers[i], currentPrice, dividend[13].getText(), dividend[14].getText(), dividend[10].getText(), dividend[11].getText(), sharesOwned[i], exchangeRate)
    jsonStock = json.dumps(stock.__dict__)
    portfolio.append(jsonStock)

with open('portfolio.txt', 'w') as outfile:
    json.dump(portfolio, outfile)
# print(portfolio)