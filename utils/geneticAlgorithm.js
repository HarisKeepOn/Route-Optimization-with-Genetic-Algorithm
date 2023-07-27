function initializePopulation(popSize, waypoints) {
  let population = [];
  for (let i = 0; i < popSize; i++) {
    // Keep the 0th waypoint as is and shuffle the rest
    let shuffledWaypoints = [waypoints[0]].concat(
      waypoints.slice(1).sort(() => Math.random() - 0.5)
    );
    population.push(shuffledWaypoints);
  }
  return population;
}

function calculateFitness(individual, distanceMatrix) {
  let fitness = 0;
  for (let i = 0; i < individual.length - 1; i++) {
    let originIndex = individual[i];
    let destinationIndex = individual[i + 1];
    const link = distanceMatrix.find(
      (it) => it.originIndex === originIndex && it.destinationIndex === destinationIndex
    );
    fitness += link.distanceMeters;
  }
  return fitness;
}

function rouletteWheelSelection(population, fitnesses) {
  let sum = fitnesses.reduce((a, b) => a + b, 0);
  let chosen = Math.random() * sum;
  let current = 0;
  for (let i in population) {
    current += fitnesses[i];
    if (current > chosen) {
      return population[i];
    }
  }
  return population[0]; // fallback
}

function orderCrossover(parent1, parent2) {
  let start = Math.floor(Math.random() * (parent1.length - 2)) + 2;
  let end = Math.floor(Math.random() * (parent1.length - start)) + start;
  let offspring = parent1.slice(0, 1);

  for (let gene of parent1.slice(start, end)) {
    if (!offspring.includes(gene)) offspring.push(gene);
  }
  for (let gene of parent2) {
    if (!offspring.includes(gene)) offspring.push(gene);
  }

  return offspring;
}

// Swap Mutation function
function swapMutation(individual) {
  let index1 = Math.floor(Math.random() * (individual.length - 1)) + 1;
  let index2 = Math.floor(Math.random() * (individual.length - 1)) + 1;
  // Swap elements at index1 and index2
  [individual[index1], individual[index2]] = [individual[index2], individual[index1]];
}

function geneticAlgorithm(
  cities,
  distanceMatrix,
  popSize,
  maxGenerations,
  maxGenerationsWithoutImprovement,
  stoppingCriterion
) {
  // Initialize population
  let population = initializePopulation(popSize, cities);

  // Initialize variables for stopping criterion
  let generationsWithoutImprovement = 0;
  let bestFitness = Infinity;
  let bestIndividual = null;

  // Loop for each generation
  for (let generation = 0; generation < maxGenerations; generation++) {
    // Evaluate fitness of each individual in the population

    let fitnesses = population.map((individual) => calculateFitness(individual, distanceMatrix));

    // Find the best individual from the current population
    let currentBestFitness = Math.min(...fitnesses);
    let currentBestIndividual = population[fitnesses.indexOf(currentBestFitness)];

    // Check if there is an improvement
    if (currentBestFitness < bestFitness) {
      bestFitness = currentBestFitness;
      bestIndividual = currentBestIndividual;
      generationsWithoutImprovement = 0;
    } else {
      generationsWithoutImprovement++;
    }

    // Check the stopping criterion, if applicable
    if (stoppingCriterion && generationsWithoutImprovement >= maxGenerationsWithoutImprovement) {
      break; // Terminate the algorithm since there is no improvement for too many generations
    }

    // Select individuals for next generation
    let nextGeneration = [];
    for (let i = 0; i < popSize; i++) {
      let individual = rouletteWheelSelection(population, fitnesses);
      nextGeneration.push(individual);
    }

    // Perform crossover on selected individuals
    for (let i = 0; i < popSize; i++) {
      let individual1 = nextGeneration[i];
      let individual2 = nextGeneration[(i + 1) % popSize]; // get next individual in population
      let offspring = orderCrossover(individual1, individual2);
      nextGeneration[i] = offspring;
    }

    // Perform mutation on individuals
    for (let individual of nextGeneration) {
      swapMutation(individual);
    }

    // Replace old population with new population
    population = nextGeneration;
  }

  return bestIndividual;
}

export { geneticAlgorithm, calculateFitness };
