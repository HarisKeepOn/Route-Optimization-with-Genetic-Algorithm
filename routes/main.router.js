import { DistanceMatrixService, RoutesService } from "../api/apiServices.js";
import {
  addWaypointAndExtractData,
  deepCopy,
  filterDistanceMatrix,
  getWayPointsIndices,
  transformRoutes
} from "../utils/mapperUtils.js";
import { calculateFitness, geneticAlgorithm } from "../utils/geneticAlgorithm.js";

import express from "express";

var router = express.Router();

router.post("/findRoute", async (req, res) => {
  try {
    const data = req.body;

    const savedData = deepCopy(data);
    const distanceMatrixBody = addWaypointAndExtractData(data);

    const response = await DistanceMatrixService(distanceMatrixBody);

    const POPULATION_SIZE = 50;
    const MAX_GENERATIONS = 5000;
    const MAX_GENERATIONS_WITHOUT_IMPROVEMENT = 50;
    const STOPPING_CRITERION = false;

    const distanceMatrix = filterDistanceMatrix(response);
    const Labels = getWayPointsIndices(distanceMatrix);

    const bestRoute = geneticAlgorithm(
      Labels,
      distanceMatrix,
      POPULATION_SIZE,
      MAX_GENERATIONS,
      MAX_GENERATIONS_WITHOUT_IMPROVEMENT,
      STOPPING_CRITERION
    );

    const routesResponse = await RoutesService(transformRoutes(bestRoute, savedData));

    res.status(200).json({
      message: "Success",
      data: routesResponse
      //bestRoute,
      //calculateFitness: calculateFitness(bestRoute, distanceMatrix)
    });
  } catch (error) {
    // Handle any errors that occur during the API call
    res.status(500).json({
      message: "Error",
      error: error.message
    });
  }
});

export default router;
