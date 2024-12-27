import React, { useEffect, useState } from "react";
import {
  deleteLeaveRequest,
  createLeaveRequest,
  updateLeaveRequest,
  getAllLeaveRequestsByUser,
} from "../misc/LeaveRequestService";

const CongeTable = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    startDate: "",
    endDate: "",
    reason: "",
    status: "PENDING",
  });

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const response = await getAllLeaveRequestsByUser();
      setLeaveRequests(response.data);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await updateLeaveRequest(formData.id, formData);
      } else {
        await createLeaveRequest(formData);
      }
      fetchLeaveRequests();
      resetForm();
    } catch (error) {
      console.error("Error saving leave request:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteLeaveRequest(id);
      fetchLeaveRequests();
    } catch (error) {
      console.error("Error deleting leave request:", error);
    }
  };

  const handleEdit = (request) => {
    setFormData(request);
  };

  const resetForm = () => {
    setFormData({
      id: null,
      startDate: "",
      endDate: "",
      reason: "",
      status: "PENDING",
    });
  };

  return (
    <div
      style={{
        fontFamily: "'Roboto', sans-serif",
        margin: "0 auto",
        maxWidth: "1200px",
        padding: "20px",
        backgroundColor: "#f5f6fa",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#2c3e50" }}>
        Manage Leave Requests
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "20px",
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "8px",
              color: "#34495e",
            }}
          >
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "8px",
              color: "#34495e",
            }}
          >
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "8px",
              color: "#34495e",
            }}
          >
            Reason
          </label>
          <input
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "8px",
              color: "#34495e",
            }}
          >
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          >
            <option value="PENDING">PENDING</option>
            <option value="APPROVED">APPROVED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            type="submit"
            style={{
              backgroundColor: "#27ae60",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {formData.id ? "Update Request" : "Add Request"}
          </button>
          <button
            type="button"
            onClick={resetForm}
            style={{
              backgroundColor: "#e74c3c",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Reset
          </button>
        </div>
      </form>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#3498db", color: "#ffffff" }}>
            <th style={{ padding: "15px", textAlign: "left" }}>ID</th>
            <th style={{ padding: "15px", textAlign: "left" }}>Start Date</th>
            <th style={{ padding: "15px", textAlign: "left" }}>End Date</th>
            <th style={{ padding: "15px", textAlign: "left" }}>Reason</th>
            <th style={{ padding: "15px", textAlign: "left" }}>Status</th>
            <th style={{ padding: "15px", textAlign: "left" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request) => (
            <tr
              key={request.id}
              style={{ borderBottom: "1px solid #ddd", color: "#34495e" }}
            >
              <td style={{ padding: "15px" }}>{request.id}</td>
              <td style={{ padding: "15px" }}>{request.startDate}</td>
              <td style={{ padding: "15px" }}>{request.endDate}</td>
              <td style={{ padding: "15px" }}>{request.reason}</td>
              <td style={{ padding: "15px" }}>{request.status}</td>
              <td style={{ padding: "15px", display: "flex", gap: "10px" }}>
                <button
                  onClick={() => handleEdit(request)}
                  style={{
                    backgroundColor: "#f39c12",
                    color: "white",
                    padding: "5px 10px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(request.id)}
                  style={{
                    backgroundColor: "#e74c3c",
                    color: "white",
                    padding: "5px 10px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CongeTable;
