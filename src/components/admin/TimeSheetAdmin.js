import React, { Component } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { updateTimeSheet, createTimeSheet, deleteTimeSheet, getAllTimeSheets } from '../misc/TimeSheetService';

export default class TimeSheetAdmin extends Component {
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
    getAllTimeSheets()
      .then((response) => {
        this.setState({ timeSheets: response.data });
      })
      .catch((error) => {
        console.error('Error fetching time sheets:', error);
      });
  };

  downloadPDF = () => {
    const input = document.getElementById('timeSheetTable');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190; // A4 page width in mm
      const pageHeight = 297; // A4 page height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('time_sheets.pdf');
    });
  };

  render() {
    const { timeSheets } = this.state;

    const containerStyle = {
      padding: '30px',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      maxWidth: '900px',
      margin: 'auto',
      boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
      borderRadius: '12px',
      backgroundColor: '#f7f7f7',
    };

    return (
      <div style={containerStyle}>
        <h1 style={{ textAlign: 'center', color: '#333' }}>Time Sheets</h1>
        <button
          onClick={this.downloadPDF}
          style={{
            padding: '10px 20px',
            marginBottom: '20px',
            backgroundColor: '#3498db',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Download PDF
        </button>
        <div id="timeSheetTable">
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '20px',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#3498db', color: '#fff' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Hours Worked</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {timeSheets.map((timeSheet) => (
                <tr key={timeSheet.id}>
                  <td style={{ padding: '10px' }}>{timeSheet.user}</td>
                  <td style={{ padding: '10px' }}>{timeSheet.date}</td>
                  <td style={{ padding: '10px' }}>{timeSheet.hoursWorked}</td>
                  <td style={{ padding: '10px' }}>{timeSheet.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
