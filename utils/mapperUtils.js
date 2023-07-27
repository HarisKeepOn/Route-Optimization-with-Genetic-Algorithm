// Remove items with no distanceMeters
const filterDistanceMatrix = (unfilteredDistanceMatrix) =>
  unfilteredDistanceMatrix.filter((item) => item.distanceMeters);

const getWayPointsIndices = (distanceArray) => {
  const waypointsIndices = new Set();
  for (const { originIndex } of distanceArray) {
    waypointsIndices.add(originIndex);
  }
  // sort ascending order
  return Array.from(waypointsIndices).sort((a, b) => a - b);
};

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

const addWaypointAndExtractData = (inputJSON) => {
  // Add the waypoint object to each location in both source and destinations
  const addWaypointToObject = (obj) => {
    const { latitude, longitude } = obj.location.latLng;
    obj.waypoint = { location: { latLng: { latitude, longitude } } };
    delete obj.location;
  };

  addWaypointToObject(inputJSON.source);
  inputJSON.destinations.forEach(addWaypointToObject);

  // Extract origins and destinations arrays
  const origins = [inputJSON.source, ...inputJSON.destinations];
  const destinations = deepCopy(origins);
  const travelMode = "DRIVE";
  const routingPreference = "TRAFFIC_AWARE";

  return { origins, destinations, travelMode, routingPreference };
};

const SortDestination = (bestRoute, data) => {
  // sort only 1 to 14
  const sortedDestinations = [];
  bestRoute.map((item, index) => {
    if (index !== 0) {
      sortedDestinations.push(data.destinations[item - 1]);
    }
  });
  return sortedDestinations;
};

const transformRoutes = (bestRoute, data) => {
  const sortedDestinations = SortDestination(bestRoute, data);
  const source = data.source;
  const length = sortedDestinations.length;
  const body = {
    origin: source,
    destination: sortedDestinations[length - 1],
    intermediates: sortedDestinations.slice(0, length - 1),
    optimizeWaypointOrder: true,
    travelMode: "DRIVE",
    routingPreference: "TRAFFIC_AWARE",
    computeAlternativeRoutes: false,
    languageCode: "en-US"
  };

  return body;
};

export {
  filterDistanceMatrix,
  getWayPointsIndices,
  deepCopy,
  addWaypointAndExtractData,
  transformRoutes
};
