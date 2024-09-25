

I'll try to create a more exhaustive README file by scraping information from your files. Here's an updated version:

**README.md**
================

**NestJS Scaffold Service**
---------------------------

A microservice application built using NestJS framework.

**Description**
---------------

This repository provides a basic scaffold for building a microservice application using NestJS. It includes configurations for Redis, MongoDB, PostgreSQL, and Firebase, as well as examples of how to use Kafka for event-driven architecture.

**Table of Contents**
-----------------

* [Installation](#installation)
* [Running the Application](#running-the-application)
* [Testing](#testing)
* [API Documentation](#api-documentation)
* [Environment Variables](#environment-variables)
* [License](#license)
* [Project Structure](#project-structure)
* [Modules](#modules)
* [Services](#services)
* [Controllers](#controllers)
* [Entities](#entities)
* [DTOs](#dtos)
* [Enums](#enums)
* [Interfaces](#interfaces)
* [Middlewares](#middlewares)
* [Interceptors](#interceptors)
* [Filters](#filters)
* [Configurations](#configurations)
* [Database Configurations](#database-configurations)
* [Kafka Configurations](#kafka-configurations)
* [Firebase Configurations](#firebase-configurations)

**Installation**
---------------

To install the dependencies, run the following command:

```bash
yarn install
```

**Running the Application**
---------------------------

To start the application in development mode, run:

```bash
yarn run start:dev
```

To start the application in production mode, run:

```bash
yarn run start:prod
```

**Testing**
------------

To run unit tests, use the following command:

```bash
yarn run test
```

To run end-to-end tests, use the following command:

```bash
yarn run test:e2e
```

**API Documentation**
---------------------

API documentation is available at `/api` when the application is running in non-production environments.

**Environment Variables**
-------------------------

The following environment variables are used in the application:

* `environment`: specifies the environment (e.g., production, development)
* `APP_NAME`: specifies the application name
* `FIREBASE_PROJECT_ID`: specifies the Firebase project ID
* `FIREBASE_PRIVATE_KEY`: specifies the Firebase private key
* `FIREBASE_CLIENT_EMAIL`: specifies the Firebase client email
* `FIREBASE_DATABASE_URL`: specifies the Firebase database URL
* `FIREBASE_STORAGE_BUCKET`: specifies the Firebase storage bucket
* `POSTGRES_HOST`: specifies the PostgreSQL host
* `POSTGRES_PORT`: specifies the PostgreSQL port
* `POSTGRES_USER`: specifies the PostgreSQL user
* `POSTGRES_PASSWORD`: specifies the PostgreSQL password
* `POSTGRES_DBNAME`: specifies the PostgreSQL database name
* `POSTGRES_SCHEMA`: specifies the PostgreSQL schema
* `REDIS_HOST`: specifies the Redis host
* `REDIS_PORT`: specifies the Redis port
* `REDIS_PASSWORD`: specifies the Redis password
* `MONGODB_URI`: specifies the MongoDB URI

**License**
------------

This project is licensed under the MIT License.

**Project Structure**
---------------------

The project is structured as follows:

* `src`: contains the application code
* `src/common`: contains common utilities and constants
* `src/configs`: contains configuration files
* `src/database`: contains database-related code
* `src/events`: contains event-related code
* `src/modules`: contains module-related code
* `src/providers`: contains provider-related code
* `src/services`: contains service-related code
* `test`: contains test-related code

**Modules**
------------

The following modules are used in the application:

* `ApplicationModule`: defines the application module
* `DatabaseModule`: defines the database module
* `EventConsumerModule`: defines the event consumer module
* `EventProducerModule`: defines the event producer module
* `KafkaModule`: defines the Kafka module
* `LoggerModule`: defines the logger module
* `RedisCacheModule`: defines the Redis cache module

**Services**
------------

The following services are used in the application:

* `ApplicationService`: provides application-related functionality
* `ConsumerService`: provides consumer-related functionality
* `ProducerService`: provides producer-related functionality
* `LoggerService`: provides logger-related functionality
* `ConfigService`: provides configuration-related functionality

**Controllers**
--------------

The following controllers are used in the application:

* `ApplicationController`: handles application-related requests

**Entities**
------------

The following entities are used in the application:

* `WWApplication`: defines the application entity

**DTOs**
---------

The following DTOs are used in the application:

* `CreateApplicationDto`: defines the create application DTO

**Enums**
---------

The following enums are used in the application:

* `ApplicationEventTypes`: defines the application event types
* `KafkaTopicsEnum`: defines the Kafka topics enum

**Interfaces**
--------------

The following interfaces are used in the application:

* `ApplicationEventInterface`: defines the application event interface
* `BaseEventInterface`: defines the base event interface
* `BaseKafkaEventInterface`: defines the base Kafka event interface

**Middlewares**
--------------

The following middlewares are used in the application:

* `RequestMiddleware`: handles request-related functionality

**Interceptors**
----------------

The following interceptors are used in the application:

* `LoggerErrorInterceptor`: handles logger error-related functionality
* `NewrelicInterceptor`: handles New Relic-related functionality
* `ResponseInterceptor`: handles response-related functionality

**Filters**
------------

The following filters are used in the application:

* `AllExceptionsFilter`: handles all exceptions-related functionality

**Configurations**
-----------------

The following configurations are used in the application:

* `app.config.ts`: defines the application configuration
* `server.config.ts`: defines the server configuration
* `redis.config.ts`: defines the Redis configuration
* `postgres.config.ts`: defines the PostgreSQL configuration
* `mongodb.config.ts`: defines the MongoDB configuration
* `firebase.config.ts`: defines the Firebase configuration
* `kafka.config.ts`: defines the Kafka configuration

**Database Configurations**
-------------------------

The following database configurations are used in the application:

* `postgres.config.ts`: defines the PostgreSQL configuration
* `mongodb.config.ts`: defines the MongoDB configuration

**Kafka Configurations**
----------------------

The following Kafka configurations are used in the application:

* `kafka.config.ts`: defines the Kafka configuration

**Firebase Configurations**
-------------------------

The following Firebase configurations are used in the application:

* `firebase.config.ts`: defines the Firebase configuration