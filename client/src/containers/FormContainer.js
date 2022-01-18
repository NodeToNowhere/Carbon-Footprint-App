import { useEffect, useState } from "react";
import Car from "../components/Car";
import Electricity from "../components/Electricity";
import DietForm from "../components/DietForm";
import FlightForm from "../components/FlightForm";
import "./FormContainer.css";
import { Tabs, Tab } from '@mui/material'

const FormContainer = ({
  handleCarCalculation,
  climateData,
  handleDietCalculation,
  handleElectricityCalculation,
  handleFlightCalculation,
}) => {
  // Electricity State
  const [energyUsage, setEnergyUsage] = useState(4500);

  // Diet State
  const [dietType, setDietType] = useState("vegan");
  const [selectedDiet, setSelectedDiet] = useState(1056);

  // Car State
  const [currentTab, setCurrentTab] = useState('Electricity')
  const [co2PerMile, setCo2PerMile] = useState(0);
  const [yearlyMileage, setYearlyMileage] = useState(0);
  const [fuelType, setFuelType] = useState(null);
  const [carSize, setCarSize] = useState(null);
  const [hasCar, setHasCar] = useState(false);

  // Flight State
  const [numDomestic, setNumDomestic] = useState(0);
  const [numShortHaul, setNumShortHaul] = useState(0);
  const [numLongHaul, setNumLongHaul] = useState(0);
  const [co2Domestic, setCo2Domestic] = useState(0);
  const [co2ShortHaul, setCo2ShortHaul] = useState(0);
  const [co2LongHaul, setCo2LongHaul] = useState(0);

  const handleChange = (eve) => {
    console.log(eve.target.textContent)
    setCurrentTab(eve.target.textContent)
  }


  //Electricity Handlers
  useEffect(() => {
    handleElectricityCalculation(energyUsage);
  }, [energyUsage]);

  const handleElectricityChange = (eve) => {
    setEnergyUsage(eve.target.value)
  };

  //Diet Handlers
  useEffect(() => {
    handleDietCalculation(selectedDiet);
  }, [dietType, selectedDiet]);

  const handleDietSelected = (event) => {
    setDietType(event.target.value);
    setSelectedDiet(climateData[1].diet[event.target.value]);
  };

  // Car Handlers

  useEffect(() => {
    handleCarCalculation(co2PerMile, yearlyMileage);
  }, [co2PerMile, yearlyMileage, hasCar]);

  const handleMileageChange = (evt) => {
    setYearlyMileage(evt.target.value);
  };

  const handleFuelSelected = (evt) => {
    const selectedFuel = evt.target.value;
    setFuelType(evt.target.value);
    setCo2PerMile(climateData[0].drivingKgCO2ePerMile[selectedFuel][carSize]);
  };

  const handleSizeSelected = (evt) => {
    const selectedSize = evt.target.value;
    setCarSize(evt.target.value);
    setCo2PerMile(climateData[0].drivingKgCO2ePerMile[fuelType][selectedSize]);
  };

  const handleHasCarSelected = (evt) => {
    setHasCar(evt.target.value)
    if (evt.target.value) {
      setYearlyMileage(7800)
      setFuelType('petrol')
      setCarSize('medium')
      setCo2PerMile(0.29)
    }
    else {
      setYearlyMileage(0)
    }
  }
  // Flight Handlers
  useEffect(() => {
    handleFlightCalculation(
      numDomestic,
      numShortHaul,
      numLongHaul,
      co2Domestic,
      co2ShortHaul,
      co2LongHaul
    );
  }, [
    co2Domestic,
    co2ShortHaul,
    co2LongHaul,
    numDomestic,
    numShortHaul,
    numLongHaul,
  ]);

  const handleDomesticChange = (event) => {
    setNumDomestic(event.target.value);
    setCo2Domestic(climateData[4].flights["domestic"]);
  };

  const handleShortChange = (event) => {
    setNumShortHaul(event.target.value);
    setCo2ShortHaul(climateData[4].flights["shortHaul"]);
  };

  const handleLongChange = (event) => {
    setNumLongHaul(event.target.value);
    setCo2LongHaul(climateData[4].flights["longHaul"]);
  };

  return (

    <div id="forms-container">
      <Tabs onChange={handleChange} value={currentTab}>
        <Tab label="Electricity" value="electricity"></Tab>
        <Tab label="Diet" value="diet"></Tab>
        <Tab label="Transport" value="transport"></Tab>
      </Tabs>
      {currentTab === 'Electricity' ?
        <Electricity
          handleElectricityCalculation={handleElectricityCalculation}
          climateData={climateData}
          energyUsage={energyUsage}
          handleElectricityChange={handleElectricityChange}
        />
        : currentTab === 'Diet' ?
          <DietForm
            climateData={climateData}
            handleDietCalculation={handleDietCalculation}
            dietType={dietType}
            selectedDiet={selectedDiet}
            handleDietSelected={handleDietSelected}
          />
          : currentTab === 'Transport' ?
            <div id="transport-div">
              <Car
                handleCarCalculation={handleCarCalculation}
                climateData={climateData}
                co2PerMile={co2PerMile}
                yearlyMileage={yearlyMileage}
                fuelType={fuelType}
                carSize={carSize}
                hasCar={hasCar}
                // setCo2PerMile={setCo2PerMile}
                // setYearlyMileage={setYearlyMileage}
                // setFuelType={setFuelType}
                // setCarSize={setCarSize}
                handleMileageChange={handleMileageChange}
                handleFuelSelected={handleFuelSelected}
                handleSizeSelected={handleSizeSelected}
                handleHasCarSelected={handleHasCarSelected}
              />

              <FlightForm
                climateData={climateData}
                handleFlightCalculation={handleFlightCalculation}
                numDomestic={numDomestic}
                numShortHaul={numShortHaul}
                numLongHaul={numLongHaul}
                co2Domestic={co2Domestic}
                co2ShortHaul={co2ShortHaul}
                co2LongHaul={co2LongHaul}
                handleDomesticChange={handleDomesticChange}
                handleShortChange={handleShortChange}
                handleLongChange={handleLongChange}

              />
            </div>
            : null}

    </div>

  );
};

export default FormContainer;
