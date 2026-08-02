'use client';

import { useParams } from 'next/navigation';
import NotePreview from '@/components/NotePreview/NotePreview';

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();

  return <NotePreview id={id} />;
}
