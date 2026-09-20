FROM dhi.io/caddy:2@sha256:1b40b4f43bbfada63b22431ec6fec48b50e212abfc1cc5e645948483a656ddcc

ENV TZ=Europe/Oslo

COPY /dist /srv
COPY Caddyfile /etc/caddy/Caddyfile

USER nonroot

ENV PORT=8080

EXPOSE 8080
