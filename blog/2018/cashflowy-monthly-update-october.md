---
title: Cashflowy – Monthly update (October)
layout: layouts/post.ejs
created_at: 2018-11-01
---
# Cashflowy – Monthly update (October)

## Updates summary:

### Major:

-   Auto create account from emails
-   Weekly email report
-   Support for HDFC bank customers
-   Support for city bank credit card
-   Support for Amazon pay
-   Automated snapshots
-   Unaccounted money
-   Transactions are now 3 types – expense, income and transfer
-   Update in list transactions view

### Minor:

-   Display only one snapshot of the day
-   Category dropdown refactored
-   Display account balance on the dashboard
-   Edit account

### Stats:

-   Commits – 46
-   Customers who are actively using the product – 5
-   Revenue – nil
-   Expense(excluding manpower) – nil

## Details:

### Auto create account from emails

When onboarding new customers, it is tedious to create all accounts on Cashflowy. Sometimes the customer forgets to add some accounts as well. This resulted in Cashflowy’s parsing engine to throw errors as the account mentioned in the parsed email did not exist. With this update, if the account does not exist, then the parsing engine auto creates accounts for the user on Cashflowy.

### Weekly email report

We now send out a report on your cash flow every week.

### Support for HDFC bank customers

Parsers for HDFC bank are now in production. HDFC bank sends the following information via email:

-   UPI transactions
-   NEFT/IMPS transactions
-   Net banking/debit card transaction
-   ATM withdrawal

Parsers for all the above email types are written and is hence processed by Cashflowy.

**Note:** HDFC does not send an email for credit card transaction. Hence your credit card transactions will not show up on Cashflowy. We are figuring out ways to make sure that data is available on the system.

### Support for Citi Bank customers(credit card only for now)

Citi bank has another weird quirk. Citi bank sends email transactions alerts, but for bank transactions, the account number is not mentioned in the email. Hence the parsing engines cannot figure out which account to attribute that transaction to. We could set up some default account but then what if you have 2 citi bank accounts. Due to this reason, the parser for citi bank is put on the hold.

Citi bank credit card transaction contains card details. This parser is in production.

### Support for Amazon pay

Parsers for amazon pay is in place. Whether you pay on Amazon or you pay a 3rd party via Amazon pay, the parsing engine captures details and adds those transactions to your Cashflowy transactions.

### Automated snapshots

The state of your account at a given point of time is called .a snapshot. For Bank account a snapshot means balance. For credit card account, a snapshot means – how much you need to pay. Some banks/wallets share the state of the account along with the transaction. A snapshot is auto-created in this case. Eg, Automated snapshots can be created from transactions from ICICI bank, ICICI credit card, HDFC bank, Amazon pay etc.

### Unaccounted money

![[Screen-Shot-2018-11-02-at-12.38.33-AM.png]]
Cashflowy is an accounting tool. It logs what happens to your money. Currently, Cashflowy is capturing some transactions for you, but how do you know if Cashflowy is doing an exhaustive job? What if Cashflowy is missing transactions or misunderstanding transactions? How do you know if you can trust the data that Cashflowy shows you?

To answer the trust question is why – Unaccounted money is introduced. Unaccounted money is money that is not recorded in Cashflowy. Snapshots give us information on how much money your account contained at any given point of time. So if you sum the transactions between 2 snapshots and add that with the first snapshot, that figure should not be different from the 2nd snapshot. This difference is unaccounted money.

The closer unaccounted money is to zero, the more accurate your accounting is.

### Transactions are now 3 types – expense, income and transfer

![[Screen-Shot-2018-11-02-at-12.28.51-AM.png]]
Income transaction – in this case a refund on credit card

![[Screen-Shot-2018-11-02-at-12.28.30-AM.png]]
Expense transaction

![[Screen-Shot-2018-11-02-at-12.28.08-AM.png]]
Transfer of money into Paytm account from the credit card account

Until now, every transaction was considered an expense. That is not true. You moving money to Paytm from your credit card is not an expense. It is a transfer. You have not spent that money yet. Some users might consider any transfer to Paytm as a travel-related expense as they might be using it only for Uber. This case is increasingly becoming smaller as more and more physical stores support Paytm. Similarly paying credit card bill via bank account is account transfer. Making this distinction makes your accounting more accurate and meaningful.

Income transactions are also called out separately.

### Update in list transactions view

With support for additional kinds of transactions(income, expense, transfer), the UI showing transactions needed an upgrade.

## Interested in trying out cashflowy?

Write to me – alexjv89 at gmail.