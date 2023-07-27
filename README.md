# Route Optimization with Genetic Algorithm

This project is a web application that utilizes a Genetic Algorithm to find the optimal route for a given set of waypoints. The application is built using Node.js and Express.js for the backend, and it interacts with Google Maps Distance Matrix API and Google Maps Directions API to obtain distance data and detailed route information.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Dependencies](#dependencies)
- [License](#license)

## Introduction

The Route Optimization with Genetic Algorithm project aims to find the shortest and most efficient route between a given source location and multiple destination locations. It employs a Genetic Algorithm to evolve and optimize the routes over several generations, mimicking the natural process of evolution to find the best solution.

The genetic algorithm follows the steps of initializing a population, evaluating the fitness of each individual, selecting parents based on their fitness, applying crossover and mutation, and replacing the old population with the new one. This process continues for a specified number of generations or until a stopping criterion is met.

## Installation

To run the application locally, follow these steps:

1. Clone the repository to your local machine using Git:

```bash
git clone <repository-url>
```

2. Install the required dependencies using npm:

```bash
cd route-optimization-genetic-algorithm
npm install
```

3. Set up your environment variables:

Create a `.env` file at the root of the project and provide the required environment variables, including your Google Maps API key.

```
# .env
GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
NODE_ENV=development
PORT=3003
```

4. Run the application:

```bash
npm start
```

The application will start running on the specified port, and you can access it in your browser at `http://localhost:3003` (or the specified port).

## Usage

Once the application is up and running, you can use it to find the optimized route between a source location and multiple destination locations. Follow these steps:

1. Make a POST request to the `/api/findRoute` endpoint with the required data in the request body. The data should include the source location and an array of destination locations.

2. The application will apply the genetic algorithm to find the optimal route based on the distance data obtained from Google Maps Distance Matrix API.

3. The optimized route will be sent back in the response along with detailed route information obtained from Google Maps Directions API.

## API Endpoints

The application exposes the following API endpoint:

- **POST /api/findRoute**: This endpoint is used to find the optimized route between the source and multiple destinations using the genetic algorithm.

## Dependencies

The project uses the following main dependencies:

- Express.js: A fast and minimalist web framework for Node.js, used to build the backend server.
- Axios: A popular HTTP client used for making API calls to Google Maps services.
- dotenv: A module used for loading environment variables from a `.env` file.
- cors: Middleware that enables Cross-Origin Resource Sharing (CORS) for the Express application.

Please refer to the `package.json` file for a complete list of dependencies and their versions.

## License

This project is licensed under the [MIT License](LICENSE), which allows you to use, modify, and distribute the code freely. However, it's important to review and understand the terms and conditions of the license before using the code in any commercial or public projects.
