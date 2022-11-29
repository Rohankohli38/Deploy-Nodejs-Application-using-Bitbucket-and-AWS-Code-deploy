#!/bin/bash
cd ~/Sites/ngine
sudo yarn install
sudo yarn build
#pm2 stop all
pm2 start all