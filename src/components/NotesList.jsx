import React from "react";
import NoteItem from "./NoteItem";

const groupNotesByMonth = (notes) => {
  const groups = {};

  notes.forEach((note) => {
    const date = new Date(note.createdAt);
    const year = date.getFullYear();
    const month = date.getMonth();
    const key = `${year}-${String(month + 1).padStart(2, "0")}`;

    if (!groups[key]) {
      groups[key] = {
        key,
        label: new Date(year, month, 1).toLocaleDateString("id-ID", {
          month: "long",
          year: "numeric",
        }),
        notes: [],
      };
    }

    groups[key].notes.push(note);
  });

  return Object.values(groups).sort((a, b) => b.key.localeCompare(a.key));
};

function NotesList({ notes, onDelete, onArchive, searchKeyword = "", dataTestId = "notes-list" }) {
  const hasNotes = Array.isArray(notes) && notes.length > 0;

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        <p className="notes-list__empty-message" data-testid={`${dataTestId}-empty`}>
          Tidak ada catatan
        </p>
      </div>
    );
  }

  const groups = groupNotesByMonth(notes);

  return (
    <>
      {groups.map((group) => (
        <section key={group.key} className="notes-group" data-testid={`${group.key}-group`}>
          {/* Pembungkus header grup untuk memaksa susunan horizontal kiri-kanan */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ margin: 0 }}>{group.label}</h3>
            <span data-testid={`${group.key}-group-count`} style={{ color: "#aaa", fontSize: "14px" }}>
              {group.notes.length} catatan
            </span>
          </div>

          <div className="notes-list" data-testid={dataTestId}>
            {group.notes.map((note) => (
              <NoteItem key={note.id} note={note} onDelete={onDelete} onArchive={onArchive} searchKeyword={searchKeyword} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

export default NotesList;
