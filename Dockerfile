FROM node:boron

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json ./

# TODO(uladbohdan): to consider adding --only=production option.
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "run",  "dev" ]
