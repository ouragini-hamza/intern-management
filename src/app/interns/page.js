"use client";

import { useState } from "react";
import AddInternModal from "../components/AddInternModal";
import InternActionModal from "../components/InternActionModal";

const initialInterns = [
  {
    id: 1,
    name: "Amine Belhadj",
    department: "IT",
    supervisor: "M. Trabelsi",
    status: "Active",
    startDate: "2026-06-01",
    endDate: "2026-12-01",
  },
  {
    id: 2,
    name: "Salma Gharbi",
    department: "Marketing",
    supervisor: "Mme Fekih",
    status: "Pending",
    startDate: "2026-07-15",
    endDate: "2026-12-01",
  },
  {
    id: 3,
    name: "Youssef Cherif",
    department: "IT",
    supervisor: "M. Trabelsi",
    status: "Completed",
    startDate: "2026-03-01",
    endDate: "2026-08-01",
  },
  {
    id: 4,
    name: "Nour Jaziri",
    department: "RH",
    supervisor: "Mme Ammar",
    status: "Active",
    startDate: "2026-05-20",
    endDate: "2026-10-20",
  },
  {
    id: 5,
    name: "Karim Sassi",
    department: "Finance",
    supervisor: "M. Ouali",
    status: "Terminated",
    startDate: "2026-02-10",
    endDate: "2026-07-10",
  },
  {
    id: 6,
    name: "Ines Mabrouk",
    department: "IT",
    supervisor: "Mme Ammar",
    status: "Active",
    startDate: "2026-06-10",
    endDate: "2026-11-10",
  },
  {
    id: 7,
    name: "Bilel Hamdi",
    department: "Marketing",
    supervisor: "M. Ouali",
    status: "Pending",
    startDate: "2026-08-01",
    endDate: "2026-12-01",
  },
  {
    id: 8,
    name: "Rania Toumi",
    department: "Finance",
    supervisor: "M. Trabelsi",
    status: "Completed",
    startDate: "2026-01-05",
    endDate: "2026-06-05",
  },
];

const statuses = ["Active", "Pending", "Completed", "Terminated"];

function getStatusBadge(status) {
  const map = {
    Active: "success",
    Pending: "warning",
    Completed: "secondary",
    Terminated: "danger",
  };
  return map[status] || "secondary";
}

export default function InternsPage() {
  const [interns, setInterns] = useState(initialInterns);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // États pour la modale d'ajout
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // États pour la modale voir/modifier/supprimer
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isModifyOpen, setIsModifyOpen] = useState(false);

  const filteredInterns = interns.filter((intern) => {
    const matchesSearch = intern.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || intern.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddIntern = (newIntern) => {
    setInterns((prev) => [...prev, newIntern]);
  };

  const handleUpdateIntern = (updatedIntern) => {
    setInterns((prev) =>
      prev.map((i) => (i.id === updatedIntern.id ? updatedIntern : i)),
    );
  };
  const handelDeleteIntern = (internDeleted) => {
    setInterns((prev) => prev.filter((i) => i.id !== internDeleted.id));
    setIsDeleteClicked(false);
  };

  const internAction = (e, intern) => {
    setSelectedIntern(intern);
    if (e.currentTarget.name === "modify-btn") setIsModifyOpen(true);
    else if (e.currentTarget.name === "view-btn") setIsDetailOpen(true);
    else if (e.currentTarget.name === "delete-btn") setIsDeleteClicked(true);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h1 style={{ color: "#1a3c6e", margin: 0 }}>Stagiaires</h1>
        <button
          className="btn"
          style={{ backgroundColor: "#1a3c6e", color: "white" }}
          onClick={() => setIsAddModalOpen(true)}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Ajouter un stagiaire
        </button>
      </div>

      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher un stagiaire par nom..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-3 mb-2">
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

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "1.5rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Département</th>
              <th>Superviseur</th>
              <th>Statut</th>
              <th>Date de début</th>
              <th>Date de fin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInterns.map((intern) => (
              <tr key={intern.id}>
                <td>{intern.name}</td>
                <td>{intern.department}</td>
                <td>{intern.supervisor}</td>
                <td>
                  <span className={`badge bg-${getStatusBadge(intern.status)}`}>
                    {intern.status}
                  </span>
                </td>
                <td>{intern.startDate}</td>
                <td>{intern.endDate}</td>
                <td>
                  <button
                    name="view-btn"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={(e) => internAction(e, intern)}
                  >
                    <i className="bi bi-eye"></i>
                  </button>
                  <button
                    name="modify-btn"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={(e) => internAction(e, intern)}
                    style={{ margin: "0.5rem" }}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    name="delete-btn"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={(e) => internAction(e, intern)}
                    style={{ margin: "0.5rem" }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredInterns.length === 0 && (
          <p
            style={{
              textAlign: "center",
              color: "#6b7280",
              margin: "1rem 0 0",
            }}
          >
            Aucun stagiaire ne correspond à ta recherche.
          </p>
        )}
      </div>

      <AddInternModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddIntern}
      />

      <InternActionModal
        key={selectedIntern?.id}
        intern={selectedIntern}
        isOpenDetail={isDetailOpen}
        isOpenModify={isModifyOpen}
        isDeleteClicked={isDeleteClicked}
        onClose={() => {
          setIsDetailOpen(false);
          setIsModifyOpen(false);
          setIsDeleteClicked(false);
        }}
        onUpdate={handleUpdateIntern}
        onDelete={handelDeleteIntern}
      />
    </div>
  );
}
