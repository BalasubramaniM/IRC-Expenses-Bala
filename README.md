# IRC-Expenses-Bala
Expense tracker app using Node.js &amp; Socket.io

## Node.js Expense Tracker ##

SETUP

- CD to project location
- Do "npm install"
- run "node server.js"
- go to your "GOOGLE CHROME" browser and type "http://localhost:3000/"

Basic design has been carried out through out the project and use Google Chrome for proper structure of design.

## ADD USER ##

You can add user you want to track with ease.

## SELECT USER ##

Select the user whom you going to track

## TYPE ##

Type of money or amount he is paid, owe or is owed.

## AMOUNT ##

Enter the amount

## DESC ##

Enter the description of your tracker expense and press enter to send.

---------------------------------------------------------------------------------------------------

## VISUALIZATION PART ##

* Add some users before you visualize *

type "@bot pie chart" to visualize your expense in PIE CHART format.

type "@bot bar chart" to visualize your expense in BAR CHART format

## EXPORT IN EXCEL FORMAT ##

Command to export. We can achieve that using npm module, will explore it and try.

mongoexport --host localhost --collection userexpenses --csv --fields created_at,modified_at,admin,username,amount,type --out userexpenses.csv
