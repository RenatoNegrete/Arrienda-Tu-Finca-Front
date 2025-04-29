# Etapa 1: build Angular app
FROM node:18.19.1 AS builder

WORKDIR /app

COPY ./ /app

RUN npm install --legacy-peer-deps \
    && npm install -g @angular/cli \
    && ng build

RUN ls -la /app/dist

# Etapa 2: servir con Apache
FROM httpd:2.4

COPY ./k8s/my-httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./k8s/htaccess /usr/local/apache2/htdocs/

COPY --from=builder /app/dist/test1/browser/ /usr/local/apache2/htdocs/


EXPOSE 80
CMD ["httpd", "-D", "FOREGROUND"]
