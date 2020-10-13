'use strict';


// global variables

var totalVotes = 0; // added from code review 10/13
var productOneElement = document.getElementById('image-one');  // first product image
var productTwoElement = document.getElementById('image-two');  // second product image
var productThreeElement = document.getElementById('image-three');  // third product image 
var recentRandomNumbers = [];
var allProduct = [];
var button = document.createElement('BUTTON');


// constructor function (Product)
function Product(filepath, imageName) {
    this.filepath = filepath;  /// file path for images 
    this.name = imageName;   /// image description
    this.votes = 0;  // vote counter
    this.views = 0;  // views counter // added from code review 10/13 

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


// render function

function productImageRender(imageElement) {  //good
    var randomProductIndex = getRandomNumber(0, allProduct.length - 1);  // good


    // this makes sure we have a unique image
    while (recentRandomNumbers.includes(randomProductIndex)) {
        randomProductIndex = getRandomNumber(0, allProduct.length - 1); //good
        //console.log(randomProductIndex);
    }

    imageElement.src = allProduct[randomProductIndex].filepath;
    imageElement.alt = allProduct[randomProductIndex].name;
    imageElement.title = allProduct[randomProductIndex].name;

    // views
    allProduct[randomProductIndex].views++; // added 10/13

    if (recentRandomNumbers.length > 5) { //  added 10/13
        recentRandomNumbers.shift();
    }


}


// helper functions////////////// find a random number within a range
// random number function generator

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// click function
function handleClick(event) {
    var selectedProduct = event.target.title;

    for (var i = 0; i < allProduct.length; i++) {
        if (selectedProduct === allProduct[i].name) {
            // console.log('increased votes for ', allProduct[i].name);
            allProduct[i].votes++;
        }
    }

    productImageRender(productOneElement);
    productImageRender(productTwoElement);
    productImageRender(productThreeElement);


    // increment total votes
    totalVotes++;
    if (totalVotes >= 25) {
        document.getElementById('product-container').removeEventListener('click', handleClick); //removes event listener
        // display results 
        renderViewsButton();
        // ul element is the parent on html
    }
}
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


// set up event listener - image clicks

document.getElementById('product-container').addEventListener('click', handleClick);

productImageRender(productOneElement);
productImageRender(productTwoElement);
productImageRender(productThreeElement);


////notes

//loop over our allProducts array
//create an li
// fill it with content
// append to the parent


// iterate over allProducts array and create a products name array for my labels
// same thing but for votes go in data
// another for views maybe

//// add charts



///////////////////////////////////////////////////////////////////////////////////////////////////////

// // event listener  // listen for click
// productContainer.addEventListener('click', function (event) {

//     // add view results button 
//     // make 3 images go away and bring 3 new images in 
//     productImageRender(productOneElement);
//     productImageRender(productTwoElement);
//     productImageRender(productThreeElement);

    // tracking votes // loop over product array and see if title matches 

    // var selectedProduct = event.target.title;

    // for (var i = 0; i < allProduct.length; i++) {
    //     if (selectedProduct === allProduct[i].name) {
    //         console.log('increased votes for ', allProduct[i].name);
    //         allProduct[i].votes++;
    //     }
    // }

    // if else statement to generate count of numbers 


    // figure out which product was clicked on and increase votes
// })



// productImageRender(productOneElement);
// productImageRender(productTwoElement);
// productImageRender(productThreeElement);







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

