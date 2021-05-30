// Item list data array
var itemsPerPage = 30;
var AvaliableContractData = [];

// DOM Ready =============================================================
// Occurs after all HTML recieved, but before the page has been fully rendered
$(function() {

    // Populate the item list on initial page load
    populateList();

});

// Functions =============================================================

// Fill table with data
function populateList() {

    // Empty content string
    var listContent = '';
  
    // jQuery AJAX call for JSON
    $.getJSON( '/items', function( data ) {
        ItemListData = [...data];
        numberOfItems = data.length;

        listContent += '<div id="tableHead"><div id="nameHead"><span>NAME</span></div>';
        listContent += '<div id="priceHead"><span>PRICE</span></div></div>';

        for (var i=0; i<30; i++) {
            if (ItemListData[i].price != null && ItemListData[i]['price'].hasOwnProperty('24_hours')) { //only display items with price data
            listContent += '<div class="listing collapsible">';
            
            listContent += '<img src="https://community.cloudflare.steamstatic.com/economy/image/'+ItemListData[i].icon_url+'" style="float: left; height: 100px;">';
            
            listContent += '<div class="itemInfo"><p class="emphasis" style="font-size: 14px">'+ItemListData[i].name+'</p>';
            listContent += '<p>Counter-Strike: Global Offensive</p></div>'

            listContent += '<div class="priceBox"><p>Average (24 hours)</p>';
            listContent += '<p>Median (24 hours)</p></div>'
                
            listContent += '<div class="priceInfo"><p class="emphasis">$'+ItemListData[i]["price"]["24_hours"].average+' USD</p>';
            listContent += '<p class="emphasis">$'+ItemListData[i]["price"]["24_hours"].median+' USD</p></div>';
            }
            listContent += '</div>';
            
            //Dropdown per listing
            listContent += '<div class="content">';
            listContent += '<p>Contract price: $0 USD</p>';
            listContent += '<p>Contract balance: 0</p>';

            listContent += '<button>Buy Contract</button>';
            listContent += '<button>Sell Contract</button>';
            listContent += '</div>';
        }
      
        // add pagination later, for now just put the first 30 items
      
      
      console.log("sdf");

      //Inject content string into HTML
      document.getElementById("ulItemList").innerHTML = listContent;

      var coll = document.getElementsByClassName("collapsible");
      var i;

      for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
          this.classList.toggle("active");
          var content = this.nextElementSibling;
          if (content.style.display === "block") {
            content.style.display = "none";
            console.log("hide");
          } else {
            content.style.display = "block";
            console.log("show");
          }
  });
};      
   

        });
      };