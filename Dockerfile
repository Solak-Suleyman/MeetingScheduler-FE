FROM  node:20.5.0


RUN mkdir /ms-fe
WORKDIR /ms-fe

ENV PATH /msfe/node_modeules/.bin:$PATH

COPY package-lock.json /ms-fe/package-lock.json
COPY package.json /ms-fe/package.json

COPY . /ms-fe
RUN npm install





EXPOSE 3000



CMD ["npm","start"]
