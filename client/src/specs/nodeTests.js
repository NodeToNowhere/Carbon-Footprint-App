const assert = require("assert");

//Test of calculate electric usage

const calculateElectricityValue = (electricityUsage) =>
  (electricityUsage / 1000) * 0.309;

const electricityResults = calculateElectricityValue(5000);

assert.deepStrictEqual(electricityResults, 1.545);

//Test of calculating car co2 usage

const carType = 0.25;
const carMileage = 10000;

const calculateCarValue = (carType, carMileage) =>
  (carType / 1000) * carMileage;

const carResults = calculateCarValue(carType, carMileage);

assert.deepStrictEqual(carResults, 2.5);

//Test DietValue calculation

const vegan = 1056;

const calculateDietValue = (dietType) => dietType / 1000;

const dietResults = calculateDietValue(vegan);

assert.deepStrictEqual(dietResults, 1.056);

// Test calculate flight values

const co2Domestic = 180;
const co2ShortHaul = 260;
const co2LongHaul = 960;

const numDomestic = 2;
const numShortHaul = 2;
const numLongHaul = 2;

const calculateFlightValue = (
  numDomestic,
  numShortHaul,
  numLongHaul,
  co2Domestic,
  co2ShortHaul,
  co2LongHaul
) =>
  (numDomestic * co2Domestic +
    numShortHaul * co2ShortHaul +
    numLongHaul * co2LongHaul) /
  1000;

const flightResult = calculateFlightValue(
  numDomestic,
  numShortHaul,
  numLongHaul,
  co2Domestic,
  co2ShortHaul,
  co2LongHaul
);

assert.deepStrictEqual(flightResult, 2.8);

//Calculate total value of co2

const calculateTotalValue = (
  electricityValue,
  carValue,
  dietValue,
  flightValue
) => electricityValue + carValue + dietValue + flightValue;

const totalResults = calculateTotalValue(
  electricityResults,
  carResults,
  dietResults,
  flightResult
);

assert.deepStrictEqual(totalResults, 7.901);
