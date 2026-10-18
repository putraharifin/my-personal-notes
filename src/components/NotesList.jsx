import React from 'react';
import NoteItem from './NoteItem';

const groupNotesByMonth = (notes) => {
  const groups = {};

  notes.forEach((note) => {
    const date = new Date(note.createdAt);
    const year = date.getFullYear();
    const month = date.getMonth();
    const key = `${year}-${String(month + 1).padStart(2, '0')}`;

    if (!groups[key]) {
      groups[key] = {
        key,
        label: new Date(year, month, 1).toLocaleDateString('id-ID', {
          month: 'long',
          year: 'numeric',
        }),
        notes: [],
      };
    }

    groups[key].notes.push(note);
  });

  return Object.values(groups).sort((a, b) => b.key.localeCompare(a.key));
};

function NotesList({
  notes,
  keyword,
  onDelete,
  onArchive,
  dataTestId,
  emptyMessage,
}) {
  if (notes.length === 0) {
    return (
      <div
        className="notes-list__empty-message"
        data-testid={`${dataTestId}-empty`}
      >
        {emptyMessage}
      </div>
    );
  }

  const groups = groupNotesByMonth(notes);

  return (
    <>
      {groups.map((group) => (
        <section
          key={group.key}
          className="notes-group"
          data-testid={`${group.key}-group`}
        >
          <h3>{group.label}</h3>
          <span data-testid={`${group.key}-group-count`}>
            {group.notes.length} catatan
          </span>
          
          {/* Pembungkus utama diturunkan ke sini agar kartu tersusun horizontal */}
          <div className="notes-list" data-testid={dataTestId}>
            {group.notes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                keyword={keyword}
                onDelete={onDelete}
                onArchive={onArchive}
              />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

export default NotesList;
