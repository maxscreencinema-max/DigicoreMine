cat > src/components/Navbar.jsx <<EOL
import React from 'react';
const Navbar = ({ setPage }) => (
  <nav className="bg-gray-800 text-white p-4 flex justify-between">
    <h1 className="font-bold text-xl cursor-pointer" onClick={()=>setPage('dashboard')}>LostMining Clone</h1>
    <div className="space-x-4">
      <button onClick={()=>setPage('dashboard')} className="hover:underline">Dashboard</button>
      <button onClick={()=>setPage('wallet')} className="hover:underline">Wallet</button>
      <button onClick={()=>setPage('pools')} className="hover:underline">Mining Pool</button>
      <button onClick={()=>setPage('pricing')} className="hover:underline">Pricing</button>
      <button onClick={()=>setPage('faq')} className="hover:underline">FAQ</button>
    </div>
  </nav>
);
export default Navbar;
EOL
