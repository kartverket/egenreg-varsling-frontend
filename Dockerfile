FROM dhi.io/caddy:2@sha256:840c0df5f0e30e0845ab63fff6dd5da8ebbcb8416054848dfa18924f490a358b

ENV TZ=Europe/Oslo

COPY /dist /srv
COPY Caddyfile /etc/caddy/Caddyfile

USER nonroot

ENV PORT=8080

EXPOSE 8080
