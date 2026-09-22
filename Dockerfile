FROM php:8.3-fpm-alpine

RUN apk add --no-cache nginx \
    && mkdir -p /run/nginx /var/cache/nginx/client_temp \
    && chown -R nginx:nginx /var/cache/nginx /run/nginx

RUN rm -f /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx-main.conf /etc/nginx/nginx.conf
COPY index.html *.jpg *.jpeg *.png *.webp /usr/share/nginx/html/
COPY Html/ /usr/share/nginx/html/Html/

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:8080/ || exit 1

CMD ["sh", "-c", "php-fpm -D && nginx -g 'daemon off;'"]