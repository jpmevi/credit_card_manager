<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

<p align="center">A NestJS and MySQL boilerplate for building microservices.</p>

## Description

This bolerplate use NESTJS framework, [NestJS](https://docs.nestjs.com/).

## Structure

This is the structure that is handled to make use of this boilerplate

- src
  - app
    - controller
    - dtos
    - entities
    - listeners
    - providers
    - repositories
    - services
    - transformers
    - validators
  - config
  - database

## Git Clone

To get started, **Clone** the project from the following git command.

```bash
$ git clone https://github.com/Trade-EC/NESTJS_MICROSERVICE_BOILERPLATE.git
```

## Installation

Install dependencies via npm.

```bash
$ npm install
```

## Running the database

If you need to build a local database, follow these steps:

```bash
# Run only the first time
$ mkdir docker/mysql_data

$ cd docker
$ docker network create -d bridge mynetwork
$ docker-compose up -d mysqlclient
```

## Create the .env file

In the files, there is a .env.example file, copy into .env file and change the values of variables

```bash
# Copy the .env.example
$ cp .env.example .env
```

## Create a SQS [Optional]

It can be created in AWS Account or in AWS [LocalStack](https://github.com/localstack/localstack).
_If you create in localStack, please configure endpoint in AWSProvider_

```
src/app/providers/aws/Aws.provider.ts
```

## Getting Started

Once the project is verified to be running, the **example functionality** (controller, service, entity, repository, etc.) must be deleted and development on the boilerplate must begin, respecting the layers and structure.

## Testing

All controllers must have a spec.ts file with their respective unit tests, to run the tests use the following command

```bash
# Unit testing
npm run test
# In watch mode
npm run test:watch
# In coverage mode
npm run test:co
```

## e2e Testing

```bash
# e2e testing
$ npm run test:e2e
```

## Running the app

This boilerplate has a functionality of example

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the app with a docker container

```bash
# Build the container
$ docker build -t myapp-name -f docker/Dockerfile
# Run the container locally
$ docker run --env-file .env -e TYPEORM_HOST='mysql' --network mynetwork -p {extport}:{port} myapp-name
```

As for the {port} use the same as described in the .env file, if this var is not set the default port is 3000.
We are passing TYPEORM_HOST='mysql' to override the .env file TYPEORM_HOST which is usually set to localhost.
The mysql service is called 'mysql' in the docker-compose.yml file. As for the {extport} you can use any one you
want that is not used
For example

```bash
$ docker run --env-file .env -e TYPEORM_HOST='mysql' --network mynetwork -p 3000:3000 myapp-name
# or
$ docker run --env-file .env -e TYPEORM_HOST='mysql' --network mynetwork -p 4000:3000 myapp-name
```

## Deploy to development server

To deploy to development first push your branch to your branch repo

```bash
$ git add .
$ git commit -m "type: message"
$ git push
# After that check the latest release with git tag
$ git tag
releases/0.0.1
releases/0.0.10
releases/0.0.11
releases/0.0.12
releases/0.0.13
releases/0.0.14
releases/0.0.15
releases/0.0.2
releases/0.0.3
releases/0.0.4
releases/0.0.5
# Or you could use describe to get the latest tag
$ git describe --tag
releases/0.0.15
```

So the next release probably is going to be 0.0.16

```bash
$ git tag releases/0.0.16
# Push your tag
$ git push origin --tags
```

And this will try to deploy the latest changes in the development environment in AWS ECS

## Upcoming features

<ul>
<li>[X] Static testing</li>
<li>[X] Custom validators</li>
<li>[X] Config SNS & SQS</li>
<li>[X] SQS Listeners</li>
<li>[ ] Guards</li>
<li>[X] Providers </li>
<li>[ ] Unit testing</li>
<li>[ ] Task Scheduling - Commnands</li>
<li>[X] Custom transformers</li>
<li>[X] Node in docker compose</li>
<li>[X] Github Actions</li>
<li>[ ] Repository events and observers/listeners</li>
</ul>
