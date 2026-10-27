FROM ghcr.io/kartverket/caddy:2.11.7@sha256:9472b72d85b0e37b60dc7b314e25c37b627c7ad3ba9aa92c38c50e6a81a20a7b


ENV TZ=Europe/Oslo

COPY /dist /srv
COPY Caddyfile /etc/caddy/Caddyfile

USER nonroot

ENV PORT=8080

EXPOSE 8080
