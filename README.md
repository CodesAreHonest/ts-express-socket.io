# WebSocket API with Express Typescript
> A boilerplate to develop realtime and event-based API to perform **broadcasting** and **real-time data transfer** with Socket.io on Express written in TypeScript and Redis. 

***

Table Of Contents 
=================

  * [About The Project](#about-the-project)
    * [File Structure](#file-structure)
  * [Motivation](#motivation)
  * [Technical Discussion](#technical-discussion)
  * [Limitation](#limitation)
  * [Getting Started](#getting-started)
    * [Installation](#installation)
      * [Running in Development](#running-in-development)
      * [Running in Production](#running-in-production)
  * [Tools and Technologies](#tool-and-technologies)
  * [About](#about)
    * [Author](#author)
    * [License](#license)

***

About The Project
=================
The project focus on implementation of Socket.io Server's library features to develop an **independent, maintainable and deployable** bidirectional communication microservices secured with OAuth 2.0 authorization protocol. The services **provide backend APIs** for other services from different projects to emit or broadcast their data to the mentioned clients and **allow desktop browser, mobile browser or native mobile application to listen on the socket** to receive the emitted data based on events or connection. 

File structure
-----------------

```
src/
├── api/                 => websocket APIs with three-tiers architecture
|   ├── controllers/        => presentation layer, accept input and provide outputs
|   ├── middlewares/        => filter HTTP request before enter controllers
|   ├── models/             => data layers: mongoose
|   ├── services/           => business layers with business logics
|   ├── validations/        => well-defined rules for provided inputs
|   ├── routes.ts           => route the request to associated controllers
├── common/              => resource shared among the projects
|   ├── interfaces/         => define the specification of types or entity
|   ├── config.ts           => environment configurations with .env (dotenv)
|   ├── constants.ts        => enums
|   ├── types.ts            => data types
├── loaders/             => bootstrapping with inversion of control
|   ├── ExpressServer.ts    => start express server configurations
|   ├── index.ts            => boot express, redis and socket.io 
|   ├── RedisServer.ts      => start redis server configurations
|   ├── SocketServer.ts     => socket server configurations
├── responses/           => HTTP responses custom error handler
|   ├── clientErrors/       => error code between 400 - 499
|   ├── serverErrors/       => error code 500 and above
|   ├── successful/         => successful responses
|   ├── ErrorHandler.ts     => middleware for center point of exception handling
├── utils/               => utilities for entire project 
└── server.ts            => entry point of node to start the project 

```

*** 

Motivation
==========
In software development process, several projects may required to perform broadcasting or real time data transfer with WebSocket module. However, it's pretty time and resource consuming for an organization to allow various team to research and develop their own WebSocket module. 

Therefore, a Socket API microservices is developed and maintain independently to enabled multiple teams or project to make use of a single service managed by small team of developers with exclusive knowledge on WebSocket. 

*** 

Technical Discussion
====================

The project is designed with three-tiers architecture, inversion of controls (IOC) and coherent with SOLID principle to establish a maintainable and extensible codebase for perfective and corrective maintenance.

OAuth 2.0 security protocol with password grant is selected to prevent unauthorized access onto the APIs and listen to the Socket.io's URL protocol. The services required public key provided from authorization server to verify the *Signature of Tokens* given by Client or Resource Owner. 

Typescript programming language with ES6 features or above is used to develop the project to increase greater discipline to saturate the codebase with strict type checking, better code structuring and object-oriented programming techniques. 

Docker Compose is use for define and running both Express Server and Redis in-memory database containers to build the service. The compose file consists of development and production version for developers help improve compatibility and standardization of development and production environment.

*** 

Limitation
==========
* [ ] Multiple environment (development and production) for Socket Server
* [ ] Multiple environment (development and production) for Express Server
* [ ] Test case configuration for Typescript (Jest)
* [ ] Lack of index.d.ts file for entire project

Getting Started
===============

Running in Development
----------------------
1. Start the development environment with `docker-compose` and verify the running status.
```docker
$ docker-compose -f docker-compose.yml up -d
```

2. Verify the running status
```docker
$ docker container ls
xxxxxxxxxxxx        ts-express-socketio_socket   "docker-entrypoint.s…"   3 minutes ago       Up 3 minutes        0.0.0.0:8080->8080/tcp   ts-express-socketio_socket_1
xxxxxxxxxxxx        redis:alpine                 "docker-entrypoint.s…"   3 minutes ago       Up 3 minutes        6379/tcp                 ts-express-socketio_redis_1
``` 

Running in Production
---------------------
1. Docker Swarm Initialization 
```docker
$ docker swarm init --advertise-addr <your ip address>
```

2. Deploy into Docker Swarm
```docker
$ docker stack deploy --compose-file docker-compose.prod.yml socket-with-redis
```

3. Verify the running status
```docker
$ docker service ls
ID                  NAME                       MODE                REPLICAS            IMAGE                               PORTS
xxxxxxxxxxxx        socket-with-redis_redis    replicated          1/1                 redis:alpine                        
xxxxxxxxxxxx        socket-with-redis_socket   global              1/1                 ts-express-socketio_socket:latest   *:8000->8000/tcp
``` 

Tool and Technologies
=====================
1. Linux Ubuntu 20.04 LTS (Focal Fossa) AMD64 Desktop OS
2. Express Server 4.17.1 
3. NodeJS v10.19.0 
4. Typescript v3.8.3
5. Socket.io v2.3.0
6. Redis v3.0.2 

About
=====
Author
------
- Yinghua Chai

License
-------
This project does not contain any license.







