---
title: How to create a read only user?
layout: layouts/post.ejs
created_at: 2020-05-20
---
# How to create a read only user?

Posted on[Published May 20, 2020](https://www.echoalex.com/how-create-a-read-only-user/) by [alexjv89](https://www.echoalex.com/author/alexjv89/)

### Good reasons why someone wants to access db

-   Analytics tools like metabase
-   Datascience team wants access to tables

### Why create read only users?

-   Analytics tools are supposed to be used by non-developers. You dont want them to accidentally alter data
-   Only the app should alter data. Dont give people an opportunity to alter data outside of the app or via the api.

### How to

```
-- create user
CREATE USER dbreadonlyuser WITH PASSWORD 'somepass';

-- give user permission to connect to db
GRANT CONNECT ON DATABASE dbname TO dbreadonlyuser;

-- give user permission to access schema
GRANT USAGE ON SCHEMA "public" TO dbreadonlyuser;

-- grants access to all tables in this schema public for this user
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO dbreadonlyuser;

-- grants access to all future tables that you might add to the db. This way you dont want to keep running the previous command again and again when you create new table
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT ON TABLES TO dbreadonlyuser;
```

### Things to replace:

-   **dbreadonlyuser** – replace this with your choice of db user name
-   **somepass** – replace this with your choice of password
-   **dbname** – replace with the database’s name that you want to access