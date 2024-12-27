import React, { Component } from 'react';
import { updateTimeSheet, createTimeSheet, deleteTimeSheet, getAllTimeSheetsByUser } from '../misc/TimeSheetService';

export default class TimeSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeSheets: [],
      newTimeSheet: {
        date: '',
        hoursWorked: '',
        status: '',
      },
      editingTimeSheet: null,
    };
  }

  componentDidMount() {
    this.fetchTimeSheets();
  }

  fetchTimeSheets = () => {
    getAllTimeSheetsByUser()
      .then((response) => {
        this.setState({ timeSheets: response.data });
      })
      .catch((error) => {
        console.error('Error fetching time sheets:', error);
      });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      newTimeSheet: {
        ...prevState.newTimeSheet,
        [name]: value,
      },
    }));
  };

  handleEditChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      editingTimeSheet: {
        ...prevState.editingTimeSheet,
        [name]: value,
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    createTimeSheet(this.state.newTimeSheet)
      .then(() => {
        this.fetchTimeSheets();
        this.setState({
          newTimeSheet: {
            date: '',
            hoursWorked: '',
            status: '',
          },
        });
      })
      .catch((error) => {
        console.error('Error creating time sheet:', error);
      });
  };

  handleDelete = (id) => {
    deleteTimeSheet(id)
      .then(() => {
        this.fetchTimeSheets();
      })
      .catch((error) => {
        console.error('Error deleting time sheet:', error);
      });
  };

  startEditing = (timeSheet) => {
    this.setState({ editingTimeSheet: { ...timeSheet } });
  };

  cancelEditing = () => {
    this.setState({ editingTimeSheet: null });
  };

  handleUpdate = (e) => {
    e.preventDefault();
    const { editingTimeSheet } = this.state;

    updateTimeSheet(editingTimeSheet.id, editingTimeSheet)
      .then(() => {
        this.fetchTimeSheets();
        this.setState({ editingTimeSheet: null });
      })
      .catch((error) => {
        console.error('Error updating time sheet:', error);
      });
  };

  render() {
    const { timeSheets, newTimeSheet, editingTimeSheet } = this.state;

    const containerStyle = {
      padding: '30px',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      maxWidth: '900px',
      margin: 'auto',
      boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
      borderRadius: '12px',
      backgroundColor: '#f7f7f7',
    };

    const formStyle = {
      marginBottom: '30px',
      padding: '20px',
      borderRadius: '10px',
      backgroundColor: '#ffffff',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    };

    const inputStyle = {
      marginBottom: '18px',
      padding: '12px',
      width: '100%',
      borderRadius: '8px',
      border: '1px solid #ddd',
      fontSize: '16px',
    };

    const buttonStyle = {
      padding: '12px 20px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'background-color 0.3s ease',
    };

    const buttonStyleCancel = {
      padding: '12px 20px',
      backgroundColor: '#dc3545',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'background-color 0.3s ease',
    };

    const buttonStyleDelete = {
      padding: '12px 20px',
      backgroundColor: '#e74c3c',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'background-color 0.3s ease',
    };

    return (
      <div style={containerStyle}>
        <h1 style={{ textAlign: 'center', color: '#333' }}>Time Sheets</h1>
        <form style={formStyle} onSubmit={editingTimeSheet ? this.handleUpdate : this.handleSubmit}>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={editingTimeSheet ? editingTimeSheet.date : newTimeSheet.date}
              onChange={editingTimeSheet ? this.handleEditChange : this.handleChange}
              style={inputStyle}
              required
            />
          </label>
          <label>
            Hours Worked:
            <input
              type="number"
              name="hoursWorked"
              value={editingTimeSheet ? editingTimeSheet.hoursWorked : newTimeSheet.hoursWorked}
              onChange={editingTimeSheet ? this.handleEditChange : this.handleChange}
              style={inputStyle}
              required
            />
          </label>
          <label>
            Status:
            <select
              name="status"
              value={editingTimeSheet ? editingTimeSheet.status : newTimeSheet.status}
              onChange={editingTimeSheet ? this.handleEditChange : this.handleChange}
              style={inputStyle}
              required
            >
              <option value="PENDING">PENDING</option>
              <option value="APPROVED">APPROVED</option>
              <option value="REJECTED">REJECTED</option>
            </select>
          </label>
          <div>
            <button type="submit" style={buttonStyle}>
              {editingTimeSheet ? 'Update Time Sheet' : 'Create Time Sheet'}
            </button>
            {editingTimeSheet && (
              <button type="button" onClick={this.cancelEditing} style={buttonStyleCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <div>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#3498db', color: '#fff' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Hours Worked</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {timeSheets.map((timeSheet) => (
                <tr key={timeSheet.id}>
                  <td style={{ padding: '10px' }}>{timeSheet.date}</td>
                  <td style={{ padding: '10px' }}>{timeSheet.hoursWorked}</td>
                  <td style={{ padding: '10px' }}>{timeSheet.status}</td>
                  <td style={{ padding: '10px' }}>
                    <button onClick={() => this.startEditing(timeSheet)} style={buttonStyle}>
                      Edit
                    </button>
                    <button onClick={() => this.handleDelete(timeSheet.id)} style={buttonStyleDelete}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
