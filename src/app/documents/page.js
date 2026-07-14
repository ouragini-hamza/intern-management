"use client";

import { useState } from "react";
import Link from "next/link";
import StatCard from "../components/StatCard";
import DocumentModal from "../components/DocumentModal";
import ConfirmModal from "../components/ConfirmModal";

const initialDocuments = [
  {
    id: 1,
    name: "CV_Amine_Kacem.pdf",
    type: "CV",
    internName: "Amine Kacem",
    fileSize: "245 KB",
    uploadDate: "2026-06-02",
    fileUrl: null,
  },
  {
    id: 2,
    name: "Convention_Sara_Messaoudi.pdf",
    type: "Convention de stage",
    internName: "Sara Messaoudi",
    fileSize: "512 KB",
    uploadDate: "2026-06-01",
    fileUrl: null,
  },
  {
    id: 3,
    name: "CV_Yassine_Gharbi.pdf",
    type: "CV",
    internName: "Yassine Gharbi",
    fileSize: "198 KB",
    uploadDate: "2026-05-20",
    fileUrl: null,
  },
  {
    id: 4,
    name: "Attestation_Nour_BenHamed.pdf",
    type: "Autre",
    internName: "Nour Ben Hamed",
    fileSize: "87 KB",
    uploadDate: "2026-06-10",
    fileUrl: null,
  },
];

function getTypeBadge(type) {
  const map = {
    CV: "primary",
    "Convention de stage": "success",
    Autre: "secondary",
  };
  return map[type] || "secondary";
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(initialDocuments);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.internName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || doc.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const stats = [
    {
      label: "Total Documents",
      value: documents.length,
      icon: "bi-folder",
      color: "#1a3c6e",
    },
    {
      label: "CV",
      value: documents.filter((d) => d.type === "CV").length,
      icon: "bi-person-vcard",
      color: "#3b82f6",
    },
    {
      label: "Conventions",
      value: documents.filter((d) => d.type === "Convention de stage").length,
      icon: "bi-file-earmark-text",
      color: "#16a34a",
    },
    {
      label: "Autres",
      value: documents.filter((d) => d.type === "Autre").length,
      icon: "bi-files",
      color: "#6b7280",
    },
  ];

  const handleAddDocument = (doc) => {
    setDocuments((prev) => [...prev, doc]);
  };

  const openDeleteModal = (doc) => {
    setDocToDelete(doc);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    // Libère la mémoire de l'URL temporaire si elle existe, pour éviter
    // une petite fuite mémoire côté navigateur.
    if (docToDelete.fileUrl) {
      URL.revokeObjectURL(docToDelete.fileUrl);
    }
    setDocuments((prev) => prev.filter((d) => d.id !== docToDelete.id));
    setIsDeleteOpen(false);
  };

  return (
    <div style={{backgroundColor: "#ffffff", padding: "1.5rem", minHeight: "100vh"}}>
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
          Home
        </Link>
        {" > "}
        <span>Documents</span>
      </nav>
      <h1 style={{ color: "#1a3c6e", marginBottom: "1.5rem" }}>Documents</h1>

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
          <h5 style={{ color: "#1a3c6e", margin: 0 }}>Liste des documents</h5>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Rechercher un document ou un stagiaire..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ minWidth: "220px" }}
            />
            <select
              className="form-select"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              style={{ minWidth: "180px" }}
            >
              <option value="all">Tous les types</option>
              <option value="CV">CV</option>
              <option value="Convention de stage">Convention de stage</option>
              <option value="Autre">Autre</option>
            </select>
            <button
              className="btn"
              style={{
                backgroundColor: "#1a3c6e",
                color: "white",
                whiteSpace: "nowrap",
              }}
              onClick={() => setIsFormOpen(true)}
            >
              <i className="bi bi-upload me-2"></i>
              Ajouter un document
            </button>
          </div>
        </div>

        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Nom du fichier</th>
              <th>Type</th>
              <th>Stagiaire</th>
              <th>Taille</th>
              <th>Date dupload</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocs.map((doc) => (
              <tr key={doc.id}>
                <td>
                  <i
                    className="bi bi-file-earmark-pdf me-2"
                    style={{ color: "#dc2626" }}
                  ></i>
                  {doc.name}
                </td>
                <td>
                  <span className={`badge bg-${getTypeBadge(doc.type)}`}>
                    {doc.type}
                  </span>
                </td>
                <td>{doc.internName}</td>
                <td>{doc.fileSize}</td>
                <td>{doc.uploadDate}</td>
                <td>
                  {doc.fileUrl ? (
                    <a
                      href={doc.fileUrl}
                      download={doc.name}
                      className="btn btn-sm btn-outline-secondary"
                      style={{ marginRight: "0.5rem" }}
                    >
                      <i className="bi bi-download"></i>
                    </a>
                  ) : (
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      disabled
                      style={{ marginRight: "0.5rem" }}
                      title="Document de démonstration, non téléchargeable"
                    >
                      <i className="bi bi-download"></i>
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => openDeleteModal(doc)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredDocs.length === 0 && (
          <p
            style={{
              textAlign: "center",
              color: "#6b7280",
              margin: "1rem 0 0",
            }}
          >
            Aucun document ne correspond à ta recherche.
          </p>
        )}
      </div>

      <DocumentModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleAddDocument}
      />

      <ConfirmModal
        isOpen={isDeleteOpen}
        message={
          docToDelete ? `Supprimer le document "${docToDelete.name}" ?` : ""
        }
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
