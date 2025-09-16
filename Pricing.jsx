cat > src/components/Pricing.jsx <<EOL
import React from 'react';
const Pricing=()=>{ const plans=[{name:'Basic',price:'$5',miners:1,hashrate:'10 MH/s'},{name:'Pro',price:'$20',miners:5,hashrate:'60 MH/s'},{name:'Ultimate',price:'$50',miners:15,hashrate:'200 MH/s'}]; return (<div className="p-6"><h2 className="text-2xl font-bold mb-4">Pricing Plans</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-4">{plans.map((p,i)=><div key={i} className="border rounded p-4 hover:shadow-lg"><h3 className="font-bold">{p.name}</h3><p>Price: {p.price}</p><p>Miners: {p.miners}</p><p>Hashrate: {p.hashrate}</p><button className="bg-green-500 text-white p-2 rounded mt-2">Buy</button></div>)}</div></div>);}
export default Pricing;
EOL
