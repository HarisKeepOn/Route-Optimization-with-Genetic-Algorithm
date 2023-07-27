import AxiosInstance from "../utils/axiosConfig.js";

const DistanceMatrixService = async (data) => {
  try {
    const response = await AxiosInstance.post("distanceMatrix/v2:computeRouteMatrix", data, {
      headers: {
        "X-Goog-FieldMask": "originIndex,destinationIndex,distanceMeters"
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const RoutesService = async (data) => {
  try {
    const response = await AxiosInstance.post("directions/v2:computeRoutes", data, {
      headers: {
        "X-Goog-FieldMask":
          "routes.optimizedIntermediateWaypointIndex,routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline"
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { DistanceMatrixService, RoutesService };
