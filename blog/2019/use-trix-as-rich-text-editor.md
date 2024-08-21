---
title: Use trix as rich text editor
layout: layouts/post.ejs
created_at: 2019-02-20
---
# Use trix as rich text editor


![[E968876E-1ADC-4F82-AF1B-309209431FE6.png]]
Trix used with semantic ui

Semantic UI does not support a native wysiwyg. [Trix](https://github.com/basecamp/trix) by [Basecamp team](https://basecamp.com/) is a very elegant rich text editor (wysiwyg).

Use the [sails-business-stack-generator](https://www.npmjs.com/package/sails-business-stack-generator) to install trix in your sails project.

Sample code for using trix.

```
<div class="field">
    <label>Summary of work for this subscription</label>
    <input id='report_body' type="hidden" name="report_body" placeholder="write your summary here" value="<%=dr.body%>">
    <trix-editor input="report_body"></trix-editor>
</div>
```

Things to note about the above code – 1) trix editor has an attribute called input. This should be the id of the input element on which the trix editor is applied. 2) Also make sure that this page includes the trix js and trix css.

```
<link rel='stylesheet' type='text/css' href='/trix/trix.css'> 			
<script type='text/javascript' src='/trix/trix.js'></script> 	
```

This post is part of the business solution stack series