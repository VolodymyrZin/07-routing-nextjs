'use client';

import { use, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import css from './Modal.module.css';

type Props = {
  params: Promise<{ id: string }>;
};

export default function NoteModal({ params }: Props) {
  const router = useRouter();
  const { id } = use(params);

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const closeModal = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  return (
    <div className={css.backdrop} onClick={closeModal}>
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <button type="button" className={css.closeButton} onClick={closeModal}>
          Close
        </button>

        {isLoading && <p>Loading...</p>}
        {isError && <p>Failed to load note.</p>}

        {note && (
          <div className={css.content}>
            <h2>{note.title}</h2>
            <p>
              <strong>Tag:</strong> {note.tag}
            </p>
            <p>{note.content}</p>
            <p>
              <small>
                Created at: {new Date(note.createdAt).toLocaleDateString()}
              </small>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
