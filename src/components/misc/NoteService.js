import axios from 'axios';

const API_URL = 'http://localhost:8080/api/notes'; // Remplacez par votre URL d'API


  export const getAllNotes = ()=> {
    return axios.get(API_URL);
  }

  export const saveNote = (note) => {
    return axios.post(API_URL, note);
  }

  export const  getNote = (id) => {
    return axios.get(`${API_URL}/${id}`);
  }

  export const updateNote = (id, note)=> {
    return axios.put(`${API_URL}/${id}`, note);
  }

  export const deleteNote = (id) => {
    return axios.delete(`${API_URL}/${id}`);
  }


