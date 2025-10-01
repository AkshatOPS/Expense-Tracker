FROM node:20-alpine AS builder

WORKDIR /app


COPY package.json package-lock.json* ./
RUN npm install


COPY . .


RUN npx prisma generate


RUN npm run build


# Stage 2: Run
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

COPY package.json package-lock.json* ./
RUN npm install --omit=dev


COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/@prisma/client /app/node_modules/@prisma/client
COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=builder /app/prisma/dev.db ./prisma/dev.db
COPY .env .env
RUN chown -R node:node /app/prisma && chmod -R u+rw /app/prisma

EXPOSE 3000

CMD ["npm", "start"] 