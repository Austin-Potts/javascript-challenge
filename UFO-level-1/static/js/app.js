//assigning initial variables and creating basic table layout
// from data.js
var tableData = data;

//display data in console to make sure it loaded properly
console.log(tableData);

//using d3 select the filter type and value from the html file
var filterOption = d3.select("#filter_option");

// Select the filter button from html using d3
var filterButton = d3.select("#filter-btn");

// Get a reference to the table body
var tbody = d3.select("tbody");

//function to create rows and cells in front end
function makeTable(tableData) {
//for each loop to cut down on total lines of code, creates table based on tableData
tableData.forEach((ufo_data) => {
    // appending "tr" to the html table body to make rows
    var row = tbody.append("tr");

    //Iterating each row for key: values
    Object.entries(ufo_data).forEach(([key, value]) => {

        // appending "td" to the html table body to make cells
        var cell = row.append("td");
        cell.text(value);
    });
});
}

//loading data into new table
makeTable(tableData);

//---------------------------------------------------------------------------------------------------------------------
// function to search for input in data, clear table, and add in filtered data
filterButton.on("click", function() {
        
        // Prevent the page from refreshing and clear current table data
        d3.event.preventDefault();
        tbody.html("");

        //gather user input
        var inputElement = d3.select("#changefilter");
        var inputValue = inputElement.property("value");
        
        //handling user input errors
        if (inputValue == '') {
            alert("Please enter a value");
            d3.select("#changefilter").node().value = '';
            document.getElementById("#changefilter").focus();
            makeTable(tableData);
        }

        //selecting label tag from html and grabbing
        var typeVal = d3.select("label").attr("for"); 
        //trimming and making user input lowercase to handle mistakes
        var filteredData = tableData.filter(ufo_data => ufo_data[typeVal] === inputValue.trim().toLowerCase());

        //if no data returned show user message
        if (filteredData.length === 0) {
            alert("You did not enter a value in our database, please try again.");
            d3.select("#changefilter").node().value = '';
            makeTable(tableData);
        }

        //Displaying the data for user input 
        filteredData.forEach((ufo_data) => {

            // appending "tr" to the html table body to make rows
            var row = tbody.append("tr");

            //iteration
            Object.entries(ufo_data).forEach(([key, value]) => {

                //appending "td" to the html table body to make cells
                var cell = row.append("td");
                cell.text(value);
            });
        });



})
