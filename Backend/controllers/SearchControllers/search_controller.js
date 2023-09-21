import {
  SearchHistoryService,
  getSearchHistoryLimitService,
  deleteSearchHistoryByIdService,
} from "../../services/SearchServices/search_service.js";
//This controller stores a searched term on the db , if the user added it onto their favorites
export async function searchHistoryController(request, response) {
  try {
    // Call the SearchHistoryService function from the service and pass the request and response objects
    const result = await SearchHistoryService(request);
    if (result.success) {
      return response.status(200).json(result.data);
    } else {
      return response.status(400).json({ message: result.message });
    }
    // If the SearchHistoryService function returns a result, send a success response
  } catch (error) {
    console.error("Error in SearchHistoryService:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
}
// This controller will fetch those searched histories from the db
export async function getSearchHistoryLimitController(request, response) {
  try {
    // Call the getSearchHistoryLimitService function from the service and pass the request and response objects
    const result = await getSearchHistoryLimitService(request);

    // If the getSearchHistoryLimitService function returns a result, send a success response
    if (result.success) {
      return response.status(200).json(result.data);
    } else {
      return response.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error in getSearchHistoryLimitService:", error);
    return response.status(409).json({ message: "Internal server error" });
  }
}

export async function deleteSearchHistoryByIdController(request, response) {
  try {
    const result = await deleteSearchHistoryByIdService(request);
    if (result.success) {
      return response.status(200).json({ message: result.message });
    } else {
      return response.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error in getSearchHistoryLimitService:", error);
    return response.status(409).json({ message: "Internal server error" });
  }
}

export default {
  searchHistoryController,
  searchHistoryController,
  deleteSearchHistoryByIdController,
};
