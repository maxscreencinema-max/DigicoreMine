cat > src/App.jsx <<EOL
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Wallet from './components/Wallet';
import MiningPool from './components/MiningPool';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';

const App=()=>{ 
  const [page,setPage]=useState('dashboard'); 
  const [token,setToken]=useState('sample_token'); // auto logged-in for demo

  return (<div>
    <Navbar setPage={setPage}/>
    {page==='dashboard' && <Dashboard token={token}/>}
    {page==='wallet' && <Wallet token={token}/>}
    {page==='pools'
