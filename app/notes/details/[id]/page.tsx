'use client';

import { use } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails.module.css';

type Props = {
  params: Promise<{ id: string }>;
};

export default function NoteDetailsPage({ params }: Props) {
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

  if (isLoading) return <p className={css.container}>Loading...</p>;
  if (isError || !note)
    return <p className={css.container}>Failed to load note.</p>;

  return (
    <div className={css.container}>
      <Link href="/notes/filter/all" className={css.backBtn}>
        ← Back to notes
      </Link>

      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </div>

        <p className={css.content}>{note.content}</p>

        <p className={css.date}>
          Created at: {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
