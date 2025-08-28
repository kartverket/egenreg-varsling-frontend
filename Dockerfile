FROM caddy:2.10.2-alpine
RUN apk update && apk upgrade

ENV USER_ID=150 \
    USER_NAME=apprunner \
    TZ=Europe/Oslo

RUN addgroup -g ${USER_ID} ${USER_NAME} \
    && adduser -u ${USER_ID} -G ${USER_NAME} -D ${USER_NAME}

COPY --chown=${USER_ID}:${USER_ID} /dist /srv
COPY --chown=${USER_ID}:${USER_ID} Caddyfile /etc/caddy/Caddyfile

USER ${USER_NAME}

ENV PORT=8080

EXPOSE 8080