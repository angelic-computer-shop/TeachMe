import {
  createUserService,
  signInUserService,
  passwordResetOTPService,
  updateUserPasswordService,
  updateUserProfileService,
  updateUserSearchedBooleanService,
} from "../../services/UserServices/user_services.js";

export async function createUserController(request, response) {
  try {
    const result = await createUserService(request);

    if (result.success) {
      return response.status(201).json(result.data); // User created successfully
    } else if (result.isconflict) {
      return response.status(409).json({ message: result.message });
    } else {
      return response.status(400).json({ message: result.message }); // Validation or business logic error
    }
  } catch (error) {
    console.error("Error in createUserController:", error);
    return response.status(500).json({ message: "Internal server error" }); // Other unexpected errors
  }
}

export async function signInUserController(request, response) {
  try {
    // Call the signInUserService function from the service and pass the request and response objects
    const result = await signInUserService(request);
    if (result.success) {
      return response.status(200).json(result.data);
    } else {
      return response.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error in signUserController:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
}

export async function passwordResetOTPController(request, response) {
  try {
    const result = await passwordResetOTPService(request);

    if (result.success) {
      return response.status(200).json(result.data); // OTP sent successfully
    } else {
      return response.status(400).json({ message: result.message }); // User does not exist or OTP sending error
    }
  } catch (error) {
    console.error("Error in passwordResetOTPController:", error);
    return response.status(500).json({ message: "Internal server error" }); // Other unexpected errors
  }
}

export async function updatePasswordController(request, response) {
  try {
    // Call the updateUserPasswordService function from the service and pass the request and response objects
    const result = await updateUserPasswordService(request);
    // If the updateUserPasswordService function returns a result, send a success response
    if (result.success) {
      return response.status(200).json({ message: result.message });
    } else {
      return response.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error in passwordResetService:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
}

export async function updateUserProfileController(request, response) {
  try {
    // Call the updateUserProfileService function from the service and pass the request and response objects
    const result = await updateUserProfileService(request);
    if (result.success) {
      return response.status(200).json({ message: result.message });
    }else{
      return response.status(400).json({message : result.message});
    }
  } catch (error) {
    console.error("Error in passwordResetService:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
}

export async function updateUserSearchedBooleanController(request, response) {
  try {
    // Call the updateUserSearchedBooleanService function from the service and pass the request and response objects
    const result = await updateUserSearchedBooleanService(request);
    if (result.success) {
      return response.status(200).json({ message: result.message });
    } else {
      return response.status(400).json({ message: result.message });
    }
    // If the updateUserSearchedBooleanService function returns a result, send a success response
  } catch (error) {
    console.error("Error in updateUserSearchedBooleanService:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
}

export default {
  createUserController,
  signInUserController,
  passwordResetOTPController,
  updatePasswordController,
  updateUserProfileController,
  updateUserSearchedBooleanController,
};
