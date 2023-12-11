FROM node:20.9.0-alpine

ARG WORK_DIR=/graph.token.gateway

RUN mkdir ${WORK_DIR}
WORKDIR ${WORK_DIR}

COPY package.json ${WORK_DIR}
COPY package-lock.json ${WORK_DIR}

RUN npm install

COPY . ${WORK_DIR}

EXPOSE 3000

CMD [ "node", "index.js"]  