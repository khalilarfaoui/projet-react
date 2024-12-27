import React, { Component } from 'react';
import {
  saveNote,
  getAllNotes,
  getNote,
  updateNote,
  deleteNote,
} from '../misc/NoteService';
import StarRating from './StarRating';

export default class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [], // Renommé pour plus de clarté
      newNote: {
        name: '',
        note: '',
      },
      editingNote: null, // État pour stocker la note en cours d'édition
    };
  }

  componentDidMount() {
    this.fetchNotes();
  }

  fetchNotes = () => {
    getAllNotes()
      .then((response) => {
        this.setState({ notes: response.data });
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des notes :', error);
      });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      newNote: {
        ...prevState.newNote,
        [name]: value,
      },
    }));
  };

  handleEditChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      editingNote: {
        ...prevState.editingNote,
        [name]: value,
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    saveNote(this.state.newNote)
      .then(() => {
        this.fetchNotes();
        this.setState({
          newNote: {
            name: '',
            note: '',
          },
        });
      })
      .catch((error) => {
        console.error('Erreur lors de la création de la note :', error);
      });
  };

  handleUpdate = (e) => {
    e.preventDefault();
    const { editingNote } = this.state;

    if (!editingNote || !editingNote.id) {
      console.error('Erreur : Aucun ID valide pour la mise à jour');
      return;
    }

    updateNote(editingNote.id, editingNote)
      .then(() => {
        this.fetchNotes();
        this.setState({ editingNote: null });
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour de la note :', error);
      });
  };

  handleDelete = (id) => {
    deleteNote(id)
      .then(() => {
        this.fetchNotes();
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression de la note :', error);
      });
  };

  startEditing = (note) => {
    this.setState({ editingNote: { ...note } });
  };

  cancelEditing = () => {
    this.setState({ editingNote: null });
  };

  render() {
    const { notes, newNote, editingNote } = this.state;

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
      ...buttonStyle,
      backgroundColor: '#dc3545',
    };

    const buttonStyleDelete = {
      ...buttonStyle,
      backgroundColor: '#e74c3c',
    };

    return (
      <div style={containerStyle}>
        <h1 style={{ textAlign: 'center', color: '#333' }}>Notes</h1>
        <form style={formStyle} onSubmit={editingNote ? this.handleUpdate : this.handleSubmit}>
          <label>
            Note:
            <input
              type="number"
              name="note"
              value={editingNote ? editingNote.note : newNote.note}
              onChange={editingNote ? this.handleEditChange : this.handleChange}
              style={inputStyle}
              required
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={editingNote ? editingNote.name : newNote.name}
              onChange={editingNote ? this.handleEditChange : this.handleChange}
              style={inputStyle}
              required
            />
          </label>
          <div>
            <button type="submit" style={buttonStyle}>
              {editingNote ? 'Update Note' : 'Create Note'}
            </button>
            {editingNote && (
              <button type="button" onClick={this.cancelEditing} style={buttonStyleCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#3498db', color: '#fff' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Note</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note.id}>
                <td style={{ padding: '10px' }}>
                  <StarRating rating={note.note} />
                </td>
                <td style={{ padding: '10px' }}>{note.name}</td>
                <td style={{ padding: '10px' }}>
                  <button onClick={() => this.startEditing(note)} style={buttonStyle}>
                    Edit
                  </button>
                  <button onClick={() => this.handleDelete(note.id)} style={buttonStyleDelete}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
