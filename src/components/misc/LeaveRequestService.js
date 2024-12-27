import axios from "axios";

const API_URL = "http://localhost:8080/api/leave-requests";

export const getAllLeaveRequests = () => axios.get(API_URL);


export const getAllLeaveRequestsByUser = () => {
  const id = localStorage.getItem("id");
  return axios.get(`${API_URL}/user-id/${id}`);
};

export const getLeaveRequestById = (id) => axios.get(`${API_URL}/${id}`);

export const createLeaveRequest = (data) => {
  const id = localStorage.getItem("id");
  console.log(id);
  return axios.post(`${API_URL}/user-id/${id}`, data);
};

export const updateLeaveRequest = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);

export const deleteLeaveRequest = (id) => axios.delete(`${API_URL}/${id}`);

export const approveLeaveRequest = async (id) => {
  await axios.put(`${API_URL}/${id}/approve`);
};

// Fonction pour rejeter une demande
export const rejectLeaveRequest = async (id) => {
  await axios.put(`${API_URL}/${id}/reject`);
};

export const updateLeaveRequestStatus = async (id, status) => {
    const response = await axios.put(`${API_URL}/${id}`, { status });
    return response.data;
  };

  export const updateLeaveRequestStatusReject = async (id) => {
    const response = await axios.put(`${API_URL}/${id}/reject`, {  });
    return response.data;
  };

  export const updateLeaveRequestStatusApp = async (id) => {
    const response = await axios.put(`${API_URL}/${id}/approve`, {  });
    return response.data;
  };
// Fonction pour filtrer les demandes par statut
export const filterLeaveRequestsByStatus = async (status) => {
    console.log(status)
  const response = await axios.get(`${API_URL}/status/${status}`);

  return response.data;
};
