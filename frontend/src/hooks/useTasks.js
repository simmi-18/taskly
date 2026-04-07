import React from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

export const getTasks = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error while Fetching Tasks: ", err);
    throw err.response?.data || { message: "Failed to get tasks!!!" };
  }
};

export const saveTasks = async (form) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${BASE_URL}/tasks/create`, form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error("Error while creating Tasks: ", err);
    throw err.response?.data || { message: "Failed to create task!!!" };
  }
};

export const editTasks = async (id, form) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${BASE_URL}/tasks/update/${id}`, form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error("Error while update Tasks: ", err);
    throw err.response?.data || { message: "Failed to update task!!!" };
  }
};

export const toggleTask = async (id, done) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(
      `${BASE_URL}/tasks/update-toggle/${id}`,
      { done },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (err) {
    console.error("Error toggling task: ", err);
    throw err.response?.data || { message: "Failed to toggle task!" };
  }
};

export const deleteTasks = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(`${BASE_URL}/tasks/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error("Error while delete Tasks: ", err);
    throw err.response?.data || { message: "Failed to delete task!!!" };
  }
};
