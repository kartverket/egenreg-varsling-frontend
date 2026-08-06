FROM dhi.io/caddy:2@sha256:e29be2c69ea4552edea5fbeb5e81568b6e70fbaa56dec2e49863c872f18aaebc

ENV TZ=Europe/Oslo

COPY /dist /srv
COPY Caddyfile /etc/caddy/Caddyfile

USER nonroot

ENV PORT=8080

EXPOSE 8080
