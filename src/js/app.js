
App = {
	web3Provider: null,
	contracts: {},
	account: '0x0',
	loading: false,
	tokenPrice: 1000000000000000,
	tokensSold: 0,
	tokensAvaiable: 750000,
	init: function(){
		console.log("App initialized")
		return App.initWeb3();
	},

	initWeb3: function() {
    if (window.ethereum) {
      //If a web3 instance is already provided by Meta Mask.
      App.web3Provider = window.ethereum ;
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      window.web3  = new Web3(window.ethereum);
      window.ethereum.enable();
    }
   	
    return App.initContracts();
  // }
},

	initContracts: function(){
		$.getJSON("DappTokenSale.json", function(dappTokenSale) {
      App.contracts.DappTokenSale = TruffleContract(dappTokenSale);
      App.contracts.DappTokenSale.setProvider(App.web3Provider);
      App.contracts.DappTokenSale.deployed().then(function(dappTokenSale) {
        console.log("Dapp Token Sale Address:", dappTokenSale.address);

			});

      }).done(function(){
	    $.getJSON("DappToken.json", function(dappToken) {
	  App.contracts.DappToken = TruffleContract(dappToken);
      App.contracts.DappToken.setProvider(App.web3Provider);
      App.contracts.DappToken.deployed().then(function(dappToken) {
      	
      console.log("Dapp Token Address:", dappToken.address);
      console.log("Dapp Token Address:", window.web3);
	  	});
      App.listenForEvents();
      return App.render()
	  });
	})
  },

	// Listen for events emmitted from the contract
	listenForEvents: function() {
		App.contracts.DappTokenSale.deployed().then(function(instance){
			instance.Sell({},{
			 fromBlock: 0,	
			 toBlock: 'latest'
			}).watch(function(error, event){
				console.log("event triggered", event);
				App.render();
			})
		})
	},




render: function(){
 	if(App.loading){
 		return;
 	}
 	App.loading = true;

 	var loader = $('#loader');
 	var content = $('#content');

 	loader.show();
 	content.hide();


 	// Load account data
	web3.eth.getCoinbase(function(err,account){
		if(err === null ){
			App.account = account;
			//console.log("Account Address:", App.account);
			$('#accountAddress').html("Your Account:  " + account);
		 }	
	 })

	// laod token sale contract
	App.contracts.DappTokenSale.deployed().then(function(instance){
	var dappTokenSaleInstance = instance;
	return dappTokenSaleInstance.tokenPrice();	
	}).then(function(tokenPrice){
		 console.log("Dapp Token Address:", tokenPrice.toNumber());
		App.tokenPrice = tokenPrice;
		$('.token-price').html(web3.fromWei(App.tokenPrice, "ether").toNumber());
		App.tokenPrice = tokenPrice;
		//$('.token-price').html(web3.fromWei(App.tokenPrice, "ether"));
		});

	App.contracts.DappTokenSale.deployed().then(function(instance){
	var dappTokenSaleInstance = instance;
	return dappTokenSaleInstance.tokensSold();
	}).then(function(tokensSold){
		App.tokensSold = tokensSold.toNumber();
		$('.tokens-sold').html(App.tokensSold);
		$('.tokens-available').html(App.tokensAvaiable);

		var progressPercent = (Math.ceil(App.tokensSold)/ App.tokensAvaiable) * 100;
		$('#progress').css('width', progressPercent + '%');

		// Load token contract
		App.contracts.DappToken.deployed().then(function(instance){
			dappTokenInstance = instance;
			return dappTokenInstance.balanceOf(App.account);
		}).then(function(balance){
			$('.dapp-balance').html(balance.toNumber());

		App.loading = false;
	 	loader.hide();
	 	content.show();
		});
	});
  },


buyTokens: function(){
		$('#content').hide();
		$('#loader').show();
		var numberOfTokens = $('#numberOfTokens').val();
		App.contracts.DappTokenSale.deployed().then(function(instance){
			return instance.buyTokens(numberOfTokens, {
			from: App.account,
			value: numberOfTokens * App.tokenPrice,
			gas: 500000
		 });

		}).then(function(result){
			console.log("Tokens bought...");
			$('form').trigger('reset'); // Resest number of tokens in form
			// Wait for Sell event
			});
		}
	}		





$(function(){
	$(window).load(function(){
		App.init()
	})
});