import React from "react";
import styled from "styled-components";

const Note = ({
  title,
  content,
  date,
  color,
  id,
  category,
  onDelete,
  onStartEditing,
  onDuplicate
}) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return (
    <NoteWrapper style={{ backgroundColor: color }}>
      <ActionButton positionRight={10} onClick={() => onDelete(id)}>
        X
      </ActionButton>
      <ActionButton positionRight={40} onClick={onStartEditing}>
        Edit
      </ActionButton>
      <ActionButton positionRight={80} onClick={() => onDuplicate(id)}>
        Dup
      </ActionButton>
      <NoteTitle>{title}</NoteTitle>
      <NoteTitle>Note ID:{id}</NoteTitle>
      <NoteTitle>Category: {category ? category : "None"}</NoteTitle>
      <NoteDate>{formattedDate}</NoteDate>
      <NoteContent>{content}</NoteContent>
    </NoteWrapper>
  );
};

export default Note;

const NoteWrapper = styled.div`
  margin-left: 350px;
  width: 400px;
  min-height: 150px;
  padding: 16px;
  margin: 16px;
  background-color: #fefac0;
  border: 1px solid #d8d8d8;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-family: "Helvetica", "Arial", sans-serif;
  position: relative;
`;

const ActionButton = styled.button`
  position: absolute;
  top: 10px;
  right: ${({ positionRight }) => `${positionRight}px`};
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

const NoteTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
`;

const NoteContent = styled.div`
  font-size: 14px;
  word-wrap: break-word;
`;
const NoteDate = styled.div`
  font-size: 12px;
  color: #777;
  margin-bottom: 8px;
`;
