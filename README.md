# Building Scalable Microservices with Apache Kafka and Docker Compose

## Introduction

Microservices architecture has become the go-to approach for building scalable and maintainable applications. It involves decomposing a monolithic application into small, independent services that are loosely coupled and can be deployed and scaled independently. However, the success of microservices architecture heavily depends on efficient inter-service communication.

In a distributed system, where services must communicate frequently, it is crucial to have a reliable, scalable, and low-latency communication mechanism. This is where Apache Kafka comes in—a distributed streaming platform designed for building real-time data pipelines and streaming applications.

This project explores how to set up a scalable microservices architecture using Apache Kafka and Docker Compose. We'll create a simple real-time order processing system to demonstrate the concepts, complete with:
- A producer microservice that sends orders to a Kafka topic.
- A consumer microservice that processes those orders.
- A frontend microservice that displays those orders.

## Setting Up the Environment

Before we dive into creating microservices and the Kafka setup, let's understand the tools and technologies used in this project:

- **Apache Kafka**: A distributed streaming platform that enables real-time data processing and inter-service communication in a microservices architecture.
- **Zookeeper**: Kafka relies on Zookeeper to manage and coordinate Kafka brokers.
- **Docker Compose**: A tool for defining and running multi-container Docker applications. It simplifies the process of setting up and managing multiple services required for development.

## Overview of Required Components

The `docker-compose.yml` file defines the services for Kafka, Zookeeper, and the microservices (producer, consumer, and frontend microservices). The following components are included:

- **Zookeeper**: To coordinate Kafka brokers.
- **Kafka**: To manage the messaging between services.
- **Producer Microservice (producer)**: Sends messages (orders) to Kafka.
- **Consumer Microservice (backend-server)**: Consumes messages sent from Kafka and processes them. Here, we have a simple Node.js server that connects to Kafka and exposes a WebSocket API where the frontend microservice can connect.
- **Frontend Microservice (web)**: Provides a user interface to list messages consumed by the Consumer Microservice.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Ensure you have the following installed on your local machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (v14 or higher)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/shashikhanal/realtime-order-processing-microservices.git
	```

2. **Navigate to the project directory:**

   ```bash
   cd realtime-order-processing-microservices
	```

### Testing the Microservices Architecture

1. **Build with Docker Compose:**

   ```bash
   docker-compose up --build
	```

2. **To trigger the Producer (Order) Microservice to send an order to Kafka:**

	```bash
	 curl -X POST http://localhost:4000/send \
     -H "Content-Type: application/x-www-form-urlencoded" \
     --data-urlencode "message=Message from producer!"
	```

3. **Check the Web UI in Frontend Microservice to verify that it received the order from Kafka:**

	```bash
	 http://localhost:80/
	```

4. **Run the following to bring down the services:**

	```bash
	 docker-compose down
	```

## Contributing

Contributions are welcome! Please follow the standard GitHub workflow:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push them to your fork.
4. Open a pull request and describe your changes.

## License
This project is licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0). See the LICENSE file for details.

## Contact

For any inquiries or issues, feel free to open an issue on GitHub or contact the repository owner directly.