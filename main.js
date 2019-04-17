"use strict";

function renderCoffee(coffee) {
    var html='<div class="col-6 coffee">';
    html+="<div class='row'><div class='col-sm-12 col-md-auto px-0'>";
    html+="<strong>"+coffee.name+"</strong></div>";
    html+="<div class='col-md px-0 px-md-2'><small class='text-muted'>"+coffee.roast+"</small>";
    html+="</div></div></div>";
    return html;
}

function renderCoffees(coffees) {
    var html = '';
    for(var i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function addCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var newRoastType = roastType.value;
    var newCoffeeName = coffeeName.value;
    var newId = coffees[coffees.length].id+1;
    if ( newCoffeeName === "") {
        return false;
    }
    coffees.push({id:newId,name:newCoffeeName,roast:newRoastType});
    updateCoffees();
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var nameFilter = coffeeFilter.value;
    var filteredCoffees = [];
    // iterate through function for specific coffee
    coffees.forEach(function(coffee) {
        // filter out coffee based on name
        if (coffee.name.toLowerCase().includes(nameFilter.toLowerCase())) {
            // filter for selected type of roast
            if (selectedRoast === "all") {
                filteredCoffees.push(coffee);
            } else {
                if (coffee.roast === selectedRoast) {
                    filteredCoffees.push(coffee);
                }
            }
        }
    });
    coffeeList.innerHTML = renderCoffees(filteredCoffees);
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
// coffee object array
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'}
];

var coffeeList = document.querySelector('#coffee-list');

var submitButton = document.querySelector('#submitFilter');
var coffeeFilter = document.querySelector('#coffee-filter');
var roastSelection = document.querySelector('#roast-selection');

var roastType = document.querySelector("#roast-type");
var coffeeName = document.querySelector("#coffee-name");
var submitAddCoffee = document.querySelector("#add-coffee");


coffeeList.innerHTML = renderCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);
submitAddCoffee.addEventListener('click', addCoffees);
