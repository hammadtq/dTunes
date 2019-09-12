# dTunes
 This repository uses SKALE storage and contracts to manage music files

As MetaMask was not working with filestorage.js, I used truffle-hdwallet-provider to create 2 wallets and accounts that are used to demo the upload, download and delete functionality of the filestorage.

I have also written a contract that records the list of addresses that are uploading files to the storage, this list is then fetched to show all files available within the contract.

#Run Demo

To run, simply clone the repo and then use 'http-server' command to run the server. Open the given localhost URL in the browser to interact with the project.

I have used browserify to convert the node based hdwallet and filestorage.js, its static now and this package can be pushed on to IPFS.
