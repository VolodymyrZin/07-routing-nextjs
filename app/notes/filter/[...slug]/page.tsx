'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import css from './NotesPage.module.css';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default function NotesPage({ params }: Props) {
  const { slug } = use(params);

  const tagFromUrl = slug ? slug[0] : undefined;
  const currentTag = tagFromUrl === 'all' ? undefined : tagFromUrl;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', currentTag],
    queryFn: () => fetchNotes({ tag: currentTag }),
  });

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <h2>
          {tagFromUrl && tagFromUrl !== 'all'
            ? `Tag: ${tagFromUrl}`
            : 'All Notes'}
        </h2>

        <Link href="/notes/action/create" className={css.button}>
          Create Note
        </Link>
      </div>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Failed to load notes.</p>}

      {data?.notes && data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        !isLoading && <p>No notes found for this tag.</p>
      )}
    </div>
  );
}
