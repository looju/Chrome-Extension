// // // function button(){
// // //     console.log("hey")
// // // }
leads = [];
savedtabs=[];

const inputEl = document.getElementById("input-el"); // for input form
const inputBtn = document.getElementById("input-btn"); //for the button when the user clicks
const unOrdered = document.getElementById("ul-el"); // for the unordered list of elements
const AnchorEl = document.getElementById("anchor-el");
const DeleteEl = document.getElementById("delete-el"); // for the delete
const TabEl= document.getElementById("tab-btn");

DeleteEl.addEventListener("dblclick", function () {
  //dblclick listens for double click
  var clearleads = JSON.stringify(leads);
  localStorage.clear(clearleads);
  if (clearleads) {
    leads = " "; //set then leads array to be empty
    unOrdered.innerText = " ";
    render(leads); // the ul displays an empty innertext content
  }
});

TabEl.addEventListener("click",function(){// the purpose is to render out the tab value the user has saved
  chrome.tabs?.query({active:true, currentwindow:true}, function(tabs){//function(tabs) fetches the url directly from chrome
    savedtabs.push(tabs[0].url)//tabs[0].url will specifically get the url link in the array
    var tabstring=JSON.stringify(savedtabs);
    localStorage.setItem("tabvalue",tabstring)
    render(savedtabs)
  })
})
   // active staes that the current tab on the browser is the tab being viewed
   //current window specifies that it should be the current page  

function render(myleads) {
  //the purpose of this is to render what's in the input field as an unordered list
  var listitems = " ";
  for (i = 0; i < myleads.length; i += 1) {
    listitems += "<li><a target='_blank' href='" + myleads[i] + "'>" + myleads[i] + "</li></a>"; // if you don't add href, the anchor tag won't work
    // unOrdered.innerHTML += "<li>"+" " + leads[i]+"</li>";//innerHTML displays the value of the html tag within the javascript
  } // for loop to print out all the value of the leads array. This method replaces the jobs of line 14,16 and 19
  unOrdered.innerHTML = listitems;
} //this is the main function

var getItem = localStorage.getItem("leads"); //we first fetch the data
const leadsfromlocalStorage = JSON.parse(getItem); //we work with it in string form
if (leadsfromlocalStorage) {
  leads = leadsfromlocalStorage; //so that it holds the data from localStorage and since leads is displayed in renderleads()
  render(leads);
  //here we are trying to render out the saved values from the localStorage
}

inputBtn.addEventListener("click", function () {
  leads.push(inputEl.value); //whatsoever the user inputs into the form, inputEl.value stores it.
  //Leads.push simply adds it to the end of the array
  inputEl.value = " ";
  var leadstring = JSON.stringify(leads); //we first have to save the leads as a string
  localStorage.setItem("leads", leadstring); // now the localstorage is built
  render(leads); //calls the function
  inputEl.value = " "; //automatically sets the input field to be empty
});
