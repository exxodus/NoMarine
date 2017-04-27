// BelgiumUnited.js - part of Belgium United
// v1.1.5
// by Didier Lahousse
// based on MAKA by Tom Royal :: tomroyal.com

var BUTesting = false; // for debugging only

if (BUTesting){
	console.log('BU initiated');
	
	if (typeof jQuery != 'undefined') {  
    	console.log('jQ loaded');
	};
	
	var BUReplacements = 0;
	
}	

// init blacklist

var blacklist = [];// global array

blacklist.push("front national");
// a remettre blacklist.push("front-national");
// a remettre blacklist.push("frontnational");
blacklist.push(" fn");

blacklist.push("marine_le_pen");
blacklist.push("marinelepen");
blacklist.push("lepenmarine");

blacklist.push("le_pen_marine");
blacklist.push("pen marine");

blacklist.push("marine presidente");

blacklist.push("le pen");
//blacklist.push("marine le pen");
//blacklist.push("le pen marine");
//blacklist.push("lepenmarine");

blacklist.push("mlp");

// get additional settings from chrome storage

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
 
	  if (items.blockSteeveBriois){
		  blacklist.push("steeve briois");
		  blacklist.push("steeve-briois");
		  blacklist.push("s briois");
	  };
	  if (items.blockNicolasBay){
		  blacklist.push("nicolas bay");
		  blacklist.push("nicolas-bay");
		  blacklist.push("n bay");
	  };
	  if (items.blockWalleranddeSaintJust){
		  blacklist.push("wallerandde saint just");
		  blacklist.push("wallerandde-saint-just");
		  blacklist.push("saint just");
		  blacklist.push("saint-just");
		  blacklist.push("wallerandde st just");
		  blacklist.push("wallerandde-st-just");
	  };
	  if (items.blockLouisAliot){
		  blacklist.push("louis aliot");
		  blacklist.push("louis-aliot");
		  blacklist.push("l aliot");
	  };
	  if (items.blockJeanFrançoisJalkh){
		  blacklist.push("françois jalkh");
		  blacklist.push("françois-jalkh");
		  blacklist.push("francois jalkh");
		  blacklist.push("francois-jalkh");
		  blacklist.push("f jalkh");
	  };
	  if (items.blockFlorianPhilippot){
		  blacklist.push("florian philippot");
		  blacklist.push("florian-philippot");
		  blacklist.push("f philippot");
	  };
	  
    
 	  // do the search !
	  if (!items.pauseBU) {
 	  	document.addEventListener('DOMContentLoaded', BUnow(thePride), false);
	  } 
  });




// One "Pride Picture" data!
var thePride = {"pride": [
	{"file": "http://i.imgur.com/XboH7qw.jpg", "Credit": "pixabay.com", "URL": "", "type":"1"},
	{"file": "http://i.imgur.com/9MWypih.jpg", "Credit": "pixabay.com", "URL": "", "type":"1"},
	{"file": "http://i.imgur.com/ePqvLpP.jpg", "Credit": "pixabay.com", "URL": "", "type":"1"},
	{"file": "http://i.imgur.com/nrNU6to.jpg", "Credit": "pixabay.com", "URL": "", "type":"1"},
	{"file": "http://i.imgur.com/Io8Owu7.jpg", "Credit": "pixabay.com", "URL": "", "type":"1"},
	{"file": "http://i.imgur.com/bBb7rT2.jpg", "Credit": "pixabay.com", "URL": "", "type":"1"},
    ]
};


// Replace them...
function BUnow(thePride){


	if (BUTesting){
		console.log('maka processing blacklist is '+blacklist);
	}

	// called on page load. Searches all img alt text and srcs for the strings in blacklist, replaces with the Pride
	var pagepics=document.getElementsByTagName("img"), i=0, img;	
	while (img = pagepics[i++])
	{	
		var alttext = String(img.alt).toLowerCase();
		var imgsrc = String(img.src).toLowerCase();
		
		if (img.parentElement.nodeName != 'BODY'){
			// check parent innerHTML for blackilist
			var parenttag = img.parentElement.innerHTML.toLowerCase();
		}
		else {
			// prevent parse of entire doc
			var parenttag = '';
		};
		
		var imgwidth = img.clientWidth;
		var imgheight = img.clientHeight;

		var doit = false; 


		blacklist.forEach(function(blist) {	


			doit = false; 
			// check into alt text.
			if (alttext.indexOf(blist) != -1) {
				doit = true; 
			}

			// check into parent tag.
			if (parenttag.indexOf(blist) != -1) {
				doit = true; 
			}

			// check into src (but ignore base64 encoded src).
			if ((imgsrc.indexOf(blist) != -1) && (imgsrc.indexOf("data:image") == -1))  {
				doit = true; 
			}

			if  (doit) {
				
				// remove srcsets, forcing browser to the Pride - eg, BBC News
				if (img.hasAttribute('srcset')){
					img.removeAttribute('srcset');	
				};
				// remove source srcsets if children of same parent <picture> element - eg, the Guardian
				if (img.parentElement.nodeName == 'PICTURE'){
					var theparent = img.parentNode;
					for(var child=theparent.firstChild; child!==null; child=child.nextSibling) {
					    if (child.nodeName == "SOURCE"){
						    child.removeAttribute('src');
						    child.removeAttribute('srcset');
					    };
					};
					
				};
				
				// random pix here.
				var randflower = Math.floor(Math.random() * (thePride.pride.length));

				// main replacement here
				img.src = thePride.pride[randflower].file+'';
				img.width = imgwidth;
				img.height = imgheight;
				
				if (thePride.pride[randflower].type == 0){
					img.alt = 'Photo by '+thePride.pride[randflower].Credit+' source '+thePride.pride[randflower].URL+'';
				}
				else {
					img.alt = 'Photo by '+thePride.pride[randflower].Credit+'';
				};
				BUReplacements++;
			};
		});	
	}
	if (BUTesting){
		console.log('maka processing complete, replaced '+BUReplacements+' images');
	}	    
};

