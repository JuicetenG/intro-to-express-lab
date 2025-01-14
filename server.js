const express = require('express');

const app = express();

app.get('/', function(req, res) {
  res.send('<h1>hello</h1>');
});


//EXAMPLE 1
app.get('/greetings/:userName', function(req, res) {
  res.send(`<h1>Greetings my good pal, ${req.params.typeof(userName)}</h1>`)
}); 


//EXAMPLE 2
app.get('/roll/:number', function(req, res) {
  if(isNaN(req.params.number)) {
    res.send('<h1>You must specify a number</h1>')
  } else res.send(`<h1>You rolled a ${Math.floor(Math.random() * req.params.number)}</h1>`);
});


//EXAMPLE 3
app.get('/collectibles/:index', function(req, res) {
  const index = req.params.index;
  const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

  if(isNaN(index) || index > collectibles.length - 1) {
    res.send('<h1>This item is not yet in stock. Check back soon!</h1>')
  } else res.send(`<h1>The ${collectibles[index].name} can be yours for 
    just $${collectibles[index].price}</h1>`);
});


//EXAMPLE 4
const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', function(req, res) {
  const {'min-price': minPrice,  'max-price': maxPrice, type} = req.query;

  let filteredArray = shoes;
  
  if(minPrice) {
    filteredArray = filteredArray.filter(shoe => shoe.price >= minPrice);
  }

  if(maxPrice) {
    filteredArray = filteredArray.filter(shoe => shoe.price <= maxPrice);
  }

  if(type) {
    filteredArray = filteredArray.filter(shoe => shoe.type === type);
  }

  res.send(filteredArray);
  
});

app.listen(3000, () => {});