"use client";

import { useState } from "react";
import styles from "./modal.module.css";

const statuses = ["Active", "Pending", "Completed", "Terminated"];

const emptyForm = {
  name: "",
  department: "",
  supervisor: "",
  status: "Pending",
  startDate: "",
  endDate: "",
};

export default function AddInternModal({ isOpen, onClose, onAdd }) {
  const [form, setForm] = useState(emptyForm);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...form, id: Date.now() });
    setForm(emptyForm);
    onClose();
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />

      <div className={styles.dialog}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h5 className={styles.title}>Ajouter un stagiaire</h5>
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.body}>
              <div className={styles.field}>
                <label className={styles.label}>Nom complet</label>
                <input
                  type="text"
                  name="name"
                  className={`${styles.input} form-control`}
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Département</label>
                <input
                  type="text"
                  name="department"
                  className={`${styles.input} form-control`}
                  value={form.department}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Superviseur</label>
                <input
                  type="text"
                  name="supervisor"
                  className={`${styles.input} form-control`}
                  value={form.supervisor}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Statut</label>
                <select
                  name="status"
                  className={`${styles.select} form-select`}
                  value={form.status}
                  onChange={handleChange}
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.field} style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  <label className={styles.label}>Date de début</label>
                  <input
                    type="date"
                    name="startDate"
                    className={`${styles.input} form-control`}
                    value={form.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className={styles.label}>Date de fin</label>
                  <input
                    type="date"
                    name="endDate"
                    className={`${styles.input} form-control`}
                    value={form.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className={styles.footer}>
              <button
                type="button"
                className={`${styles.button} ${styles.secondaryButton}`}
                onClick={onClose}
              >
                Annuler
              </button>
              <button
                type="submit"
                className={`${styles.button} ${styles.primaryButton}`}
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
