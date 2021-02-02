---
title: Simple internal sitemaps
layout: layouts/post.ejs
created_at: 2019-02-21
---
# Simple internal sitemaps

![[files/image.png]]
Simple admin sitemap

What ever solution that you build, there will be some internal pages that you would be building for internal employees to do administrative work such as clean up data, manually create new user etc.  
  
The minimum functionality that you can build is to have an simple clean admin sitemap. HTML code the the above sitemap:

```
<div class='ui container'>
  <div class='ui grid'>
    <div class='sixteen wide column'>
      <div class='ui segment'>
        <h2>Admin sitemap</h2>
        <div class='ui ordered list'>
          <div class='item'>
            <div>Users and VAs</div>
            <div class='ui ordered list'>
              <a href="" class="item">List all users</a>
              <a href="" class="item">List all VAs</a>
              <a href="" class="item">Create a user or va</a>
            </div>
          </div>
          <div class='item'>
            <div>Others</div>
            <div class="ui ordered list">
              <a href="" class='item'>VA hours consumed per month</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

-   [Business Solution Stack](https://www.echoalex.com/category/business-solution-stack/)

