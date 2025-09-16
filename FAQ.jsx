cat > src/components/FAQ.jsx <<EOL
import React, { useState } from 'react';
const faqs=[{q:'How do I start mining?',a:'Register and login, then start mining in dashboard.'},{q:'How do I withdraw earnings?',a:'Go to Wallet, enter amount and click Withdraw.'},{q:'Can I create a mining pool?',a:'Yes, go to Mining Pools and create one.'}];
const FAQ=()=>{ const [search,setSearch]=useState(''); return (<div className="p-6"><h2 className="text-2xl font-bold mb-4">FAQ</h2><input placeholder="Search FAQ" value={search} onChange={e=>setSearch(e.target.value)} className="border p-2 mb-4"/><ul className="list-disc pl-5">{faqs.filter(f=>f.q.toLowerCase().includes(search.toLowerCase())).map((f,i)=><li key={i}><strong>{f.q}</strong>: {f.a}</li>)}</ul></div>);}
export default FAQ;
EOL
