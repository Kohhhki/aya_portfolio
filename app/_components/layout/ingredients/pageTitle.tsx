'use client';

import { useRouter } from 'next/navigation';

export default function PageTitle() {
  const router = useRouter();
  return (
    <div
      className="w-fit h-fit flex flex-row items-center gap-2 cursor-pointer select-none"
      onClick={() => router.push('/')}
    >
      <div className="flex items-center gap-1.5">
        <div className="w-6 h-6 rounded-md bg-foreground-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-sm bg-background-1" />
        </div>
        <span className="text-[17px] font-semibold text-foreground-0 tracking-tight">
          Basis
        </span>
      </div>
    </div>
  );
}
