#!/bin/bash
cd ~/Sites/ngine
sudo yarn install
sudo yarn build
pm2 stop all
pm2 --name nodejsapp start npm -- start 