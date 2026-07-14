"use client";

import { useState } from "react";
import Link from "next/link";
import StatCard from "../components/StatCard";
import TaskModal from "../components/TaskModal";
import ConfirmModal from "../components/ConfirmModal";

const initialTasks = [
  {
    id: 1,
    title: "Conception de la base de données",
    internName: "Amine Kacem",
    status: "Terminé",
    dueDate: "2026-07-20",
  },
  {
    id: 2,
    title: "Développement du module d'authentification",
    internName: "Sara Messaoudi",
    status: "En cours",
    dueDate: "2026-07-25",
  },
  {
    id: 3,
    title: "Intégration de l'API de paiement",
    internName: "Yassine Gharbi",
    status: "À faire",
    dueDate: "2026-07-30",
  },
  {
    id: 4,
    title: "Tests et correction des bugs",
    internName: "Nour Ben Hamed",
    status: "En cours",
    dueDate: "2026-07-28",
  },
  {
    id: 5,
    title: "Rédaction de la documentation",
    internName: "Mohamed Ali Ayari",
    status: "À faire",
    dueDate: "2026-08-01",
  },
  {
    id: 6,
    title: "Déploiement de l'application",
    internName: "Khaoula Jebali",
    status: "Terminé",
    dueDate: "2026-07-15",
  },
];
const statuses = ["À faire", "En cours", "Terminé"];

function getProgressFromStatus(status) {
  const map = { "À faire": 0, "En cours": 50, Terminé: 100 };
  return map[status] ?? 0;
}

function getStatusBadge(status) {
  const map = {
    "À faire": "warning",
    "En cours": "primary",
    Terminé: "success",
  };
  return map[status] || "secondary";
}

function getProgressColor(status) {
  const map = {
    "À faire": "#d1d5db",
    "En cours": "#3b82f6",
    Terminé: "#16a34a",
  };
  return map[status] || "#d1d5db";
}

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const filteredTasks = tasks.filter((t) => {
    const matchesSearchTerm = t.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    return matchesSearchTerm && matchesStatus;
  });

  // Compteurs dérivés directement de `tasks` — jamais stockés à part,
  // pour ne jamais désynchroniser l'affichage des vraies données.
  const stats = [
    {
      label: "Total Tasks",
      value: tasks.length,
      icon: "bi-clipboard-check",
      color: "#1a3c6e",
    },
    {
      label: "À faire",
      value: tasks.filter((t) => t.status === "À faire").length,
      icon: "bi-clock",
      color: "#d97706",
    },
    {
      label: "En cours",
      value: tasks.filter((t) => t.status === "En cours").length,
      icon: "bi-arrow-repeat",
      color: "#3b82f6",
    },
    {
      label: "Terminés",
      value: tasks.filter((t) => t.status === "Terminé").length,
      icon: "bi-check-circle",
      color: "#16a34a",
    },
  ];

  const handleSaveTask = (task) => {
    setTasks((prev) => {
      const exists = prev.some((t) => t.id === task.id);
      return exists
        ? prev.map((t) => (t.id === task.id ? task : t))
        : [...prev, task];
    });
  };

  const openAddModal = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const openDeleteModal = (task) => {
    setTaskToDelete(task);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
    setIsDeleteOpen(false);
  };
  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
    );
  };

  return (
    <div
      style={{
        backgroundColor: "#f9fafb",
        padding: "2rem",
        minHeight: "100vh",
      }}
    >
      <nav
        style={{
          fontSize: "0.85rem",
          color: "#6b7280",
          marginBottom: "0.25rem",
        }}
      >
        <Link
          href="/dashboard"
          style={{ color: "#6b7280", textDecoration: "none" }}
        >
          <i
            style={{ fontSize: "30px", color: "black" }}
            className="bi bi-house-door"
          ></i>
        </Link>
      </nav>
      <h1 style={{ color: "#1a3c6e", marginBottom: "1.5rem" }}>Tasks</h1>

      <div className="row">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "1.5rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          marginTop: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <h5 style={{ color: "#1a3c6e", margin: 0 }}>Liste des tâches</h5>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <div className="row mb-3">
              <div className="col-md-6 mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Rechercher une tache "
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  
                />
              </div>
              <div className="col-md-3 mb-2" style={{ display: 'flex', gap: '0.75rem' }}>
                <select
                  className="form-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Tous les statuts</option>
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              className="btn"
              style={{
                backgroundColor: "#1a3c6e",
                color: "white",
                whiteSpace: "nowrap",
                height: "40px",
              }}
              onClick={openAddModal}
              
            >
              <i className="bi bi-plus-lg me-2"></i>
              Nouvelle tâche
            </button>
          </div>
        </div>

        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Stagiaire</th>
              <th>Statut</th>
              <th>Progression</th>
              <th>Date limite</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.internName}</td>
                <td>
                  <span className={`badge bg-${getStatusBadge(task.status)}`}>
                    {task.status}
                  </span>
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        width: "120px",
                        height: "8px",
                        backgroundColor: "#e5e7eb",
                        borderRadius: "4px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${getProgressFromStatus(task.status)}%`,
                          height: "100%",
                          backgroundColor: getProgressColor(task.status),
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                    <span style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                      {getProgressFromStatus(task.status)}%
                    </span>
                  </div>
                </td>
                <td>{task.dueDate}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => openEditModal(task)}
                    style={{ marginRight: "0.5rem" }}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => openDeleteModal(task)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                  <select
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                    style={{
                      marginLeft: "0.5rem",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "4px",
                      border: "1px solid #d1d5db",
                      backgroundColor: "#f9fafb",
                      color: "#1a3c6e",
                    }}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredTasks.length === 0 && (
          <p
            style={{
              textAlign: "center",
              color: "#6b7280",
              margin: "1rem 0 0",
            }}
          >
            Aucune tâche ne correspond à ta recherche.
          </p>
        )}
      </div>

      <TaskModal
        isOpen={isFormOpen}
        task={editingTask}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveTask}
      />

      <ConfirmModal
        isOpen={isDeleteOpen}
        message={
          taskToDelete ? `Supprimer la tâche "${taskToDelete.title}" ?` : ""
        }
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
