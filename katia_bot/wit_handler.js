const fs = require('fs')

// Prediction Data
const carbonEmissionData = JSON.parse(fs.readFileSync('carbon_emission.json'))
// console.log(carbonEmissionData)


function responseFromWit(data) {
  console.log("data from wit:");
  console.log(JSON.stringify(data));

  const intent = data.intents.length > 0 && data.intents[0] || "__foo__";
  
  switch (intent.name) {
    case "tellYear":
      return tellYear(data);
    case "tellLocation":
      return '';
    case "tellPresentation":
      return tellPresentation(data);
    case "tellState":
      return tellState(data)
    case "tellWater":
      return tellWater(data)
    case "tellForests":
      return tellForests(data)
    case "tellOk":
      return tellOK(data)
    case "tellFamily":
      return tellFamily(data)
    case "tellAir_quality":
      return tellAirQuality(data)
    case "tell_Carbon_Emissions":
      return tellCarbonEmissions(data)
    case "tellname":
      return tellname(data)
    case "tellLife":
      return tellLife(data)
    case "tellTransition":
      return tellTransition(data)
    case "tellSolution":
      return tellSolution(data)

  }
  
  return handleGibberish();
}

function handleGibberish() {
  return Promise.resolve(
    "thanks for chitchating with me, if you wanna know more, I am always here, ask me more qestions, I can also show you how to prevent the planet from being destroyed"
  );
}

function tellFamily(data) {
  return "I don't have any siblings, I am basically a lonely child. My dad works as a freelancer"
}
function tellOK(data) {
  
  return "good"
}
function tellname(data) {
  return "my name is Katia Johanson, nice to meet you!"
}
function tellCarbonEmissions(data) {
  const air = data.entities['wit_air_quality:wit_air_quality']
  const change = data.entities['wit_data:wit_data']
  const year = data.entities['wit_year:wit_year']
  if (!change){
    return "air is really bad here because of carbon emissions, we really have a hard time breathing, and vegetation also suffered alot"
  }
    
  if(!year){
    return "carbon emissions changed nature alot, my grandpa told me that many fruits he used to enjoy disappeared and are no more a thing"
  }
  if(year[0].value < 2021){
    return "Oh come on you are supposed to know how messed up the situation is  already"
  }
  if(year[0].value > 2100){
    return "I might be from the future, but I can't predict it"
  }
  return "predictions"
    
}
function tellYear(data) {
  console.log('we are wotking')
  const loc = data.entities['wit$year:year'];
  if (loc == null) {
    return handleGibberish();
  }

  return 'year detected'
}
function tellPresentation(data){
  return 'My name is Katia, from 2100. I am 16 years old. Nice to meet you!'
}

function tellAirQuality(data) {
  const air = data.entities['wit_air_quality']
  return "The air is really bad here, we have a hard time breathing."
}
function tellState(data) {

  const salut = data.entities['wit_salut:wit_salut'];
  const state = data.entities['wit_state:wit_state'];
  
  if (salut == null && !state) {
    return handleGibberish();
  }
  
  if(!state && salut) {
    return 'Hey there'
  } 
  
  return 'I am fine what about you?'
}

function tellWater(data) {

  const water = data.entities['wit_water:wit_water'];
  const year = data.entities['wit_year:wit_year'];

  if (water == null) {
    return handleGibberish();
  }
  console.log(water)
  if(!year) {
    return water[0].value + ' raised a lot because of global warming, and some countries even disappeared like Netherlands, my dad told me that they have some good fries there'
  } 
  
  if(year[0].value ) {
    return 'that is your year, you must know more about it'
  }
  
  return 'waiting for the predictions man'
}

function tellForests(data) {

  const forests = (data.entities['wit_forests:wit_forests'])[0].value;
  const year = data.entities['wit_year:wit_year'];

  if (forests == null) {
    return handleGibberish();
  }

  if(!year) {
    return 'we only have few of them, my grandparents probably did not care about them'
  } 
  
  if(year[0].value < 2021) {
    return 'that is your year, you must know more about it'
  }
  
  return 'waiting for the predictions man'
}
exports.responseFromWit = responseFromWit;
function tellLife(data) {
  const life = data.entities['wit_life:wit_life'];
  console.log(life)

  if (life == null) {
    return handleGibberish();
  }
  
  return 'Life in my world is different from yours, we do not go out when we please, lots of poeple are dying everyday because of the lack of water, we have to wear masks because of the bas air quality in some places'
}

function tellTransition(data) {
  console.log('WADAFAK')
  const solution = data.entities['wit_solution:wit_solution'];
  const help = data.entities['wit_help:wit_help'];

  console.log(help)
  console.log(solution)
  if (help == null && solution == null) {
    return handleGibberish();
  }
  
  return 'Let us work together on things you can do to solve future problems'
}

function tellSolution(data) {

  const water_solution = data.entities['wit_waterSol:wit_waterSol'];
  
  return 'Rising water levels are due to climate change and the rising of temperatures, what you can do is minimizing your carbon footprint, but walking instead of using cars, and using less electricity.'
}

