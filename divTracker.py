import requests
import bs4
import json

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
        print(self.ticker+ "   " + self.valueOfHoldingInEuro + "      " + self.dividend)
        if float(self.valueOfHoldingInEuro) < 400:
            portfolioValue = float("{:.2f}".format(portfolioValue + float(self.valueOfHoldingInEuro)))

tickers = [['JPM', 1.1813487], ['AAPL', 1.1359216], ['T', 8.513788], ['ABBV', 1.769657], ['MMM', 1], ['BMO', 3], ['KO', 3], ['BNS', 3.187735], ['CL', 2], ['JNJ', 1.336297], ['LEG', 3.280331], ['MRK', 1.566231], ['MSFT', 0.6064628], ['PEP', 1], ['O', 3], ['STOR', 5.214147], ['VZ', 2.694595], ['DIS', 1]]
portfolio = []
valueKeys = {}
sortArray = []
outputArray = {}

currencyConverter = requests.get('https://finance.yahoo.com/quote/EURUSD=X?p=EURUSD=X&.tsrc=fin-srch')
converterSoup = bs4.BeautifulSoup(currencyConverter.text, 'lxml')
exchangeRate = float(1/float(((converterSoup.find("span", class_="Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)")).getText())))

for t in range (len(tickers)):
    res = requests.get('https://finance.yahoo.com/quote/'+tickers[t][0]+'?p='+tickers[t][0])
    soup = bs4.BeautifulSoup(res.text, 'lxml')
    currentPrice = float((soup.find("span", class_="Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)")).getText())
    dividend = soup.find_all("td", class_="Ta(end) Fw(600) Lh(14px)")
    stock = Stock(tickers[t][0], currentPrice, dividend[13].getText(), dividend[14].getText(), dividend[10].getText(), dividend[11].getText(), tickers[t][1], exchangeRate)
    portfolio.append(stock)
    sortArray.append(float(stock.valueOfHoldingInEuro))
    # print(stock.ticker)
    # jsonStock = json.dumps(stock.__dict__)
    # portfolio.append(jsonStock)

sortArray.sort()

for holding in portfolio:
    valueKeys[float(holding.valueOfHoldingInEuro)] = holding.ticker

for price in sortArray:
    outputArray[price] = valueKeys[price]

for index in outputArray:
    ticker = valueKeys[index]
    print(ticker + "      €" + str(index))
    # for i in portfolio:
    #     if str(i.valueOfHoldingInEuro) == str(index):
    #         print(i.dividend)
    #     for j in tickers:
    #         if i.ticker == j[0]:
    #             print(i.dividend)
    #             print(i.ticker)
    #             print(j[0])

# with open('portfolio.txt', 'w') as outfile:
#     json.dump(portfolio, outfile)
# print(portfolioValue)