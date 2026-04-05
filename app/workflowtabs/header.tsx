import { Bell, ChevronDown, FileMinusCorner, MessageSquareMore, Search, Menu } from 'lucide-react';
import React, { useState } from 'react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="flex h-16 w-full items-center justify-between px-4 font-sans text-sm text-white">
      
      {/* LEFT SECTION: Brand/Team Switcher */}
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 rounded-lg bg-[#1a1a1a] px-3 py-1.5 transition hover:bg-[#252525]">
          <FileMinusCorner size={15} className="text-white" />
          <span className="font-bold whitespace-nowrap">All team creations</span>
          <ChevronDown size={15} className="text-white" />
        </button>
      </div>

      {/* RIGHT SECTION: Actions & Profile */}
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* Search - Hidden on very small screens, shown on small+ */}
        <button className="hidden sm:flex p-2 rounded-xl cursor-pointer bg-[#111111] text-white hover:bg-[#222]">
          <Search size={15} />
        </button>

        {/* Contact Sales - Hidden on mobile/tablet */}
        <button className="hidden lg:block rounded-xl bg-[#1a1a1a] px-4 py-1.5 font-bold transition hover:border-gray-500 border border-transparent">
          Contact Sales
        </button>

        {/* Upgrade Button - Always visible but smaller on mobile */}
        <div className="relative">
          <button className="flex items-center gap-1 md:gap-2 rounded-lg bg-[#2b1d4a] px-3 md:px-4 py-1.5 font-semibold text-[#b794f4] transition hover:bg-[#36265e]">
            <span>👑</span>
            <span className="hidden xs:inline">Upgrade</span>
          </button>
          <span className="absolute -bottom-2 right-0 md:right-1 rounded-full bg-[#ff006e] px-1.5 py-0.5 text-[9px] md:text-[10px] font-bold text-white shadow-lg">
            -30%
          </span>
        </div>

        {/* User Workspace Dropdown - Hidden on mobile */}
        <button className="hidden md:flex items-center gap-2 rounded-lg border border-gray-800 bg-black px-2 py-1 transition hover:bg-[#111]">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2d5a27] text-[10px] font-bold">
            A
          </div>
          <span className="max-w-[80px] lg:max-w-[100px] truncate">anishali28's p...</span>
          <ChevronDown size={15} className="text-gray-500" />
        </button>

        {/* Utility Icons & Profile */}
        <div className="flex items-center gap-2 md:gap-4 ml-1 md:ml-0">
          <div className="hidden sm:flex items-center gap-3 text-white">
            <MessageSquareMore size={18} className="cursor-pointer hover:opacity-80" />
            <Bell size={18} className="cursor-pointer hover:opacity-80" />
          </div>
          
          {/* Avatar Profile */}
          <div className="h-8 w-8 cursor-pointer overflow-hidden rounded-full border border-gray-700 bg-blue-500 flex-shrink-0">
            <img 
              src="/path-to-your-avatar.jpg" 
              alt="User" 
              className="h-full w-full object-cover"
              onError={(e) => e.currentTarget.src = 'https://ui-avatars.com/api/?name=Anish+Ali&background=0D8ABC&color=fff'} 
            />
          </div>

          {/* Mobile Menu Toggle (Only visible on small screens) */}
          <button 
            className="md:hidden p-1 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;