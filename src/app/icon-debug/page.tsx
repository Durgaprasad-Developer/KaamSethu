"use client";

export default function IconDebugPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl mb-8">Icon Debug Page</h1>
      
      <div className="space-y-8">
        <div className="border border-white p-6">
          <h2 className="text-2xl mb-4">Test 1: Basic Icon</h2>
          <span className="material-symbols-outlined text-6xl">home</span>
          <p className="mt-2">Should show a home icon above</p>
        </div>

        <div className="border border-white p-6">
          <h2 className="text-2xl mb-4">Test 2: Filled Icon</h2>
          <span 
            className="material-symbols-outlined text-6xl" 
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
          <p className="mt-2">Should show a filled star above</p>
        </div>

        <div className="border border-white p-6">
          <h2 className="text-2xl mb-4">Test 3: Multiple Icons</h2>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-4xl">work</span>
            <span className="material-symbols-outlined text-4xl">person</span>
            <span className="material-symbols-outlined text-4xl">search</span>
            <span className="material-symbols-outlined text-4xl">notifications</span>
          </div>
          <p className="mt-2">Should show 4 icons above</p>
        </div>

        <div className="border border-white p-6">
          <h2 className="text-2xl mb-4">Debug Info</h2>
          <p>Font Family: <code className="bg-gray-800 px-2 py-1">Material Symbols Outlined</code></p>
          <p className="mt-2">Imported in: <code className="bg-gray-800 px-2 py-1">globals.css</code></p>
          <p className="mt-2">Check browser DevTools → Network tab for font loading</p>
        </div>
      </div>
    </div>
  );
}
