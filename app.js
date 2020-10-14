'use strict';


// global variables

var totalVotes = 0; // added 10/13
var productOneElement = document.getElementById('image-one');  // first product image
var productTwoElement = document.getElementById('image-two');  // second product image
var productThreeElement = document.getElementById('image-three');  // third product image 
var button = document.createElement('BUTTON');  //views button
var allProduct = [];
var recentRandomNumbers = [];
var maximumClicks = 25;  //max amount of clicks


// constructor function (Product objects)
function Product(filepath, name, votes = 0, views = 0) {  // (parameters added votes, views = 0 here)
    this.filepath = filepath;  /// file path for images 
    this.name = name;   /// image description
    this.votes = votes;  // vote counter  // added votes = votes for local storage
    this.views = views;  // views counter // added views = views local storage
    // this.votes = 0  // old code
    // this.views = 0 // old code
    // add something here for constructor function to go through for JSON 

    allProduct.push(this);
}

// object instances  //// with filepath, file name
new Product('img/img/bag.jpg', 'bag');
new Product('img/img/banana.jpg', 'banana');
new Product('img/img/bathroom.jpg', 'bathroom');
new Product('img/img/boots.jpg', 'boots');
new Product('img/img/breakfast.jpg', 'breakfast');
new Product('img/img/bubblegum.jpg', 'bubblegum');
new Product('img/img/chair.jpg', 'chair');
new Product('img/img/cthulhu.jpg', 'cthulhu');
new Product('img/img/dog-duck.jpg', 'dog-duck');
new Product('img/img/dragon.jpg', 'dragon');
new Product('img/img/pen.jpg', 'pen');
new Product('img/img/pet-sweep.jpg', 'pet-sweep');
new Product('img/img/scissors.jpg', 'scissors');
new Product('img/img/shark.jpg', 'shark');
new Product('img/img/sweep.png', 'sweep');
new Product('img/img/tauntaun.jpg', 'tauntaun');
new Product('img/img/unicorn.jpg', 'unicorn');
new Product('img/img/usb.gif', 'usb');
new Product('img/img/water-can.jpg', 'water-can');
new Product('img/img/wine-glass.jpg', 'wine-glass');
//console.log(allProduct);
//console.log('1. my all Product array:', allProduct);

////////Local storage ////////////////////////////////////////////////////////////////////////////////////////////////////////

// var stringifyProducts = JSON.stringify(allProduct);

// //console.log('2. my all Product array as JSON', stringifyProducts);

// localStorage.setItem('product', stringifyProducts);

function checkLocalStorage() {
    var productFromLocalStorage = localStorage.getItem('product');
    //console.log('3. product from local storage', productFromLocalStorage);

    if (productFromLocalStorage) {

        var parseProduct = JSON.parse(productFromLocalStorage);
        //console.log('4. parsed product from local storage:', parseProduct);

        for (var i = 0; i < parseProduct.length; i++) {

            new Product(parseProduct[i].name, parseProduct[i].filepath, parseProduct[i].votes, parseProduct[i].views);

            //console.log('parseProducts[i].name', parseProduct[i].name);
        }
    } else {
        generateNewObjectInstances();
    }
}
// step 2. put my JSON into local storage
// works by taking 2 value - a key and value
// key is whatever you want, value is the jSON you are putting in local storage

// step 3. get product out of local storage
// getItems - just takes the key
// step 4. parse product array that I got back 

// goal for local storage:
// goal track totals between page refresh so that I can track the number of votes
// store products array into local storage as JSON string
// retrieve product from local storage and utilize json.parse() function
// you will have to send each item in array through constructor function

// 4 functions
// 1 to check for local storage

// function checkForLocalStorage() {

// }

// 1 to retrieve from local storage takes in a key and value  
// key is what you want, value is the jSON you are putting in LS
// 1 to rebuild 
// 1 to save local storage

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// render function

function productImageRender(imageElement) {  //working

    var randomProductIndex = getRandomNumber(0, allProduct.length - 1);  //working


    // this makes sure we have a unique image
    while (recentRandomNumbers.includes(randomProductIndex)) {
        randomProductIndex = getRandomNumber(0, allProduct.length - 1); //working
        //console.log(randomProductIndex);
    }

    imageElement.src = allProduct[randomProductIndex].filepath;
    imageElement.alt = allProduct[randomProductIndex].name;
    imageElement.title = allProduct[randomProductIndex].name;

    // views
    allProduct[randomProductIndex].views++; // added 10/13
    recentRandomNumbers.push(randomProductIndex);
    if (recentRandomNumbers.length > 5) { //  added 10/13
        recentRandomNumbers.shift();



        //// storage array prep spot 
        /// push local storage spot
        var stringifyProducts = JSON.stringify(allProduct);      // added for local storage 10/14
        //console.log('2. my all Product array as JSON', stringifyProducts);   // added for local storage 10/14
        localStorage.setItem('product', stringifyProducts);   // added for local storage 10/14

    }

}

