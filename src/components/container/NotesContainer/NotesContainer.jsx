import Note from "../../presentational/Note";
import NoteForm from "../NoteForm";
import React, { useState } from "react";
import styled from "styled-components";
import randomColor from "randomcolor";

const NotesContainer = () => {
  const [notes, setNotes] = useState([]);
  const [dateType, setDateType] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [filterState, setFilterState] = useState(0);

  const filterStates = [null, "Memo", "Reminder", "Birthday"];
  const filterLabels = [
    "Showing All Notes",
    "Showing Memos",
    "Showing Reminders",
    "Showing Birthdays"
  ];

  const toggleCategoryFilter = () => {
    setFilterState(
      (prevFilterState) => (prevFilterState + 1) % filterStates.length
    );
  };

  const displayedNotes = notes.filter((note) =>
    filterStates[filterState] === null
      ? true
      : note.category === filterStates[filterState]
  );

  const handleFormSubmit = (title, content, date, color, category) => {
    const newNote = {
      id: new Date().getTime(),
      title,
      content,
      date,
      color,
      category
    };

    setNotes([...notes, newNote]);
  };
  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const toggleDate = () => {
    setDateType((prevState) => !prevState);
  };

  const handleFormEdit = (id, title, content, date, color, category) => {
    const editedNote = {
      id,
      title,
      content,
      date,
      color,
      category
    };

    const newNotes = notes.map((note) => {
      if (note.id === id) {
        return editedNote;
      } else {
        return note;
      }
    });
    setNotes(newNotes);
  };

  const startEditing = (note) => {
    setEditingNote(note);
  };

  const randomiseColor = () => {
    const newNotes = notes.map((note) => {
      let colour = note.category ? note.color : randomColor();
      return {
        ...note,
        color: colour
      };
    });
    setNotes(newNotes);
  };

  const handleDuplicate = (id) => {
    const noteToDuplicate = notes.find((note) => note.id === id);
    const newNote = {
      id: new Date().getTime(),
      title: noteToDuplicate.title,
      content: noteToDuplicate.content,
      date: noteToDuplicate.date,
      color: noteToDuplicate.color,
      category: noteToDuplicate.category
    };
    setNotes([...notes, newNote]);
  };
  return (
    <Container>
      <FormWrapper>
        <NoteForm
          onFormSubmit={handleFormSubmit}
          onFormEdit={handleFormEdit}
          editingNote={editingNote}
        />
      </FormWrapper>

      {notes.length > 0 ? (
        <NotesGridWrapper>
          <Navbar>
            <NavLinks>
              <NavLink onClick={toggleDate}>
                {dateType
                  ? "Toggle to Descending Date"
                  : "Toggle to Ascending Date"}
              </NavLink>
              <NavLink onClick={randomiseColor}>Randomise Colours</NavLink>
              <NavLink onClick={toggleCategoryFilter}>
                {filterLabels[filterState]}
              </NavLink>
            </NavLinks>
          </Navbar>
          <h2>{filterLabels[filterState]}</h2>
          <NotesGrid>
            {displayedNotes
              .sort((a, b) =>
                dateType
                  ? new Date(a.date) - new Date(b.date)
                  : new Date(b.date) - new Date(a.date)
              )
              .map((note) => (
                <Note
                  key={note.id}
                  id={note.id}
                  onDelete={handleDelete}
                  onStartEditing={() => startEditing(note)}
                  onDuplicate={handleDuplicate}
                  title={note.title}
                  date={note.date}
                  content={note.content}
                  color={note.color}
                  category={note.category}
                />
              ))}
          </NotesGrid>
        </NotesGridWrapper>
      ) : (
        <Title>No notes saved!</Title>
      )}
    </Container>
  );
};

export default NotesContainer;

const Navbar = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 20px;
  width: 100%;
  background-color: pink;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-between;
  width: calc(
    100% - 140px
  ); /* Subtracting the left and right padding of NotesGrid */
  padding: 0 40px; /* Matching padding with NotesGrid */
`;

const NavLink = styled.li`
  flex-grow: 1;
  text-align: left;
  color: #fff;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const FormWrapper = styled.div`
  margin-right: 20px;
`;

const NotesGridWrapper = styled.div`
  flex-grow: 1;
`;

const NotesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 20px;
  height: 100%;
  padding: 20px; /* This padding should be matched in NavLinks */

  @media screen and (max-width: 1600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Title = styled.h2`
  position: relative;
  color: black;
  width: 100%;
  font-weight: 700;
  font-size: 26px;
`;
const CloseButton = styled.button`
  position: relative;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #e74c3c;
  &:hover {
    color: #c0392b;
  }
`;
