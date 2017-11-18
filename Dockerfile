FROM node:boron

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json ./

# TODO(uladbohdan): to consider adding --only=production option.
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
# TODO(uladbohdan): Docker must operate with production configuration.
CMD [ "npm", "run",  "dev" ]
