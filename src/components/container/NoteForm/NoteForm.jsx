import React, { useState, useEffect } from "react";
import styled from "styled-components";

function NoteForm({ onFormSubmit, onFormEdit, editingNote }) {
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    date: "",
    note: "",
    category: "",
    color: "#fefbc0"
  });
  const [isEditing, setIsEditing] = useState(false);

  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let newFormData = {
      ...formData,
      [name]: value
    };

    const categoryColors = {
      Reminder: "#ff837a",
      Memo: "#fbd470",
      Birthday: "#a1c5ff",
      "": "#fefbc0"
    };

    if (name === "category" && categoryColors[value]) {
      newFormData.color = categoryColors[value];
    }

    setFormData(newFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEditing) {
      onFormEdit(
        formData.id,
        formData.title,
        formData.note,
        formData.date,
        formData.color,
        formData.category
      );
    } else {
      onFormSubmit(
        formData.title,
        formData.note,
        formData.date,
        formData.color,
        formData.category
      );
    }
    setFormData({
      id: null,
      title: "",
      date: "",
      note: "",
      category: "",
      color: "#fefac0"
    });
    setIsEditing(false);
  };

  const toggleVisibility = () => {
    setIsFormVisible((prevState) => !prevState);
  };

  useEffect(() => {
    if (editingNote) {
      setFormData({
        id: editingNote.id,
        title: editingNote.title,
        date: editingNote.date,
        note: editingNote.content,
        category: editingNote.category,
        color: editingNote.color
      });
      setIsEditing(true);
    }
  }, [editingNote]);

  return (
    <Form onSubmit={handleSubmit}>
      {isFormVisible ? (
        <>
          <h2>
            {isEditing ? `Editing Note with ID: ${formData.id}` : "New Note"}
          </h2>
          <CloseButton onClick={toggleVisibility}>X</CloseButton>
          <input
            type="text"
            placeholder="Title"
            className="form--input"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <input
            type="date"
            className="form--input"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
          <textarea
            placeholder="Note"
            className="form--input"
            name="note"
            value={formData.note}
            onChange={handleInputChange}
            rows={15}
            required
          />
          <h2>Category</h2>
          <select
            name="category"
            type="text"
            className="form--input"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value=""></option>
            <option value="Reminder">Reminder</option>
            <option value="Memo">Memo</option>
            <option value="Birthday">Birthday</option>
          </select>
          <h2>Note Colour</h2>
          <input
            type="color"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
            disabled={formData.category !== ""}
          />
          <SubmitButton>
            {isEditing ? "Update Note" : "Add To Notes"}
          </SubmitButton>
        </>
      ) : (
        <OpenButton onClick={toggleVisibility}>Open Form</OpenButton>
      )}
    </Form>
  );
}

export default NoteForm;

const Form = styled.form`
  position: relative;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  padding: 20px 48px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  height: calc(100vh - 190px);
  width: 300px;
  overflow-y: auto;
  .form--input {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
    transition: border-color 0.3s ease;
    &:focus {
      border-color: #008cba;
      outline: none;
    }
  }
  textarea.form--input {
    flex-grow: 2;
    resize: none;
  }
`;

const SubmitButton = styled.button`
  height: 50px;
  margin-top: 16px;
  border-radius: 8px;
  width: 100%;
  border: none;
  color: white;
  background-color: purple;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #005f8a;
  }
`;

const OpenButton = styled.button`
  height: 40px;
  border: none;
  background-color: purple;
  color: white;
  padding: 0 20px;
  width: 100%;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: pink;
  }
`;

const CloseButton = styled.button`
  position: absolute;
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
