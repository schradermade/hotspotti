<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

DOCKER
docker build --platform linux/amd64 --no-cache -t 626411624502.dkr.ecr.us-west-2.amazonaws.com/hotspotti/spotti:latest .
docker push 626411624502.dkr.ecr.us-west-2.amazonaws.com/hotspotti/spotti:latest

Authenticate with AWS ECR:
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 626411624502.dkr.ecr.us-west-2.amazonaws.com

TEST MESSAGE - AWS SQS:
{
"entityType": "Spotti",
"eventType": "SpottiCreated",
"payload": {
"name": "Bamboo Sushi",
"description": "Bamboo Sushi in Lake Oswego is the go-to spot for fresh, sustainable sushi with a chill vibe. It’s where locals come for top-notch rolls, sashimi, and creative small plates, all while supporting eco-friendly practices. Perfect for a laid-back night out or special occasion with friends.",
"locationId": "92",
"category": "Dining",
"rating": 4.7,
"tags": [
"Hidden Gem",
"Popular",
"Local Favorite",
"Indoor"
],
"pictures": [
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJJMZg3oUlj6j_qzwW4bqWEJvoJhaFn-NxGQ&s",
"https://image.resy.com/3/003/2/4229/5052ec54ec55814ca4d7f5390b7fe55f5687acf1/jpg/1:1/1600",
"https://cdn.sanity.io/images/njo473vo/production/d9d06819123dd57c3a933167fc36c02ac15a0439-3600x2400.jpg",
"https://images.otstatic.com/prod/27683493/3/large.jpg",
"https://cdn.sanity.io/images/njo473vo/production/f3913148b0297d3b655318a598179cc01e906bd5-6500x5200.jpg?auto=format&fit=max&q=75&w=3250",
"https://cdn.sanity.io/images/njo473vo/production/b9ec4a6f323a7de72f7b6097a04843aa002da806-1200x1200.jpg"
],
"bestTimeToVisit": "Evening"
}
}

DOCKER
docker build --platform linux/amd64 --no-cache -t 626411624502.dkr.ecr.us-west-2.amazonaws.com/hotspotti/auth:latest .
docker push 626411624502.dkr.ecr.us-west-2.amazonaws.com/hotspotti/auth:latest

Authenticate with AWS ECR:
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 626411624502.dkr.ecr.us-west-2.amazonaws.com

SCALE AWS SERVICES UP/DOWN
kubectl scale deployment <your-deployment-name> --replicas=0
kubectl scale deployment <your-deployment-name> --replicas=<desired-replicas>
