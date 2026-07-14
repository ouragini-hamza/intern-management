"use client";

import { useState } from "react";
import styles from "./modal.module.css";

const statuses = ["Active", "Pending", "Completed", "Terminated"];

export default function InternActionModal({
  intern,
  isOpenDetail,
  isOpenModify,
  isDeleteClicked,
  onClose,
  onUpdate,
  onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(intern);

  if (!isOpenDetail && !isOpenModify && !isDeleteClicked) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    onUpdate(form);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setForm(intern);
    setIsEditing(false);
  };

  if(isOpenModify && !isEditing) {
    setIsEditing(true);
  }
  if (isDeleteClicked) {
    return (
      <>
        <div className={styles.overlay} onClick={onClose} />
        <div className={styles.dialog}>
          <div className={styles.card}>
            <div className={styles.header}>
              <h5 className={styles.title}>Confirmation de suppression</h5>
              <button
                type="button"
                className={styles.closeButton}
                onClick={onClose}
              >
                ✕
              </button>
            </div>
            <div className={styles.body}>
              <p style={{ color: "black" }}>Êtes-vous sûr de vouloir supprimer {intern.name} ?</p>
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
                type="button"
                className={`${styles.button} ${styles.primaryButton}`}
                onClick={() => onDelete(intern)}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />

      <div className={styles.dialog}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h5 className={styles.title}>
              {isEditing ? "Modifier le stagiaire" : form.name}
            </h5>
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSave}>
            <div className={styles.body}>
              <FieldRow
                label="Nom complet"
                name="name"
                value={form.name}
                editing={isEditing}
                onChange={handleChange}
              />
              <FieldRow
                label="Département"
                name="department"
                value={form.department}
                editing={isEditing}
                onChange={handleChange}
              />
              <FieldRow
                label="Superviseur"
                name="supervisor"
                value={form.supervisor}
                editing={isEditing}
                onChange={handleChange}
              />

              <div className={styles.field}>
                <label className={styles.label}>Statut</label>
                {isEditing ? (
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
                ) : (
                  <p className={styles.displayText}>{form.status}</p>
                )}
              </div>

              <FieldRow
                label="Date de début"
                name="startDate"
                value={form.startDate}
                editing={isEditing}
                onChange={handleChange}
                type="date"
              />
              <FieldRow
                label="Date de fin"
                name="endDate"
                value={form.endDate}
                editing={isEditing}
                onChange={handleChange}
                type="date"
              />
            </div>

            <div className={styles.footer}>
              {isEditing ? (
                <>
                  <button
                    type="button"
                    className={`${styles.button} ${styles.secondaryButton}`}
                    onClick={handleCancelEdit}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className={`${styles.button} ${styles.primaryButton}`}
                  >
                    Enregistrer
                  </button>
                </>
              ) : (
                <button
                  id="close-button"
                  type="button"
                  className={`${styles.button} ${styles.secondaryButton}`}
                  onClick={onClose}
                >
                  X Close
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

function FieldRow({ label, name, value, editing, onChange, type = "text" }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      {editing ? (
        <input
          type={type}
          name={name}
          className={`${styles.input} form-control`}
          value={value}
          onChange={onChange}
          required
        />
      ) : (
        <p className={styles.displayText}>{value}</p>
      )}
    </div>
  );
}
