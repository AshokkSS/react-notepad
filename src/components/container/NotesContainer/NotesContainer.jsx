import Note from "../../presentational/Note";
import NoteForm from "../NoteForm";
import React, { useState } from "react";
import styled from "styled-components";

const NotesContainer = () => {
  const [notes, setNotes] = useState([]);
  const [dateType, setDateType] = useState(false);
  const handleFormSubmit = (title, content, date, color) => {
    const newNote = {
      id: new Date().getTime(),
      title,
      content,
      date,
      color
    };

    setNotes([...notes, newNote]);
  };
  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const toggleDate = () => {
    setDateType((prevState) => !prevState);
  };

  return (
    <Container>
      <FormWrapper>
        <NoteForm onFormSubmit={handleFormSubmit} />
      </FormWrapper>

      {notes.length > 0 ? (
        <NotesGridWrapper>
          <CloseButton onClick={toggleDate}>
            {dateType
              ? "Toggle to Descending Date"
              : "Toggle to Ascending Date"}
          </CloseButton>

          <NotesGrid>
            {notes
              .sort((a, b) =>
                dateType
                  ? new Date(a.date) - new Date(b.date)
                  : new Date(b.date) - new Date(a.date)
              )
              .map((note) => (
                <Note
                  id={note.id}
                  onDelete={handleDelete}
                  title={note.title}
                  date={note.date}
                  content={note.content}
                  color={note.color}
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
  padding: 20px;

  @media screen and (max-width: 1080px) {
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
