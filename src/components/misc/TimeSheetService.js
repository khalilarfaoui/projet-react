import axios from "axios";

const API_URL = "http://localhost:8080/api/timesheets"; // Remplacez par l'URL de votre backend

export const getAllTimeSheets = () => {
  return axios.get(API_URL);
};

export const getTimeSheetById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};


export const getAllTimeSheetsByUser = () => {
    const id = localStorage.getItem('id')
    return axios.get(`${API_URL}/user-id/${id}`)
};

export const createTimeSheet = (timeSheet) => {
    const id = localStorage.getItem('id')
    console.log(id)
   return axios.post(`${API_URL}/user-id/${id}`, timeSheet)
};

export const updateTimeSheet = (id, timeSheet) => {
  return axios.put(`${API_URL}/${id}`, timeSheet);
};

export const deleteTimeSheet = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
