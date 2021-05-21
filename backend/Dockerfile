FROM mhart/alpine-node:12

# create app directory and use it as the working directory
RUN mkdir -p /srv/app/backend
WORKDIR /srv/app/backend

COPY package.json /srv/app/backend
COPY package-lock.json /srv/app/backend

RUN npm install

COPY . /srv/app/backend

CMD ["npm", "start"]
