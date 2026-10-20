FROM dhi.io/caddy:2@sha256:6cff7cb12f5fce38d05d92677f45af923661ff185aa6e1e72505a09cb6882201

ENV TZ=Europe/Oslo

COPY /dist /srv
COPY Caddyfile /etc/caddy/Caddyfile

USER nonroot

ENV PORT=8080

EXPOSE 8080
