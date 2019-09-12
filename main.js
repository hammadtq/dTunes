const Filestorage = require('@skalenetwork/filestorage.js/src/index');
const skale_chain = "https://gc02.skalenodes.com:10106/"
const Web3HDWalletProvider = require("web3-hdwallet-provider");
var mnemonic = "";
const web3Provider = new Web3.providers.HttpProvider(
  skale_chain
);
var provider = "";
//const userWallet = "0x2B522cABE9950D1153c26C1b399B293CaA99FcF9";
var privateKey = ""
const contract_ABI = [{"constant": false,"inputs": [{"name": "entityAddress","type": "address"}],"name": "deleteEntity","outputs": [{"name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "entityAddress","type": "address"},{"name": "entityData","type": "uint256"}],"name": "newEntity","outputs": [{"name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "entityAddress","type": "address"},{"name": "entityData","type": "uint256"}],"name": "updateEntity","outputs": [{"name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "","type": "uint256"}],"name": "entityList","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "entityStructs","outputs": [{"name": "entityData","type": "uint256"},{"name": "listPointer","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "getEntityCount","outputs": [{"name": "entityCount","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "entityAddress","type": "address"}],"name": "isEntity","outputs": [{"name": "isIndeed","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"}]
const contract_address = '0x83b4cfa69f6aa801a27989f5121395ff317dc9e6';
var userWallet = "";

window.setupWallets = async function(id)
{
  console.log("setting");
  if (id == 1){
    mnemonic = 'gesture rather obey video awake genuine patient base soon parrot upset lounge';
    privateKey = "1ABA488300A9D7297A315D127837BE4219107C62C61966ECDF7A75431D75CC61"
  }else{
    mnemonic = 'panda super task armed flower issue unknown slab spin tennis pulse clown';
    privateKey = "FB050B87923477BA147F8FFEBD65226038A966EEB6960C9AD1760781B365808C"
  }
  console.log(mnemonic);
  provider = new Web3HDWalletProvider(mnemonic, web3Provider);
  await setupContract();
}
window.setupContract = async function(){
console.log("contract");
  let web3 = new Web3(provider);
  await web3.eth.getAccounts(function(error, userWallets) {

			console.log(userWallets[0]);
			userWallet = userWallets[0];
	});
  console.log("userWallet number is"+userWallet);
  // const contractInstance = new web3.eth.Contract(contract_ABI, contract_address);
  // console.log(contractInstance);
  // let entityList = await contractInstance.methods.isEntity(userWallet).call();
  // return entityList;
}

window.uploadFile = async function(){
  //let filestorage = new Filestorage('https://gc02.skalenodes.com:10106/');
  event.preventDefault();
  var result = "not yet";
  //create web3 connection

  let web3 = new Web3(provider);

  //get filestorage instance
  let filestorage = new Filestorage(web3, true);

  //provide your userWallet & private key
  //note this must include the 0x prefix
  //let privateKey = '0xB93859F13A7D5A9F27F13711A27C209C4F7A7139697E81844B4AA99709F1314C';
  //let userWallet = "0x8491afbbBF11c37D38C6F88f6DBDAd3c77Add9B7";

  //get file data from file upload input field
  let file = document.getElementById('files').files[0];
  let reader = new FileReader();

  //file storage method to upload file
  reader.onload = async function(e) {
    const arrayBuffer = reader.result
    const bytes = new Uint8Array(arrayBuffer);
    let link = await filestorage.uploadFile(
      userWallet,
      file.name,
      bytes,
      privateKey
    );
    console.log("File uploaded at" + link);
    toastr.info("Uploaded file");
    location.reload();
  };
  reader.readAsArrayBuffer(file);

}

window.internalFileUpload = async function(){

}

window.getFiles = async function(){

  let web3 = new Web3(provider);

  //get filestorage instance
  let filestorage = new Filestorage(web3, true);

  //provide your userWallet & private key
  //let userWallet = "0x8491afbbBF11c37D38C6F88f6DBDAd3c77Add9B7";
  console.log(userWallet.substring(2));
  let files = await filestorage.listDirectory(
    userWallet.substring(2)
  );
  console.log(files);
  return files;
}

window.deleteFile = async function(fileName){


  let web3 = new Web3(provider);

  //get filestorage instance
  let filestorage = new Filestorage(web3, true);

  //provide your userWallet & private key
  //note this must include the 0x prefix
  // let privateKey = '[YOUR_PRIVATE_KEY]';
  // let userWallet = "[YOUR_userWallet_ADDRESS]";

  await filestorage.deleteFile(userWallet, fileName, privateKey);
  location.reload();
}

window.downloadFileToDesktop = async function(link) {

  let web3 = new Web3(provider);

  //get filestorage instance
  let filestorage = new Filestorage(web3, true);
  await filestorage.downloadToFile(link);
}
