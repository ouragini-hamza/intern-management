"use client";

import { useState } from "react";
import styles from "./modal.module.css";

const interns = [
  "Amine Kacem",
  "Sara Messaoudi",
  "Yassine Gharbi",
  "Nour Ben Hamed",
  "Mohamed Ali Ayari",
  "Khaoula Jebali",
];

const statuses = ["À faire", "En cours", "Terminé"];
const priorities = ["Low", "Medium", "High"];

const emptyForm = {
  title: "",
  internName: "",
  description: "",
  status: "À faire",
  priority: "Medium",
  dueDate: "",
};

export default function TaskModal({ isOpen, task, onClose, onSave }) {
  const [form, setForm] = useState(
    task ? { ...emptyForm, ...task } : emptyForm,
  );

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, id: task ? task.id : Date.now() });
    onClose();
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.dialog}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div>
              <div
                style={{
                  color: "#6b7280",
                  fontSize: "0.95rem",
                  marginBottom: "0.35rem",
                }}
              >
                Assign a task to an intern
              </div>
              <h5 className={styles.title}>
                {task ? "Edit Task" : "New Task"}
              </h5>
            </div>
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.body}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="internName">
                  Intern *
                </label>
                <select
                  id="internName"
                  name="internName"
                  className={styles.select}
                  value={form.internName}
                  onChange={handleChange}
                  required
                >
                  <option value="" style={{color:'black'}}>Select an intern</option>
                  {interns.map((intern) => (
                    <option key={intern} value={intern} style={{color:'black'}}>
                      {intern}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="title">
                  Title *
                </label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  className={styles.input}
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Complete onboarding documentation"
                  required
                  style={{color:'black'}}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className={styles.textarea}
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Add a brief task description"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="priority">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  className={styles.select}
                  value={form.priority}
                  onChange={handleChange}
                >
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="dueDate">
                  Due Date
                </label>
                <input
                  id="dueDate"
                  type="date"
                  name="dueDate"
                  className={styles.input}
                  value={form.dueDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.footer}>
              <button
                type="button"
                className={`${styles.button} ${styles.secondaryButton}`}
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`${styles.button} ${styles.primaryButton}`}
              >
                {task ? "Save Changes" : "Create Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
