FROM openjdk:8-jdk-alpine AS loginms
COPY BackEnd/loginmicroservices/target/loginmicroservices-0.0.1.jar loginmicroservices-0.0.1.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","loginmicroservices-0.0.1.jar"]

FROM openjdk:8-jdk-alpine AS booksms
COPY BackEnd/booksmicroservices/target/booksmicroservices-0.0.1.jar booksmicroservices-0.0.1.jar
EXPOSE 8081
ENTRYPOINT ["java","-jar","booksmicroservices-0.0.1.jar"]

# FROM node:14.9 AS frontend
# WORKDIR /FrontEnd/myfirstapp
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 3000
# CMD [ "npm", "start" ]

FROM node:10-alpine AS frontend
COPY FrontEnd/myfirstapp ./
ARG REACT_APP_S3_BUCKET_NAME
ARG REACT_APP_S3_REGION
ARG REACT_APP_S3_ACCESS_KEY_ID
ARG REACT_APP_SECRET_ACCESS_KEY
ARG REACT_APP_BOOK_URL
ARG REACT_APP_LOGIN_URL
ENV REACT_APP_HOST_IP_ADDRESS=$REACT_APP_HOST_IP_ADDRESS
ENV REACT_APP_S3_BUCKET_NAME=$REACT_APP_S3_BUCKET_NAME
ENV REACT_APP_S3_REGION=$REACT_APP_S3_REGION
ENV REACT_APP_S3_ACCESS_KEY_ID=$REACT_APP_S3_ACCESS_KEY_ID
ENV REACT_APP_SECRET_ACCESS_KEY=$REACT_APP_SECRET_ACCESS_KEY
ENV REACT_APP_BOOK_URL=$REACT_APP_BOOK_URL
ENV REACT_APP_LOGIN_URL=$REACT_APP_LOGIN_URL
RUN echo $REACT_APP_S3_BUCKET_NAME
RUN npm run build

FROM nginx:1.16.0-alpine AS nginx
COPY --from=frontend ./build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]