---
title: Bulk run command line scripts
layout: layouts/post.ejs
created_at: 2023-11-23
---
# Bulk run command line scripts

Sometimes when migrating data, we need to run a set of jobs in sequence. Sometimes we define a data engineering job to be atomic and expect to run a set of these jobs one by one in the terminal. Sure you can manually run it in the terminal. This library helps you run a series of jobs one by one and marks them as done if they executed successfully. 

E.g. Lets you have a job that fetchs data from db1 and moves them to db2. You have defined the script to fetch data from db1 one day at a time. This is for moving managable size of data and also so that you can recover from failures easily. 

```
node move_data.js --date='2023-11-01'
```
The code above fetches data for november 1st and moves it to db2. You have an automated job that runs every 5 mins that fetchs today's data(subsitute the date with today's date). Great. Something happened in your db2, maybe the structure changed, maybe there is data missing. You want to re-fetch the data for the last 30 days again. 
- do you write a new temporary script to do that?
- do you execute the job 30 times with different data variables


If you chose option 2, this library is for you. 

``` shell
# run the following commands in terminal
node move_data.js --date='2023-11-01'
node move_data.js --date='2023-11-02'
node move_data.js --date='2023-11-03'
node move_data.js --date='2023-11-04'
node move_data.js --date='2023-11-05'
node move_data.js --date='2023-11-06'
node move_data.js --date='2023-11-07'
node move_data.js --date='2023-11-08'
node move_data.js --date='2023-11-09'
node move_data.js --date='2023-11-10'
node move_data.js --date='2023-11-11'
node move_data.js --date='2023-11-12'
node move_data.js --date='2023-11-13'
node move_data.js --date='2023-11-14'
node move_data.js --date='2023-11-15'
node move_data.js --date='2023-11-16'
node move_data.js --date='2023-11-17'
node move_data.js --date='2023-11-18'
node move_data.js --date='2023-11-19'
node move_data.js --date='2023-11-20'
node move_data.js --date='2023-11-21'
node move_data.js --date='2023-11-22'
node move_data.js --date='2023-11-23'
node move_data.js --date='2023-11-24'
node move_data.js --date='2023-11-25'
node move_data.js --date='2023-11-26'
node move_data.js --date='2023-11-27'
node move_data.js --date='2023-11-28'
node move_data.js --date='2023-11-29'
node move_data.js --date='2023-11-30'

```

You can run this in your terminal. Terminal executes this and in an ideal world everything is good. Your job is done. But wait, what if your database got overloaded and failed for a few scripts. What if you lost internet connection during execution for few of the scripts. You just have to rerun the script, but keeping track of what failed and what worked is a lot of manual work. This library does that for you. 

Store this in a file as config.txt
``` shell
node move_data.js --date='2023-11-01' # run
node move_data.js --date='2023-11-02' # run
node move_data.js --date='2023-11-03' # run
node move_data.js --date='2023-11-04' # run
node move_data.js --date='2023-11-05' # run
node move_data.js --date='2023-11-06' # run
node move_data.js --date='2023-11-07' # run
node move_data.js --date='2023-11-08' # run
node move_data.js --date='2023-11-09' # run
node move_data.js --date='2023-11-10' # run
node move_data.js --date='2023-11-11' # run
node move_data.js --date='2023-11-12' # run
node move_data.js --date='2023-11-13' # run
node move_data.js --date='2023-11-14' # run
node move_data.js --date='2023-11-15' # run
node move_data.js --date='2023-11-16' # run
node move_data.js --date='2023-11-17' # run
node move_data.js --date='2023-11-18' # run
node move_data.js --date='2023-11-19' # run
node move_data.js --date='2023-11-20' # run
node move_data.js --date='2023-11-21' # run
node move_data.js --date='2023-11-22' # run
node move_data.js --date='2023-11-23' # run
node move_data.js --date='2023-11-24' # run
node move_data.js --date='2023-11-25' # run
node move_data.js --date='2023-11-26' # run
node move_data.js --date='2023-11-27' # run
node move_data.js --date='2023-11-28' # run
node move_data.js --date='2023-11-29' # run
node move_data.js --date='2023-11-30' # run
```

Run the following
`npx bulkrun config.txt`

All the line items in the `config.txt` file will be executed and the status will be updated against the line. 

## Expected output 
- run - if the line is not executed
- done - if the line was executed without failure
- failed - if the execution of the line 

What you can expect the config to be after it is run
``` shell
node move_data.js --date='2023-11-01' # done
node move_data.js --date='2023-11-02' # done
node move_data.js --date='2023-11-03' # failed
node move_data.js --date='2023-11-04' # done
node move_data.js --date='2023-11-05' # done
node move_data.js --date='2023-11-06' # done
node move_data.js --date='2023-11-07' # done
node move_data.js --date='2023-11-08' # done
node move_data.js --date='2023-11-09' # done
node move_data.js --date='2023-11-10' # failed
node move_data.js --date='2023-11-11' # failed
node move_data.js --date='2023-11-12' # failed
node move_data.js --date='2023-11-13' # done
node move_data.js --date='2023-11-14' # run
node move_data.js --date='2023-11-15' # run
node move_data.js --date='2023-11-16' # run
node move_data.js --date='2023-11-17' # run
node move_data.js --date='2023-11-18' # run
node move_data.js --date='2023-11-19' # run
node move_data.js --date='2023-11-20' # run
node move_data.js --date='2023-11-21' # run
node move_data.js --date='2023-11-22' # run
node move_data.js --date='2023-11-23' # run
node move_data.js --date='2023-11-24' # run
node move_data.js --date='2023-11-25' # run
node move_data.js --date='2023-11-26' # run
node move_data.js --date='2023-11-27' # run
node move_data.js --date='2023-11-28' # run
node move_data.js --date='2023-11-29' # run
node move_data.js --date='2023-11-30' # run
```

github repo - https://github.com/alexjv89/bulkrun
npm - https://www.npmjs.com/package/@alexjv89/bulkrun
