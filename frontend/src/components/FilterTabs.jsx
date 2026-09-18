import React from 'react';

export default function FilterTabs({ activeTab, onSelectTab }) {
  const tabs = [
    { id: 'EDITORS_PICKS', label: "Editor's Picks" },
    { id: 'LATEST_DROPS', label: "Latest Drops" },
    { id: 'MOST_LOVED', label: "Most Loved" },
    { id: 'ALL', label: "All Editions" }
  ];

  return (
    <div className="py-8 flex justify-center items-center bg-forme-green border-t border-white/10">
      <div className="flex items-center space-x-6 sm:space-x-10 text-xs sm:text-sm uppercase tracking-widest font-medium">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`relative py-2 transition duration-200 ${
                isActive 
                  ? 'text-white font-semibold' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {tab.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white rounded-full transition-all"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
