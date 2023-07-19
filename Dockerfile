FROM node:18.16.0-alpine as builder
RUN mkdir /cooking-together
WORKDIR /cooking-together
COPY . .
RUN npm install --force
RUN npm run build
RUN cd build
RUN npm ci --production --force

FROM node:18.16.0-alpine
RUN mkdir /cooking-together
WORKDIR /cooking-together
COPY --from=builder /cooking-together/build ./build
COPY .env ./build/.env
COPY package.json package.json
COPY prisma ./build/prisma
RUN npm install --only-production --force
RUN npx prisma generate --schema=build/prisma/schema.prisma
EXPOSE $PORT
ENTRYPOINT ["npm", "run", "start"]