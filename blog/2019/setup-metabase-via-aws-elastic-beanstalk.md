---
title: Setup metabase via AWS elastic beanstalk
layout: layouts/post.ejs
created_at: 2019-01-08
---
# Setup metabase via AWS elastic beanstalk

1.  Create a new application on elastic beanstalk
2.  Create a new environment
    -   platform -> preconfigured platform -> docker
    -   choose single instance – optional
    -   choose t2.micro – optional
3.  Clone this repo
    -   https://github.com/alexjv89/metabase-beanstalk
    -   make changes if need (eg – ssl cert etc)
4.  eb init
5.  eb deploy
6.  Create a database
7.  Configure environment
    -   MB\_DB\_TYPE : postgres
    -   MB\_DB\_DBNAME : metabase
    -   MB\_DB\_PORT : 5432
    -   MB\_DB\_USER
    -   MB\_DB\_PASS
    -   MB\_DB\_HOST
8.  setup dns map via cloudflare – optional
9.  Modify security group to accept traffic only from cloudflare – optional