import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import client from "../../configuration/database/database_configuration.js";
import secret from "../../configuration/secrets/jwt_secret.js";
import transporter from "../../configuration/communication/email_configurations.js";
import { request } from "express";

async function emailExists(email) {
  try {
    const emailQuery = {
      text: "SELECT * FROM users WHERE email = $1",
      values: [email],
    };
    const emailResult = await client.query(emailQuery);
    if (emailResult && emailResult.rows.length > 0) {
      return emailResult.rows[0];
    }
  } catch (error) {
    console.error("Error checking user existence:", error);
    throw error;
  }
}

export async function isValidPassword(password) {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!#$%^&*()\-_=+\\|[\]{};:'",.<>/?])[A-Za-z\d@!#$%^&*()\-_=+\\|[\]{};:'",.<>/?]{8,}$/;
  return passwordRegex.test(password);
}

export async function isValidName(name) {
  const nameAndUsernameRegex = /^.{3,}$/;
  return nameAndUsernameRegex.test(name);
}

export async function createUserService(request) {
  const {
    name,
    surname,
    email,
    age,
    password,
    profile_picture,
    contact_number,
    created_date,
    updated_date,
  } = request.body;

  const result = { success: false, data: null, message: "", isconflict: false };

  if (surname === null || surname === undefined) {
    result.message = "Surname is required";
    return result;
  }

  const emailRegularExpression = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegularExpression.test(email)) {
    result.message = "Email is not the right format required";
    return result;
  }

  const isPassValid = await isValidPassword(password);
  if (!isPassValid) {
    result.message =
      "The password needs to have atleast 8 Characters, One special character, and atleast one number";
    return result;
  }

  const isValidNameCheck = await isValidName(name);

  if (!isValidNameCheck) {
    result.message = "name must be atleast 3 Characters";
    return result;
  }

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    const exists = await emailExists(email);
    if (exists) {
      result.isconflict = true;
      result.message = "User already exists";
      return result;
    }

    const insertQuery = {
      text: "INSERT INTO users (name, surname, email, age, password, profile_picture, contact_number, created_date, updated_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      values: [
        name,
        surname,
        email,
        age,
        hashedPassword,
        profile_picture,
        contact_number,
        created_date,
        updated_date,
      ],
    };

    const results = await client.query(insertQuery);
    result.success = true;
    result.data = results.rows;
    return result;
  } catch (error) {
    console.error("Error saving user to the database:", error);
    result.message = "Error saving user to the database";
    return result;
  }
}

export async function signInUserService(request) {
  const { email, password } = request.body;
  const result = { success: false, data: null, message: "" };

  try {
    const insertQuery = {
      text: "SELECT * FROM users WHERE email = $1 ",
      values: [email],
    };

    const results = await client.query(insertQuery);

    if (results.rows.length === 0) {
      result.message = "User not found";
      return result;
    }

    const userPassword = results.rows[0].password;
    const isPasswordValid = bcrypt.compareSync(password, userPassword);

    if (isPasswordValid) {
      const token = jwt.sign({ id: results.rows[0].user_id }, secret, {
        expiresIn: 86400,
      });
      result.success = true;
      result.data = {
        email: email,
        name: results.rows[0].name,
        surname: results.rows[0].surname,
        userId: results.rows[0].user_id,
        age: results.rows[0].age,
        searchedbefore: results.rows[0].searchedbefore,
        contact_number: results.rows[0].contact_number,
        profile_picture: results.rows[0].profile_picture,
        token: token,
      };
    } else {
      result.message = "Credentials are not correct";
    }
  } catch (error) {
    console.error(error);
    result.message = "Error signing the user";
  }

  return result;
}

export async function passwordResetOTPService(request) {
  const { email } = request.body;
  const result = { success: false, data: null, message: "" };

  try {
    const exists = await emailExists(email);
    if (!exists) {
      result.message = "User does not exist";
      return result;
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    const mailConfigurations = {
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: "Forgot Password OTP",
      // This would be the text of email body
      html:
        "<h1>Your Password Reset OTP:</h1><br/>" +
        email +
        `<p>Your password reset OTP is : <strong>${otp}</strong><br/><br/>
                       Made with ❤️ By BankLingo.</p>`,
    };

    transporter.sendMail(mailConfigurations, function (error, info) {
      if (error) {
        result.message = "Error sending OTP";
        throw error;
      }
    
    });

    result.success = true;
    result.data = {
      email: exists.email,
      number: otp,
      user: exists.user_id,
    };
    return result;
  } catch (error) {
    console.error("Error sending OTP", error);
    result.message = "Error sending OTP";
    throw error;
  }
}

export async function updateUserPasswordService(request) {
  const user_id = parseInt(request.params.id);
  const { password } = request.body;
  const result = { success: false, data: null, message: "" };
  const isPassValid = await isValidPassword(password);
  if (!isPassValid) {
    result.message =
      "The password needs to have atleast 8 Characters, One special character, and atleast one number";
    return result;
  }
  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hashedPassword = await bcrypt.hashSync(password, salt);

  if (isNaN(user_id)) {
    result.message = "Invalid user ID";
    return result;
  }
  try {
    const insertQuery = {
      text: "UPDATE users SET   password = $1 WHERE user_id = $2",
      values: [hashedPassword, user_id],
    };
    await client.query(insertQuery);
    result.message = `Passsword for User with id : ${user_id} has been succesfully Updated`;
    result.success = true;
    return result;
  } catch (error) {
    result.message = "Error sending OTP";
    return result;
  }
}

export async function updateUserProfileService(request) {
  const user_id = parseInt(request.params.user_id);
  const { name, surname, email, contact_number, profile_picture, age } =
    request.body;
  const result = { success: false, data: null, message: "" };
  if (isNaN(user_id)) {
    result.message = "Invalid user ID";
    return result;
  }

  try {
    //picture ipload to  cloudinary

    const insertQuery = {
      text: "UPDATE users SET  name = $1, surname = $2, email = $3, contact_number = $4 , profile_picture = $5 , age = $6 WHERE user_id = $7",
      values: [
        name,
        surname,
        email,
        contact_number,
        profile_picture,
        age,
        user_id,
      ],
    };
    const results = await client.query(insertQuery);
    // Check if any rows were affected by the update
    if (results.rowCount === 0) {
      result.message = "User not found";
      return result;
    }
    result.message = `Updated user with Id ${user_id}`;
    result.success = true;
    return result;
  } catch (error) {
    console.error("Error checking user existence:", error);
    throw error;
  }
}

export async function updateUserSearchedBooleanService(request) {
  const { searchedbefore, email } = request.body;
  const result = { success: false, data: null, message: "" };
  try {
    const insertQuery = {
      text: "UPDATE users SET searchedbefore = $1 WHERE email = $2",
      values: [searchedbefore, email],
    };
    await client.query(insertQuery);
    result.message = `Updated searched with email ${email}`;
    result.success = true;
    return result;
  } catch (error) {
    console.error("Error updating user searchedbefore:", error);
    throw error;
  }
}

export default {
  createUserService,
  signInUserService,
  passwordResetOTPService,
  updateUserPasswordService,
  updateUserProfileService,
  updateUserSearchedBooleanService,
};
