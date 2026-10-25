FROM dhi.io/caddy:2@sha256:341b5a19e1b7c233b9bf8836f19b5a69f8a1035373e5a59c44e01be6b536cd6b

ENV TZ=Europe/Oslo

COPY /dist /srv
COPY Caddyfile /etc/caddy/Caddyfile

USER nonroot

ENV PORT=8080

EXPOSE 8080
