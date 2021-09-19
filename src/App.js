import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers'
import Token from './artifacts/contracts/RCToken.sol/RCToken.json';
import { Button, TextField, Snackbar, Alert } from '@mui/material';

const tokenAddress = "0x47690CC4C0c91be612A643D85195F4D57488dE97"

function App() {
  const [userAccount, setUserAccount] = useState();
  const [amount, setAmount] = useState();
  const [error, setError] = useState();
  const [balance, setBalance] = useState();

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
      const balance = await contract.balanceOf(account);
      console.log("Balance: ", balance.toString());
      setBalance(balance.toString())
    }
  }

  async function sendCoins() {
    let error;

    if (!amount) {
      error = "You need to fill the amount \n";
    }
    if (!userAccount) {
      error += "You need to fill the user account \n";
    }
    if (error) {
      return setError(error)
    }

    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transation = await contract.transfer(userAccount, amount);
      await transation.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div class="buttonWrapper">
          <TextField className="text-field" onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
          <TextField className="text-field" onChange={e => setAmount(e.target.value)} placeholder="Amount" />
        </div>
        <div class="buttonWrapper">
          <Button variant="contained" className="button" onClick={getBalance}> Get Balance </Button>
          <Button variant="contained" className="button" onClick={sendCoins}>Send Coins</Button>
        </div>
      </header>
      <Snackbar open={error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar open={balance} autoHideDuration={6000} onClose={() => setBalance(null)}>
        <Alert onClose={() => setBalance(null)} severity="success" sx={{ width: '100%' }}>
          {balance}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;