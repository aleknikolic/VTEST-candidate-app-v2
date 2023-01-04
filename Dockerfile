FROM node:17.6.0 as src

COPY ./package*.json ./index.html *.js *.ts /var/app/
WORKDIR /var/app

COPY ./src ./src
COPY ./public ./public
RUN npm i pnpm -g
RUN pnpm i


FROM src as builder

ARG APP_ENV=production
RUN echo "Building app for ${APP_ENV} environment..."
COPY ./.env.${APP_ENV} ./.env

RUN export $(grep -v '^#' .env | xargs -d '\n') && npm run build

FROM amazon/aws-cli:latest

COPY --from=builder /var/app/dist /var/app/dist
