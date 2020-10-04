import pandas as pd
import matplotlib.pylab as plt
from statsmodels.tsa.stattools import adfuller
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
from statsmodels.tsa.statespace.sarimax import SARIMAX
from datetime import datetime
import xlsxwriter

df = pd.read_excel('temperature data.xlsx', usecols=['Year','Lowess(5)'])
ts = df['Lowess(5)']
def test_stationarity(timeseries):
    
    dftest = adfuller(timeseries, autolag='AIC')
    dfoutput = pd.Series(dftest[0:4], index=['Test Statistic','p-value','#Lags Used','Number of Observations Used'])
    for key,value in dftest[4].items():
        dfoutput['Critical Value (%s)'%key] = value
    
    critical_value = dftest[4]['5%']
    test_statistic = dftest[0]
    alpha = 1e-3
    pvalue = dftest[1]
    if pvalue < alpha and test_statistic < critical_value:  # null hypothesis: x is non stationary
        print("X is stationary")
        return True
    else:
        print("X is not stationary")
        return False
ts_diff = pd.Series(ts)
ts_trend = pd.Series(ts)
d = 0
while test_stationarity(ts_diff) is False:
    ts_diff = ts_diff.diff().dropna()
    d = d + 1
p = 10
q = 1
model = SARIMAX(ts, order=(p,d,q))
model_fit = model.fit(disp=1,solver='powell')
fcast = model_fit.get_prediction(start=1, end=250)
ts_p = fcast.predicted_mean
ts_ci = fcast.conf_int()
i = 0
while(i<250):
	print(ts_p[i+1])
	i = i + 1
workbook = xlsxwriter.Workbook('temperature_predictions.xlsx')
worksheet = workbook.add_worksheet()
i = 0
c = 0
data = []
while(i <= 250 and c <= 249) :
	data.append([1880 + i,ts_p[i+1]])
	i = i  + 1
	c = c + 1
worksheet.write(0, 0, "Year")
worksheet.write(0, 1, "Total")
row = 1
col = 0
for Year, Total in (data):
    worksheet.write(row, col, Year)
    worksheet.write(row, col + 1, Total)
    row += 1
workbook.close()
plt.plot(ts_p,label='prediction')
plt.plot(ts,color='red',label='actual')
plt.fill_between(ts_ci.index[1:],
                ts_ci.iloc[1:, 0],
                ts_ci.iloc[1:, 1], color='k', alpha=.2)
plt.ylabel('Lowess temperature')
plt.legend()
plt.tight_layout()
plt.grid()
plt.savefig('result.png')
plt.show()