# Home Toolkit

This is a monorepo for a toolkit to run in your home.

## Requirements
* [Yarn](https://yarnpkg.com/) v3+
* [Docker](https://docker.com)
  
## Installation 
Clone the repository and run the following command:
```bash
$ yarn install
```

## Running the apps

```bash
# development
$ yarn dev
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Committing

Committing will go through `git-cz`. This will give you a list of options.
Here you can select what kind of change it is, and add a nicely formatted commit message.

Make sure your commit message is informative, and encapsulates everything that you've changed/added.
If you don't have enough space, it will ask you for a longer explanation later in the process. Make sure to fill this out.
