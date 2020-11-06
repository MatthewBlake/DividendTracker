import requests
import bs4
import json

class Stock:
    def __init__(self, ticker, currentPrice, dividend, exDividendDate, fairValue):
        self.ticker = ticker
        self.currentPrice = currentPrice
        self.dividend = dividend
        self.exDividendDate = exDividendDate
        self.fairValue = fairValue

    def toDict(self):
        return self.__dict__

ticker = ['JPM', 'AAPL', 'T', 'ABBV', 'MMM', 'BMO', 'KO', 'BNS', 'CL', 'XOM', 'JNJ', 'LEG', 'MRK', 'MSFT', 'PEP', 'O', 'STOR', 'VZ', 'DIS']
prices = []
for x in ticker:
    res = requests.get('https://finance.yahoo.com/quote/'+x+'?p='+x)
    soup = bs4.BeautifulSoup(res.text, 'lxml')
    currentPrice = soup.find("span", class_="Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)")
    dividend = soup.find_all("td", class_="Ta(end) Fw(600) Lh(14px)")
    fairValue = soup.find("div", class_="Fw(b) Fl(end)--m Fz(s) C($primaryColor")
    prices.append(float(currentPrice.getText()))
    stock = Stock(x, currentPrice.getText(), dividend[13].getText(), dividend[14].getText(), fairValue.getText())
    # stock.getTicker()
    # stock.getCurrentPrice()
    jsonStock = json.dumps(stock.toDict())
    print(jsonStock)