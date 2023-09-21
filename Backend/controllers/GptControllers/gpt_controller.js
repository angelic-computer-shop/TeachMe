import {
  askSimpleQuestionService,
  askQuestionHumourService,
  createLessonPlanService,
  deleteLessonPlanService,
  getPlanByUserService,
  GenerateTopicsFromPlanService,
  getTopicByIDService,
  askSimpleInsideTopicService,
  updateCoveredService,
  getDaysCountService,
} from "../../services/GptServices/gpt_services.js";

// Controller that take in a service , this controller asks the open ai api a standard question
export async function askSimpleQuestionController(request, response) {
  try {
    // Call the askSimpleQuestionService function from the service and pass the request and response objects
    const result = await askSimpleQuestionService(request);
    if (result.success) {
      return response.status(200).json(result.data);
    } else {
      return response.status(400).json({ message: result.message });
    }
    // If the askSimpleQuestionService function returns a result, send a success response
  } catch (error) {
    console.error("Error in askSimpleQuestionService:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
}
// Controller that take in a service , this controller asks the open ai api a standard question, this is used inside the topic page
export async function askSimpleInsideTopicController(request, response) {
  try {
    // Call the askSimpleInsideTopicService function from the service and pass the request and response objects
    const result = await askSimpleInsideTopicService(request, response);
    if (result.success) {
      return response.status(200).json(result.data);
    } else {
      return response.status(400).json({ message: result.message });
    }
    // If the askSimpleInsideTopicService function returns a result, send a success response
  } catch (error) {
    console.error("Error in askSimpleInsideTopicService:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
}
// Controller that take in a service , this controller asks the open ai api a Humour question
export async function askQuestionHumourController(request, response) {
  try {
    // Call the askQuestionHumourService function from the service and pass the request and response objects
    const result = await askQuestionHumourService(request);
    if (result.success) {
      return response.status(200).json(result.data);
    } else {
      return response.status(400).json({ message: result.message });
    }
    // If the askQuestionHumourService function returns a result, send a success response
  } catch (error) {
    console.error("Error in askSimpleQuestionService:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
}
// Controller that take in a service ,creates a lesson plan, with the description of the lesson plan coming from the open ai api
export async function createLessonPlanController(request, response) {
  try {
    // Call the createLessonPlanService function from the service and pass the request and response objects
    const result = await createLessonPlanService(request);
    if (result.success) {
      return response.status(201).json(result.data);
    } else {
      return response.status(400).json({ message: result.message });
    }
    // If the createLessonPlanService function returns a result, send a success response
  } catch (error) {
    console.error("Error in createLessonService:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
}
// Controller that take in a service , this controller deletes a lesson plan on the database
export async function deleteLessonPlanController(request, response) {
  try {
    // Call the deleteLessonPlanService function from the service and pass the request and response objects
    const result = await deleteLessonPlanService(request);
    // If the deleteLessonPlanService function returns a result, send a success response
    if (result.success) {
      return response.status(200).json({ message: result.message });
    } else {
      return response.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error in deleteLessonPlanService:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
}
// Controller that take in a service , this controller gets the lesson plan based on the users id
export async function getPlanByUserController(request, response) {
  try {
    // Call the getPlanByUserService function from the service and pass the request and response objects
    const result = await getPlanByUserService(request);
    if (result.success) {
      return response.status(200).json(result.data);
    } else {
      return response.status(400).json({ message: result.message });
    }
    // If the getPlanByUserService function returns a result, send a success response
  } catch (error) {
    console.error("Error in getPlanByUserService:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
}
// Controller that take in a service , this controller asks the open ai to generate topics based on  a generated lesson_plan
export async function GenerateTopicsFromPlanController(request, response) {
  try {
    // Call the GenerateTopicsFromPlanService function from the service and pass the request and response objects
    const result = await GenerateTopicsFromPlanService(request);
    // If the GenerateTopicsFromPlanService function returns a result, send a success response
    if (result.success) {
      return response.status(201).json({ message: result.message });
    } else {
      return response.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error in GenerateTopicsFromPlanService:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
}

// Controller that take in a service , this controller gets topics based on the plan id
export async function getTopicByIDController(request, response) {
  try {
    // Call the getTopicByIDService function from the service and pass the request and response objects
    const result = await getTopicByIDService(request);
    // If the getTopicByIDService function returns a result, send a success response
    if (result.success) {
      return response.status(200).json(result.data);
    } else {
      return response.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error in getTopicByIDService:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
}
// Controller that take in a service , this controller updates the covered value to true, if topic is done
export async function updateCoveredController(request, response) {
  try {
    // Call the updateCoveredService function from the service and pass the request and response objects
    const result = await updateCoveredService(request);
    // If the updateCoveredService function returns a result, send a success response
    if (result.success) {
      return response.status(200).json({ message: result.message });
    } else {
      return response.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error in updateCoveredService:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
}

// Controller that take in a service , this controller increments the number of days everytime the user completes a day on the topics
export async function getDaysCountController(request, response) {
  try {
    // Call the getDaysCountService function from the service and pass the request and response objects
    const result = await getDaysCountService(request);
    // If the getDaysCountService function returns a result, send a success response
    if (result.success) {
      return response.status(200).json(result.data);
    } else {
      return response.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error in getDaysCountService:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
}
export default {
  askSimpleQuestionController,
  askQuestionHumourController,
  createLessonPlanController,
  deleteLessonPlanController,
  getPlanByUserController,
  GenerateTopicsFromPlanController,
  getTopicByIDController,
  askSimpleInsideTopicController,
  updateCoveredController,
  getDaysCountController,
};
