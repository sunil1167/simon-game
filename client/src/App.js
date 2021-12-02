import React, { Component } from "react";
import SimoGameContract from "./contracts/SimonContract.json";
import Web3 from "web3";

import "./App.css";

class App extends Component {
  state = { web3: null, accounts: null, contract: null };
  
  // Post component mount.
  componentDidMount = async () => {
      const web3 = new Web3(window.ethereum);
      this.setState({ web3 });
      // Check if wallet is already connected.
      const _accounts = await window.ethereum.request({ method: 'eth_accounts' })
      if (_accounts.length === 0) {
        console.log("Metamask is Disconnected");
      } else {
        console.log("Metamask is Connected");
        await this.handleConnectWallet();
      }
  };

  // Wallet connect code.
  handleConnectWallet = async () => {
    // [Sunil] Disable click button
    if (window.ethereum) {
      try {
        const web3 = this.state.web3;
        const ethereum = window.ethereum;
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = SimoGameContract.networks[networkId];
        const contract = new web3.eth.Contract(
          SimoGameContract.abi,
          deployedNetwork && deployedNetwork.address
        );
        this.setState({ accounts, contract });
        console.log("Loaded web3 and account: " + account);
        // [Sunil] Display account in the place of "Connect Wallet" and keep the button disabled.
        // await contract.methods.addUser().send({ from: account });
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
        // [Sunil] Enable back the button.
      }
    } else {
      console.log("No web3 connection");
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button onClick={this.handleConnectWallet} className="connect_btn">
            Connect Wallet
          </button>
        </div>
        <h1 id="level-title">Press A Key to Start</h1>
        <div className="container">
          <div className="row">
            <div type="button" id="green" className="btn green"></div>
            <div type="button" id="red" className="btn red"></div>
          </div>

          <div className="row">
            <div type="button" id="yellow" className="btn yellow"></div>
            <div type="button" id="blue" className="btn blue"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
