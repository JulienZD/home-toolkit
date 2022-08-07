# Toolkit Backend
A [NestJS](https://nestjs.com/) backend which uses [Prisma](https://prisma.io) to interact with a PostgreSQL database.

## Installation

```bash
$ yarn install
```

Setup your environment values
```bash
$ cp .env.example .env
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
