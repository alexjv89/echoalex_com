---
title: Redirect traffic from naked domain to www using aws s3 and cloudflare
layout: layouts/post.ejs
created_at: 2018-09-14
---
# Redirect traffic from naked domain to www using aws s3 and cloudflare

This assumes that you already have an AWS account and a Cloudflare account.

## Use case – Why bother?

You have some application server or static website running on www subdomain and you want to redirect traffic from the naked domain(eg highlyreco.com) to the www subdomain(eg www.highlyreco.com). Why? Because :

1.  When users share your domain verbally, they then to not include www. They just say – go check out highlyreco.com. When the other user tries highlyreco.com they get nothing
2.  SEO – generally you want to make sure everything is clean and all search results contain www subdomain

## Configuration on AWS

#### 1\. Click create bucket from S3 console

Click on create bucket

![](/files/Screen-Shot-2018-09-14-at-2.10.36-PM.png)

Enter the naked domain as the bucket name and select a region.

![](/files/create-bucket.png)

Under “set permissions” tab in the bucket creation process, from the “Manage public permissions” choose “Grant public read access to this bucket”

![](/files/make-bucket-public.png)

#### 2\. Enable static site hosting and redirect to www subdomain

Click on the newly created bucket. Click on the properties tab and you will see the following.

![](/files/everything-configured-1736x1004.png)

Click on Static site hosting. In the dialog box that opens, choose option – “Redirect requests”. In the input boxes enter the target www domain(eg www.highlyreco.com) and the protocol.  Copy the endpoint shown in the modal. You will need to for DNS mapping. ![](/files/static-website-hosting.png)

## Configuration on Cloudflare:

#### 1\. Add a CNAME record to your naked domain

On a regular DNS router, you cant add a “CNAME record” to a naked domain. However cloudflare supports. Cloudflare internally converts that to an “A record”. It should look this when you are done. ![](/files/cloudflare-cname-1736x98.png)

Thats it. Your naked domain(highlyreco.com) will now redirect to (www.highlyreco.com).