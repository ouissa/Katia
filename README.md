# Introduction

Katia is a teenager virtual influencer from the future. Katia comes from 2100 and her main goal is to sensitize teenagers mainly and everyone to care about the planet because it is no good in her time. Katia has her own Facebook and Instagram pages where she posts stuff and where you can chat with her at any time. Katia will tell you a lot about what happened to the planet in her time and will suggest solutions that you can apply from your own lifestyle to save the Earth. Katia also has her own website where she posts blogs about what people can do to save the planet, and where she presents graphs that predict what will happen to the Earth on different aspects: sea levels, ice volume, air quality… You can also chat with Katia on the website.

This repository holds the server that writes the function for the intents of the Katia bot of wit.ai, and integrates the bot with Messenger and Instagram.

## Prediction Models:
This is where we trained our models using SARIMA algorithm to predict sea levels, land and ocean temperatures, ice area, and carbon emissions.

## Prediction Result API:
This API takes the results from the prediction and provides the interface for the bot to get the prediction data.

## The Bot:
The bot is using wir.ai, the code here is taking care of the intents that request data from the prediction API and convert it into understandable language. Also, it is integrated with Messenger and Instgram.

## The Main Website:

Here we assemble everything, from the chat bot, to the Facebook and Instagram accounts where again you can chat with Katia, to blogs from Katia about how to save the planet, then to graphs that represent the prediction for students and anyone interested in numbers.



