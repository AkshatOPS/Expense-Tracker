# Stage 1: Build
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
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["npm", "start"]
