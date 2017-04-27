// load and save options for MAKA

// Saves options to chrome.storage
function save_options() {
  
  var pauseBU = document.getElementById('pauseBU').checked;

  var blockSteeveBriois = document.getElementById('blockSteeveBriois').checked;
  var blockNicolasBay = document.getElementById('blockNicolasBay').checked;
  var blockWalleranddeSaintJust = document.getElementById('blockWalleranddeSaintJust').checked;
  var blockLouisAliot = document.getElementById('blockLouisAliot').checked;
  var blockJeanFrançoisJalkh = document.getElementById('blockJeanFrançoisJalkh').checked;
  var blockFlorianPhilippot = document.getElementById('blockFlorianPhilippot').checked;
  var blockBureauPolitique = document.getElementById('blockBureauPolitique').checked;
  var blockComiteCentral = document.getElementById('blockComiteCentral').checked;
  var blockCommissiondInvestiture = document.getElementById('blockCommissiondInvestiture').checked;



  chrome.storage.local.set({

    pauseBU: pauseBU,

    blockSteeveBriois: blockSteeveBriois,
    blockNicolasBay: blockNicolasBay,
    blockWalleranddeSaintJust: blockWalleranddeSaintJust,
    blockLouisAliot: blockLouisAliot,
    blockJeanFrançoisJalkh: blockJeanFrançoisJalkh,
    blockFlorianPhilippot: blockFlorianPhilippot,
    blockBureauPolitique: blockBureauPolitique,
    blockComiteCentral: blockComiteCentral,
    blockCommissiondInvestiture: blockCommissiondInvestiture

  }, function() {
    // Update status to let user know options were saved.
    var save = document.getElementById('save');
    save.textContent = 'Options sauvegardées';
    setTimeout(function() {
      save.textContent = 'Fleurissez moi les tous!';
    }, 2000);
  });
}


// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value 
  chrome.storage.local.get({

    pauseBU: false,

    blockSteeveBriois: false,
    blockNicolasBay: false,
    blockWalleranddeSaintJust: false,
    blockLouisAliot: false,
    blockJeanFrançoisJalkh: false,
    blockFlorianPhilippot: false,

    blockBureauPolitique: false,
    blockComiteCentral: false,
    blockCommissiondInvestiture: false

  }, function(items) {

    document.getElementById('pauseBU').checked = items.pauseBU;

    document.getElementById('blockSteeveBriois').checked = items.blockSteeveBriois;
    document.getElementById('blockNicolasBay').checked = items.blockNicolasBay;
    document.getElementById('blockWalleranddeSaintJust').checked = items.blockWalleranddeSaintJust;
    document.getElementById('blockLouisAliot').checked = items.blockLouisAliot;
    document.getElementById('blockJeanFrançoisJalkh').checked = items.blockJeanFrançoisJalkh;
    document.getElementById('blockFlorianPhilippot').checked = items.blockFlorianPhilippot;

    document.getElementById('blockBureauPolitique').checked = items.blockBureauPolitique;
    document.getElementById('blockComiteCentral').checked = items.blockComiteCentral;
    document.getElementById('blockCommissiondInvestiture').checked = items.blockCommissiondInvestiture;

  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
