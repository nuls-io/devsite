FROM node
COPY dist /doc_site
RUN npm install -g http-server  

WORKDIR /doc_site

CMD ["http-server"]

RUN echo "successfully build nuls image"