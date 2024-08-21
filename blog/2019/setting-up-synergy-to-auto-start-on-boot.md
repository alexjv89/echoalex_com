---
title: Setting up synergy to auto start on boot
layout: layouts/post.ejs
created_at: 2019-01-13
---
# Setting up synergy to auto start on boot


Refer somewhere to figure out to run a file on server boot. Assuming the file is called kiosk.sh, add the following lines to kiosk.sh to start synergy on boot

```shell
killall synergyc
sleep 1
#synergyc --name pi1 192.168.1.101 #without tls
synergyc --name pi1 --enable-crypto 192.168.1.101 #with tls
exit 0
```