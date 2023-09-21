import "dotenv/config.js";
import client from "../../configuration/database/database_configuration.js";
import { request } from "express";

export async function SearchHistoryService(request) {
  const user_id = parseInt(request.params.user_id);
  const { query_searched, response_searched, ishumour } = request.body;
  const result = { success: false, data: null, message: "" };
  try {
    const insertQuery = {
      text: "INSERT INTO search_history (query_searched, response_searched, user_id, ishumour) VALUES ($1, $2, $3, $4) RETURNING *",
      values: [query_searched, response_searched, user_id, ishumour],
    };

    const results = await client.query(insertQuery);
    result.success = true;
    result.data = results.rows[0];
    return result;
  } catch (error) {
    result.message = error;
    return result;
  }
}

export async function getSearchHistoryLimitService(request) {
  const user_id = parseInt(request.params.user_id);
  const result = { success: false, data: null, message: "" };
  try {
    const insertQuery = {
      text: "SELECT * FROM search_history  WHERE user_id = $1 ORDER BY date_created DESC LIMIT 7 OFFSET 0",
      values: [user_id],
    };
    const results = await client.query(insertQuery);
    result.success = true;
    result.data = results.rows;
    return result;
  } catch (error) {
    result.message = error;
    return result;
  }
}
export async function deleteSearchHistoryByIdService(request) {
  const search_id = parseInt(request.params.id);
  const result = { success: false, data: null, message: "" };
  try {
    const insertQuery = {
      text: "DELETE FROM search_history WHERE id = $1;",
      values: [search_id],
    };
    const results = await client.query(insertQuery);
    result.success = true;
    result.message = `favorite of id: ${search_id} has been deleted`;
    return result;
  } catch (error) {
    result.message = error;
    return result;
  }
}

export default {
  SearchHistoryService,
  getSearchHistoryLimitService,
  deleteSearchHistoryByIdService,
};
