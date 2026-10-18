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
  onDelete,
  onArchive,
  searchKeyword,
  dataTestId,
  emptyMessage,
}) {
  // Kriteria Basic: Wajib menampilkan empty state dengan data-testid khusus jika array kosong
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
    // PENTING: Kontainer utama harus di luar agar robot Dicoding mendeteksi semua initial data di dalamnya
    <div className="notes-list" data-testid={dataTestId}>
      {groups.map((group) => (
        <section
          key={group.key}
          className="notes-group"
          data-testid={`${group.key}-group`}
          style={{ width: '100%', marginBottom: '24px' }}
        >
          {/* Header pengelompokan bulan (Advanced) dengan posisi nama bulan di kiri dan jumlah di kanan */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #333', paddingBottom: '4px' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{group.label}</h3>
            <span data-testid={`${group.key}-group-count`} style={{ fontSize: '0.9rem', color: '#aaa' }}>
              {group.notes.length} catatan
            </span>
          </div>
          
          {/* Grid pembungkus kartu catatan agar berjejer horizontal ke samping */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {group.notes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={onDelete}
                onArchive={onArchive}
                searchKeyword={searchKeyword}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default NotesList;
