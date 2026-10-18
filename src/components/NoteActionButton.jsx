import React from 'react';

const VARIANTS = {
  delete: {
    className: 'note-item__delete-button',
    testId: 'note-item-delete-button',
    label: 'Delete',
  },
  archive: {
    className: 'note-item__archive-button',
    testId: 'note-item-archive-button',
    label: 'Arsipkan',
  },
};

function NoteActionButton({ variant, onClick, children }) {
  const config = VARIANTS[variant] || VARIANTS.delete;

  return (
    <button
      className={config.className}
      type="button"
      onClick={onClick}
      data-testid={config.testId}
    >
      {children || config.label}
    </button>
  );
}

export default NoteActionButton;