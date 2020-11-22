import requests
import bs4
import json
import schedule
import time

portfolioValue = float(0.00)
tickers = [['ABBV', 2.120597], ['BMO', 3], ['BNS', 3.69765], ['CL', 2], ['CSCO', 3.738365], ['JNJ', 1.336297], ['JPM', 1.3449412], ['KO', 3], ['LEG', 3.841383], ['MMM', 1], ['MRK', 1.924756], ['PEP', 1.0737748], ['O', 3.501692], ['STOR', 5.760692], ['T', 8.513788], ['VZ', 2.694595]]

class Stock:
    def __init__(self, ticker, currentPrice, dividend, exDividendDate, PERatio, EPS, sharesOwned, exchangeRate):
        global portfolioValue

        sectorRequest = requests.get('https://finance.yahoo.com/quote/'+ticker+'/profile?p='+ticker)
        sectorSoup = bs4.BeautifulSoup(sectorRequest.text, 'lxml')
        self.ticker = ticker
        self.sector = (sectorSoup.find("span", class_="Fw(600)")).getText()
        self.currentPrice = currentPrice
        self.dividend = dividend
        self.exDividendDate = exDividendDate
        self.PERatio = PERatio
        self.EPS = EPS
        self.sharesOwned = sharesOwned
        self.valueOfHolding = float("{:.2f}".format(currentPrice*sharesOwned))
        self.valueOfHoldingInEuro = float("{:.2f}".format(self.valueOfHolding*exchangeRate))
        if float(self.valueOfHoldingInEuro) < 400:
            portfolioValue = float("{:.2f}".format(portfolioValue + float(self.valueOfHoldingInEuro)))

while True:
    print("Scraping...")
    portfolio = []
    portfolioJSON = []
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
        jsonStock = stock.__dict__
        portfolioJSON.append(jsonStock)
        portfolio.append(stock)

    sortArray.sort()

    for holding in portfolio:
        valueKeys[float(holding.valueOfHoldingInEuro)] = holding.ticker

    for price in sortArray:
        outputArray[price] = valueKeys[price]

    for index in outputArray:
        ticker = valueKeys[index]
        percentageOfPortfolio = "{:.2f}".format((index/portfolioValue)*100)

    with open('dividend_tracker_react\\src\\portfolio.json', 'w') as outfile:
        json.dump(portfolioJSON, outfile)