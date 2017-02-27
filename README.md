# React Hapi Boilerplate

#### Basic features:
1. Sign-up/Sign-in, Reset Password, User Dashboard
2. AWS SES mailer (add your keys to config)
3. Hapi JS server
4. Swagger (Hit localhost:5001/documentation)
5. Validation through Joi (Server and client)
6. FLUX implementation through Alt JS


## Installation Guide/Walkthrough:

### UBUNTU 14.04 LTS

1. Install nvm 
  `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash` 
2. Install node through nvm
  `nvm install lts/*`
3. Install yarn
  `curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -` 
   `echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list`

  `sudo apt-get update && sudo apt-get install yarn`
4. Install project dependencies
  `yarn`
5. Install Mongo DB
  `sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6`
  `echo "deb [ arch=amd64 ] http://repo.mongodb.com/apt/ubuntu trusty/mongodb-enterprise/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-enterprise.list`
  `sudo apt-get update && sudo apt-get install -y mongodb-enterprise`
  `sudo service mongod start`
    
6. Run server
  `npm start`
  
  ---
  
### MAC OSX 10 Sierra

  #####Coming Soon...

  ---
    
### GOTCHAS:
  
  * MongoDB fails to start:
      
    `sudo mkdir /data`
    `sudo mkdir /data/db`
    `sudo chown mongodb:root -R /data`
    `sudo mongod --fork --logpath /var/log/mongodb/mongodb.log`
