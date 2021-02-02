---
title: Cashflowy – Monthly update (November)
layout: layouts/post.ejs
created_at: 2018-12-10
---
# Cashflowy – Monthly update (November)


## Updates summary:

### Major:

-   First self hosting user
-   Self hosting guideline
-   Doc parser – initial implementation
-   Tags
-   Rule engine – initial implementation
-   Support more banks/credit cards
-   **First paying user** 

### Minor:

-   Bug fix – default account
-   Support for Singapore dollars
-   Highlight in yellow – “things that you need to take action on”
-   Hover over amount to see foreign currency in INR

### Stats:

-   Commits – 45
-   Customers who are actively using the product – 5
-   Self-Hosted users – 1
-   Paying users – 1
-   Commits from external users – 4 (one user)
-   Revenue – 3k
-   Expense(excluding manpower) – nil

## Details:

#### First self-hosting user

This is month where we have the first person to self host cashflowy – Alex Joseph. Alex Joseph works as a data-scientist at [System Insights](http://www.systeminsights.com/). He has been doing his personal accounting for part 5+ years, and is excited that cashflowy is open source and is try it out.

#### Self-hosting guideline

Now that we have the first person who showed interest in self hosting cashflowy, we needed a self-hosting guide. We do now – https://github.com/alexjv89/cashflowy/blob/master/docs/self\_hosting.md . If you are a developer, you should find the self-hosting guide very easy to follow.

#### Doc parser – initial implementation

This is a contribution by Akash. We have the basic tech to parse documents. Its important to parse bank statements/credit card statements for the following reasons:

1.  Some information is not available in email eg. HDFC credit card transactions
2.  For being exhaustive(all sources of data is looked into)
3.  To inspire confidence to user that the accounts are accurate

Currently ,we have doc-parser for HDFC credit card only. We use docparser.com for processing documents. This is an external service. Using this service is a little difficult when self-hosting. Alex Joseph is testing/helping with a custom build doc parser. We might also consider using the newly released AWS textract.

#### Tags

Categories are different from tags. Categories are buckets. Every expense needs to have a category. Tags are optional. Expense can have more than one tag. Tags are means to come back to something or group something together for some organizing purpose other than budgeting. Categories are dedicated for budgeting. For every other grouping purpose use tags.

Want to know the expense associated with a particular location – use tags. Want to know expenses that are experimental – use tags. Want to know the expense associated with weddings that you attended this year – use tags. Want to know expense in a particular trip – use tags.

#### Rule engine – initial implementation

This is an initial implementation of rule engine. Example of a rule – Want to categorize all transactions to uber as transport, write a rule. Rules engines are simple logic engines that you can use to automate some of your repetitive work. SBI does not have account numbers in some of their statements. Using rule engine, you can specify that if a particular type of email is parsed, and if it does not contain an account number, then you can inject an account number into the parsed data. This way, the accounting is done accurately.

This is only partly implemented. I will talk about it more in coming months.

#### Support more banks/credit cards

An an ongoing activity, as an when we come across new users who use a bank that we dont support yet, we write parsers for emails send by these banks/credit cards. This month we have parsers written for the following:

-   Yes bank credit card
-   SBI bank
-   Zerodha – auto transfer

Yes bank credit card filters was written by Alex Joseph.

#### First paying user

This is a major milestone. Cashflowy has its first paying user- [Sunil](https://www.linkedin.com/in/susundar) – a professional consultant who consults for IKP EDEN. Sunil is paying Rs 3000 per year. A lot of my focus is going to make sure he gets his money’s worth over the next year.

Cashflowy is build as a solution to scratch my own itch. I wanted an accounting solution that I can use for life. I wanted something that I can trust, something that will not sell my data. Something that can I pay for, so that the solution will have my best interest in mind both in the short term as well as in the long term. I wanted something that in a long term can nudge me into good financial habits so that my financial health is taken care of. I also wanted something that in the short term can eliminate grunt work associated with tax filing, being a consultant.

Sunil is a professional consultant such as myself. His requirements are definitely not doing to be identical to mine but there is definitely some overlap, adequate overlap to find cashflowy useful. The short term tax grunt work is something that he shares as well. So I maybe some of the value proposition that I wanted from cashflowy resonates with him as well.

Honestly, I was not expecting a paying customer so fast. I am not convinced that cashflowy is a good product yet. It has a long way to go – just to satisfy my requirements. This one customer also does not prove that cashflowy is a viable business yet. Maybe when I get the 10th paying customer, I will start considering cashflowy as something that can be a business.

I honestly think there is something special about professional consultants(PCs). Salaries folks gets predictable income. PCs have taken the first step to owning a business, to obtaining financial freedom. Grunt work associated with tax filings is one thing, but I have noticed they are also more likely to think about long term money management and wealth creation better than salaried folks. There are definitely salaried folks thinking in that direction, but the numbers are less(initial observation). Salaried folks sort of want it, but dont seem to want it enough. Not the case with professional consultants.

Cashflowy is going to focus on this market for a while unless my assumptions/deductions are proven wrong. While we improve the product and make sure that cashflowy remains a finished product for current users, I will also be looking for users similar to Sunil and myself.