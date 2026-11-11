FROM node:15

WORKDIR /babajka

ARG BABAJKA_GOOGLE_API_KEY

RUN echo $BABAJKA_GOOGLE_API_KEY

COPY bin ./bin

COPY package.json package-lock.json ./

RUN mkdir ./data

RUN npm ci # --only=production # --unsafe-perm

# Creating location to be mounted.
# RUN mkdir ./secrets

COPY . .

EXPOSE 3000

ARG WIR_ENV=production
ENV NODE_ENV=production
ARG BACKEND_URL

RUN npm run build

CMD ["npm","run","start:prod:remote","--","--port=3000","--backend-url=http://api.wir.by"]