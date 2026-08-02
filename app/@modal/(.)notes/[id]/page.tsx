'use client';

import { useRouter, useParams } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';

export default function NotePreviewModal() {
  const router = useRouter();
  const params = useParams();

  return (
    <Modal onClose={() => router.back()}>
      <NotePreview id={params.id as string} />
    </Modal>
  );
}
