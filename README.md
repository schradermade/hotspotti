# Hotspotti

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![NestJS](https://img.shields.io/badge/NestJS-10.0.0-red.svg)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.1.3-blue.svg)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED.svg)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Enabled-326CE5.svg)](https://kubernetes.io/)

A modern, microservices-based application built with NestJS, TypeScript, and Kubernetes.

## 🚀 Features

- **Microservices Architecture**: Built with scalability and maintainability in mind
- **Authentication Service**: Secure JWT-based authentication system
- **User Service**: Comprehensive user management
- **Spotti Service**: Core business logic implementation
- **Hub Service**: Central communication and coordination
- **Kubernetes Ready**: Fully containerized with Kubernetes deployment configurations
- **Development Tools**: Skaffold integration for streamlined development workflow

## 🏗️ Architecture

The application is built using a microservices architecture with the following main components:

- **Auth Service**: Handles user authentication and authorization
- **User Service**: Manages user profiles and related operations
- **Spotti Service**: Implements core business functionality
- **Hub Service**: Coordinates communication between services
- **Common Library**: Shared code and utilities

## 🛠️ Tech Stack

- **Backend Framework**: NestJS
- **Language**: TypeScript
- **Database**: TypeORM with SQLite
- **Authentication**: Passport.js with JWT
- **API Documentation**: Swagger/OpenAPI
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **Development**: Skaffold

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Docker
- Kubernetes (Minikube or similar)
- Skaffold

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/hotspotti.git
cd hotspotti
```

2. Install dependencies for all services:

```bash
# Install dependencies for each service
cd auth && npm install
cd ../user && npm install
cd ../spotti && npm install
cd ../hub && npm install
```

3. Start the development environment:

```bash
skaffold dev
```

## 🔧 Development

The project uses Skaffold for development workflow. The configuration in `skaffold.yaml` enables:

- Automatic container building
- Live reload for development
- Kubernetes manifest deployment
- File synchronization for rapid development

### Service Structure

Each service follows a similar structure:

```
service/
├── src/
├── test/
├── Dockerfile
├── package.json
├── tsconfig.json
└── README.md
```

## 📚 API Documentation

API documentation is available through Swagger UI when running the services:

- Auth Service: `http://localhost:3000/api`
- User Service: `http://localhost:3001/api`
- Spotti Service: `http://localhost:3002/api`
- Hub Service: `http://localhost:3003/api`

## 🧪 Testing

Each service includes unit and e2e tests. To run tests:

```bash
# Unit tests
npm test

# e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🚀 Deployment

The application is configured for Kubernetes deployment. Use the following steps:

1. Build the Docker images:

```bash
skaffold build
```

2. Deploy to Kubernetes:

```bash
skaffold run
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- NestJS team for the amazing framework
- Kubernetes community for container orchestration
- All contributors who have helped shape this project

---

Made with ❤️ by the Hotspotti team
