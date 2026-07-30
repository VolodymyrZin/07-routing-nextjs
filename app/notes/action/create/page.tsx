'use client';

import { useRouter } from 'next/navigation';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './NoteForm.module.css';

export default function CreateNotePage() {
  const router = useRouter();

  const handleCancel = () => {
    router.push('/notes/filter/all');
  };

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create new note</h1>
        <NoteForm onCancel={handleCancel} />
      </div>
    </main>
  );
}
