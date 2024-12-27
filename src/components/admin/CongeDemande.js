import React, { useState, useEffect } from "react";
import {
  getAllLeaveRequests,
  filterLeaveRequestsByStatus,
  updateLeaveRequestStatusReject,
  updateLeaveRequestStatusApp,
} from "../misc/LeaveRequestService";

const CongeDemande = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  // Charger toutes les demandes au montage
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllLeaveRequests();
        console.log(data);
        setLeaveRequests(data.data);
        setFilteredRequests(data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des demandes:", error);
      }
    };

    fetchData();
  }, []);

  // Gérer le changement de filtre
  const handleFilterChange = async (e) => {
    const filter = e.target.value;
    setStatusFilter(filter);
    if (filter) {
        try {
          const data = await filterLeaveRequestsByStatus(filter);
          console.log(data)
          setFilteredRequests(data);
        } catch (error) {
          console.error("Erreur lors du filtrage:", error);
        }
      } else {
        setFilteredRequests(leaveRequests);
      }
  };

  // Approuver une demande
  const handleApprove = async (id) => {
    try {
      await updateLeaveRequestStatusApp(id);
      const updatedRequests = leaveRequests.map((request) =>
        request.id === id ? { ...request, status: "APPROVED" } : request
      );
      setLeaveRequests(updatedRequests);
      setFilteredRequests(
        updatedRequests.filter((req) =>
          statusFilter ? req.status === statusFilter : true
        )
      );
    } catch (error) {
      console.error("Erreur lors de l'approbation:", error);
    }
  };

  // Rejeter une demande
  const handleReject = async (id) => {
    try {
      await updateLeaveRequestStatusReject(id);
      const updatedRequests = leaveRequests.map((request) =>
        request.id === id ? { ...request, status: "REJECTED" } : request
      );
      setLeaveRequests(updatedRequests);
      setFilteredRequests(
        updatedRequests.filter((req) =>
          statusFilter ? req.status === statusFilter : true
        )
      );
    } catch (error) {
      console.error("Erreur lors du rejet:", error);
    }
  };
  const containerStyle = {
    padding: "30px",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: "900px",
    margin: "auto",
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
    backgroundColor: "#f7f7f7",
  };

  const formStyle = {
    marginBottom: "30px",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const inputStyle = {
    marginBottom: "18px",
    padding: "12px",
    width: "100%",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "16px",
  };

  const buttonStyle = {
    padding: "12px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  };

  const buttonStyleCancel = {
    padding: "12px 20px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  };

  const buttonStyleDelete = {
    padding: "12px 20px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  };
  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Demandes de congé</h1>
      <div>
        <label htmlFor="statusFilter">Filtrer par statut :</label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={handleFilterChange}
          style={inputStyle}
        >
          <option value="">Tous</option>
          <option value="PENDING">En attente</option>
          <option value="APPROVED">Approuvé</option>
          <option value="REJECTED">Rejeté</option>
        </select>
      </div>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#3498db", color: "#fff" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>ID</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Name</th>
            <th style={{ padding: "10px", textAlign: "left" }}>
              Date de début
            </th>
            <th style={{ padding: "10px", textAlign: "left" }}>Date de fin</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Raison</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Statut</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <tr key={request.id}>
                <td style={{ padding: "10px" }}>{request.id}</td>
                <td style={{ padding: "10px" }}>{request.user}</td>
                <td style={{ padding: "10px" }}>{request.startDate}</td>
                <td style={{ padding: "10px" }}>{request.endDate}</td>
                <td style={{ padding: "10px" }}>{request.reason}</td>
                <td style={{ padding: "10px" }}>{request.status}</td>
                <td style={{ padding: "10px" }}>
                  {request.status === "PENDING" && (
                    <>
                      <button
                        style={buttonStyle}
                        onClick={() => handleApprove(request.id)}
                      >
                        Approuver
                      </button>
                      <button
                        style={buttonStyleDelete}
                        onClick={() => handleReject(request.id)}
                      >
                        Rejeter
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Aucune demande disponible.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CongeDemande;
