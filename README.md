## Prerequisites

Before running the application, ensure you have the following services running:

- **PostgreSQL**: A database server running on the host and port specified in your environment variables
- **RabbitMQ**: A message broker for handling asynchronous tasks

The application uses environment variables for configuration. You can set these in a `.env` file or in your environment:

```
# Message Queue
RABBITMQ_PROTOCOL=amqp
RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672
RABBITMQ_USERNAME=guest
RABBITMQ_PASSWORD=guest
RABBITMQ_QUEUE=test

# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=admin
DATABASE_PASSWORD=admin
DATABASE_NAME=hacker_news_analysis

# API
API_URL=https://hacker-news.firebaseio.com
API_VERSION=v0
MAX_STORIES=100

# Server
PORT=3000
ENV=development
```

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
$ npm run start
```

## Swagger

You can find swagger docs @ `http://localhost:3000/swagger` when run locally
