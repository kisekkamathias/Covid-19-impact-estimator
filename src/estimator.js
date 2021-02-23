const covid19ImpactEstimator = () => {
  // Data output after the computations from the estumator
  const dataOutPut = {
    data: {},
    estmate: {
      impact: {},
      severeImpact: {}
    }
  };
  //  input data to the estimator
  dataOutPut.data = {
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 5,
      avgDailyIncomePopulation: 0.71
    },
    periodType: 'days',
    timeToElapse: 58,
    reportedCases: 674,
    population: 66622705,
    totalHospitalBeds: 1380614
  };
  // Creating access to defferent objects of the inputData function
  const {
    periodType, reportedCases, totalHospitalBeds
  } = dataOutPut.data;
  let timeToElapse = dataOutPut.data.reportedCases;
  const {
    avgDailyIncomeInUSD, avgDailyIncomePopulation
  } = dataOutPut.data.region;
  // Determine periodType when given days, weeks or months
  let power;
  if (periodType === 'months') {
    timeToElapse *= 30;
    power = Math.trunc(timeToElapse / 3);
  } else if (periodType === 'weeks') {
    timeToElapse *= 7;
    power = Math.trunc(timeToElapse / 3);
  } else if (periodType === 'days') {
    power = Math.trunc(timeToElapse / 3);
  }
  // Initialising variables to be accessed for computations in impact and severeImpact functions
  let currentlyInfected;
  let infectionsByRequestedTime;
  let severeCasesByRequestedTime;
  let hospitalBedsByRequestedTime;
  let casesForICUByRequestedTime;
  let casesForVentilatorsByRequestedTime;
  let dollarsInFlight;
  // computations for the impact
  currentlyInfected = (reportedCases * 10);
  infectionsByRequestedTime = Math.trunc(currentlyInfected * (2 ** power));
  severeCasesByRequestedTime = Math.trunc((15 / 100) * infectionsByRequestedTime);
  hospitalBedsByRequestedTime = Math.trunc(((35 / 100)
  * totalHospitalBeds) - severeCasesByRequestedTime);
  casesForICUByRequestedTime = Math.trunc((5 / 100) * infectionsByRequestedTime);
  casesForVentilatorsByRequestedTime = Math.trunc((2 / 100)
  * infectionsByRequestedTime);
  dollarsInFlight = Math.trunc((infectionsByRequestedTime
  * avgDailyIncomePopulation * avgDailyIncomeInUSD) / timeToElapse);
  dataOutPut.estmate.impact = {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
  // computations for severeImpact
  currentlyInfected = (reportedCases * 50);
  infectionsByRequestedTime = Math.trunc(currentlyInfected * (2 ** power));
  severeCasesByRequestedTime = Math.trunc((15 / 100) * infectionsByRequestedTime);
  hospitalBedsByRequestedTime = Math.trunc(((35 / 100)
  * totalHospitalBeds) - severeCasesByRequestedTime);
  casesForICUByRequestedTime = Math.trunc((5 / 100) * infectionsByRequestedTime);
  casesForVentilatorsByRequestedTime = Math.trunc((2 / 100)
  * infectionsByRequestedTime);
  dollarsInFlight = Math.trunc((infectionsByRequestedTime
  * avgDailyIncomePopulation * avgDailyIncomeInUSD) / timeToElapse);
  dataOutPut.estmate.severeImpact = {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
  return dataOutPut;
};

export default covid19ImpactEstimator;
