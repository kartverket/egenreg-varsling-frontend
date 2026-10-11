FROM dhi.io/caddy:2@sha256:839a9da71f1a1b3e0c604f6240ad32cf00eadd70628734b1c60ad073545ca514

ENV TZ=Europe/Oslo

COPY /dist /srv
COPY Caddyfile /etc/caddy/Caddyfile

USER nonroot

ENV PORT=8080

EXPOSE 8080
