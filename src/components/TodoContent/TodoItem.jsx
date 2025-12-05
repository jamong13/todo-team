import React, { useState } from "react";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";

export default function TodoItem({
  id,
  content,
  date,
  isDone,
  onUpdate,
  onDelete,
  onEdit,
}) {
  const [isEdit, setIsEdit] = useState(false);

  const [editContent, setEditContent] = useState(content);
  const [editDate, setEditDate] = useState(date);

  const onChangeCheckBox = () => {
    onUpdate(id);
  };

  const onClickDelete = () => {
    onDelete(id);
  };

  const onClickEdit = () => {
    setIsEdit(true);
  };

  const onSave = () => {
    if (editContent.trim() === "") return;
    onEdit(id, editContent, editDate);
    setIsEdit(false);
  };

  return (
    <div className="todo-item">
      <div className="checkbox-col">
        <label className="checkbox-wrapper">
          <input type="checkbox" checked={isDone} onChange={onChangeCheckBox} />
          <span className="custom-checkbox"></span>
        </label>
      </div>

      {!isEdit ? (
        <>
          <div className={`title-col ${isDone ? "done" : ""}`}>{content}</div>

          <div className="date-col">
            {new Date(date).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          <div className="btn-col">
            <FaEdit className="edit-icon" onClick={onClickEdit} />
            <FaTrash className="delete-icon" onClick={onClickDelete} />
          </div>
        </>
      ) : (
        <>
          <input
            className="edit-input"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />

          <input
            className="edit-date"
            type="date"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
          />

          <div className="btn-col">
            <FaCheck className="save-icon" onClick={onSave} />
            <FaTrash className="delete-icon" onClick={onClickDelete} />
          </div>
        </>
      )}
    </div>
  );
}
