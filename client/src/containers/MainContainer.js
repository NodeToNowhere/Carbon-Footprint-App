import React, { useState, useEffect } from "react";
import { getData } from "../components/ClimateService";
import {
  calculateCarValue,
  calculateDietValue,
  calculateElectricityValue,
  calculateFlightValue,
  calculateTotalValue,
} from "../Helpers/Calculator.js";
import FormContainer from "./FormContainer";
import CalculatorDisplay from "../components/CalculatorDisplay";
import "./MainContainer.css";

const MainContainer = () => {
  const [climateData, setClimateData] = useState([]);
  const [electricityValue, setElectricityValue] = useState(0);
  const [carValue, setCarValue] = useState(0);
  const [dietValue, setDietValue] = useState(0);
  const [flyingValue, setFlyingValue] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    getData().then((climateData) => {
      setClimateData(climateData);
    });
  }, []);

  useEffect(() => {
    handleTotalCalculation();
  }, [electricityValue, carValue, dietValue, flyingValue]);

  const handleElectricityCalculation = (electricityUsage) => {
    const newElectricityValue = calculateElectricityValue(electricityUsage);
    setElectricityValue(newElectricityValue);
  };

  const handleCarCalculation = (carType, carMileage, carNumber) => {
    const newCarValue = calculateCarValue(carType, carMileage, carNumber);
    setCarValue(newCarValue);
  };

  const handleDietCalculation = (meatServings, vegServings, dairyServings, averageMeatCo2, averageVegCo2, averageDairyCo2) => {
    const newDietValue = calculateDietValue(meatServings, vegServings, dairyServings, averageMeatCo2, averageVegCo2, averageDairyCo2);
    setDietValue(newDietValue);
  };

  const handleFlightCalculation = (numDomestic, numShortHaul, numLongHaul, co2Domestic, co2ShortHaul, co2LongHaul) => {
    const newFlyingValue = calculateFlightValue(numDomestic, numShortHaul, numLongHaul, co2Domestic, co2ShortHaul, co2LongHaul);
    setFlyingValue(newFlyingValue);
  };

  const handleTotalCalculation = () => {
    const newTotal = electricityValue + carValue + dietValue + flyingValue;
    setTotalValue(newTotal);
  };

  return (
    <div className="main-content-container">
    <div className="form-controls">
      <FormContainer
        handleElectricityCalculation={handleElectricityCalculation}
        handleCarCalculation={handleCarCalculation}
        handleDietCalculation={handleDietCalculation}
        handleFlightCalculation={handleFlightCalculation}
        handleTotalCalculation={handleTotalCalculation}
        climateData={climateData}
      />
      <CalculatorDisplay className="calculator-display"
        electricityValue={electricityValue}
        carValue={carValue}
        dietValue={dietValue}
        flyingValue={flyingValue}
        totalValue={totalValue}
      />
    </div>
    </div>
  );
};

export default MainContainer;
