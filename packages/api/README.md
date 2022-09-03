# Toolkit Backend
A [NestJS](https://nestjs.com/) backend which uses [Prisma](https://prisma.io) to interact with a PostgreSQL database.

## Installation

```bash
$ yarn install
```

Setup your environment variables
```bash
$ cp .env.example .env # Used for Prisma
$ cp /config/default.example.json5 /config/default.json5 # Used for all other values
```

Setup the database
```bash
$ yarn prisma db push
```

## Running the app

```bash
# Development
$ yarn dev

# Build the project
$ yarn build

# Production mode
$ yarn start
```

## Test

```bash
# Unit tests
$ yarn test

# E2E tests
$ yarn test:e2e

# Test coverage
$ yarn test:cov
```
