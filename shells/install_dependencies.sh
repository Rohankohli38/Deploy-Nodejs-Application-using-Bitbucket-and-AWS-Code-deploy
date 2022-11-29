#!/bin/bash

# Go to app folder
cd /home/ubuntu/Sites

# Installing dependencies with npm
sudo apt install npm -y
sudo apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt update -y
sudo apt -y install nodejs
sudo apt -y install nodejs
sudo apt install curl -y 
curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" |
sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update -y
sudo apt -y install yarn
sudo apt install --no-install-recommends yarn -y
sudo npm install forever -g
sudo npm install pm2 -g
sudo npm install pm2 -g
