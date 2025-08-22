import { ReactNode } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';

export default function MaidLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="maid" />
      <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
        {children}
      </main>
    </div>
  )
}
// src/app/maid/layout.tsx
<Sidebar userRole="maid" />