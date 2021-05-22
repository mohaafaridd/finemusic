FROM node:12-alpine as dev

WORKDIR /home/app/

ENV NODE_ENV=development

COPY package*.json ./

RUN npm install --silent

COPY . .

#--------- production -----------

FROM dev as production

RUN rm -rf ./dist

ENV NODE_ENV=production

CMD ["npm","start"]
