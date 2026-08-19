import React from 'react';
import { Users } from 'lucide-react';

interface BoardDirectorsLinkProps {
  onClick: () => void;
}

export function BoardDirectorsLink({ onClick }: BoardDirectorsLinkProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 right-8 z-40 group"
      title="Board of Directors"
    >
      {/* Animated pulse ring */}
      <div className="absolute inset-0 rounded-full bg-[#FF5C39]/30 animate-ping" />
      
      {/* Main glassy container */}
      <div className="relative bg-black/40 backdrop-blur-xl border border-[#FF5C39]/30 rounded-2xl shadow-lg shadow-[#FF5C39]/20 hover:bg-[#FF5C39]/20 hover:border-[#FF5C39]/60 hover:shadow-xl hover:shadow-[#FF5C39]/40 transition-all duration-300 px-4 py-3 flex flex-col items-center gap-1">
        <Users size={24} className="text-[#FF5C39] group-hover:scale-110 transition-transform duration-300" />
        <span className="text-[10px] text-white/90 uppercase tracking-wider font-semibold">Board</span>
      </div>
    </button>
  );
}