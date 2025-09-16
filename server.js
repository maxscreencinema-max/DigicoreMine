cat > server.js <<EOL
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(express.json());
app.use(cors());

const users = [];
const wallets = [];
const pools = [];

const authenticateToken = (req,res,next)=>{
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if(!token) return res.sendStatus(401);
  jwt.verify(token,'secret', (err,user)=>{
    if(err) return res.sendStatus(403);
    req.user=user;
    next();
  });
};

app.post('/api/register', async (req,res)=>{
  const {username,password,referral}=req.body;
  const hashed=await bcrypt.hash(password,10);
  users.push({username,password:hashed,miners:0,earnings:0,referral:referral||null});
  wallets.push({username,balance:0,history:[]});
  res.status(201).send('User registered');
});

app.post('/api/login', async (req,res)=>{
  const {username,password}=req.body;
  const user = users.find(u=>u.username===username);
  if(!user) return res.status(400).send('User not found');
  const match = await bcrypt.compare(password,user.password);
  if(!match) return res.status(400).send('Invalid credentials');
  const token = jwt.sign({username:user.username},'secret',{expiresIn:'1h'});
  res.json({token});
});

app.get('/api/dashboard', authenticateToken,(req,res)=>{
  const user=users.find(u=>u.username===req.user.username);
  res.json({hashrate:user.miners*10+' MH/s',earnings:'$'+user.earnings.toFixed(2),miners:user.miners});
});

app.get('/api/wallet', authenticateToken,(req,res)=>{
  const wallet = wallets.find(w=>w.username===req.user.username);
  res.json(wallet);
});

app.post('/api/wallet/withdraw', authenticateToken,(req,res)=>{
  const {amount} = req.body;
  const wallet = wallets.find(w=>w.username===req.user.username);
  if(wallet.balance<amount) return res.status(400).send('Insufficient balance');
  wallet.balance-=amount;
  wallet.history.push({amount,date:new Date()});
  res.send('Withdrawal success');
});

app.get('/api/pools',(req,res)=>res.json(pools));
app.post('/api/pools', authenticateToken,(req,res)=>{
  const {name}=req.body;
  pools.push({name,owner:req.user.username,miners:[req.user.username]});
  res.send('Pool created');
});

const server = http.createServer(app);
const io = new Server(server,{cors:{origin:'*'}});

io.on('connection', socket=>{
  const interval=setInterval(()=>{
    users.forEach(u=>{
      u.earnings+=0.1;
      if(Math.random()<0.1) u.miners+=1;
    });
    socket.emit('miningStats', users.map(u=>({username:u.username,hashrate:u.miners*10+' MH/s',earnings:'$'+u.earnings.toFixed(2),miners:u.miners})));
  },3000);
  socket.on('disconnect',()=>clearInterval(interval));
});

server.listen(3000,()=>console.log('Backend running on port 3000'));
EOL