// helper functions
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// click function
function handleClick(event) {
    var selectedProduct = event.target.title;

    for (var i = 0; i < allProduct.length; i++) {
        if (selectedProduct === allProduct[i].name) {

            allProduct[i].votes++;
        }
    }

    productImageRender(productOneElement);
    productImageRender(productTwoElement);
    productImageRender(productThreeElement);


    // increment total votes
    totalVotes++;
    if (totalVotes >= maximumClicks) {
        document.getElementById('product-container').removeEventListener('click', handleClick); //removes event listener

        renderChart();


    }
}

// //// storage array prep spot 
// /// push local storage spot
// var stringifyProducts = JSON.stringify(allProduct);      // added for local storage 10/14
// console.log('2. my all Product array as JSON', stringifyProducts);   // added for local storage 10/14
// localStorage.setItem('product', stringifyProducts);   // added for local storage 10/14


// render 
function renderViewsButton() {
    button.innerHTML = 'View Results';
    document.body.appendChild(button);
}

button.addEventListener('click', getResultsClick);
function getResultsClick(event) {
    var ulElement = document.getElementById('results');

    // loop over all pictures 
    for (var i = 0; i < allProduct.length; i++) {
        var liElement = document.createElement('li');
        liElement.textContent = `${allProduct[i].name} had ${allProduct[i].votes} votes and was seen ${allProduct[i].views} times.`;
        ulElement.appendChild(liElement);

    }
}

// generate chart
function makeProductChart() {
    var products = [];
    for (var i = 0; i < allProduct.length; i++) {
        products.push(allProduct[i].name);
    }

    var votes = [];
    for (var i = 0; i < allProduct.length; i++) {
        votes.push(allProduct[i].votes);

    }
    var views = [];
    for (var i = 0; i < allProduct.length; i++) {
        views.push(allProduct[i].views);
    }
    return [products, votes, views];
}


// render chart data

function renderChart() {
    var chartData = makeProductChart();

    var ctx = document.getElementById('myChart').getContext('2d');



    var votesOne = {
        label: 'Number of votes', // title
        data: chartData[1],  // # of votes

        backgroundColor:
            'rgba(69, 124, 211, 1)',

        borderWidth: 1,
        yAxisID: "y-axis-votes"
    };


    var viewsOne = {
        label: 'number of views',
        data: chartData[2],
        backgroundColor:
            'rgba(166, 69, 211, 1)',

        borderWidth: 1,
        yAxisID: "y-axis-votes"
    };

    var productTitle = {
        labels: chartData[0],
        datasets: [votesOne, viewsOne],
    };
    var chartOptions = {
        scales: {
            yAxes: [{
                id: "y-axis-votes"

            }],
            ticks: {
                beginAtZero: true
            }
        }

    }

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: productTitle,
        options: chartOptions
    })
}

// set up event listener - image clicks

document.getElementById('product-container').addEventListener('click', handleClick);

productImageRender(productOneElement);
productImageRender(productTwoElement);
productImageRender(productThreeElement);






            /////////////////////////////////////////// PLAN OF ACTION ////////////////////////////////////////////////////

            // math.random to return a random number between 0 and rhe length of an array
            // use number to be index for allImages array
            // imageOneElement.src = allImages[randomNumber];

            // Goal: render 3 images to dom
            // allow user to vote on which image they like best
            // keep track of votes
            // give user 25 selections
            //keep track of views

            // do this three times
            // go to my index and select img tag
            // fill img tag with content 
            // append to dom

            // I am going to create a constructor function and make image objects
            // filepath that will be src
            // name that will be alt and my title



            // when a user clicks on an image I need all 3 to go away and come up with 3 new images that they didnt just see
            // I need an event listener on the parent of all 3 images
            // listen on the image counter for a click
            // callback function to make all 3 images go away, and make 3 more images appear

            // user should get 25 rounds of voting 

            // keep number of rounds in a variable to allow number to be easily changed

            // button with view results which when clicked displays the list of products followed by votes received and number of timed seen

            ////notes

            //loop over our allProducts array
            //create an li
            // fill it with content
            // append to the parent

