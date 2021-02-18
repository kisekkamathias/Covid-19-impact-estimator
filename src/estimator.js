const covid19ImpactEstimator = (data) => {
    // Data output after the computations from the estumator
    var dataOutPut = {
        data:{},
        estmate:{
            impact:{}, 
            severeImpact:{}
        }
    }
        //input data to the estimator
    inputData = () => {
        dataOutPut["data"] = {
            region: {
                name: "Africa",
                avgAge: 19.7,
                avgDailyIncomeInUSD: 4,
                avgDailyIncomePopulation: 0.73
            },
            periodType: "days",
            timeToElapse: 38,
            reportedCases: 2747,
            population: 92931687,
            totalHospitalBeds: 678874
        }
    }
    inputData()
    //Creating access to defferent objects of the inputData function 
    const reported = dataOutPut["data"]["reportedCases"];
    let days = dataOutPut["data"]["timeToElapse"];
    const period = dataOutPut["data"]["periodType"];
    const beds = dataOutPut["data"]["totalHospitalBeds"];
    const avgDailyIncome = dataOutPut["data"]["region"]["avgDailyIncomeInUSD"];
    const avgDailyIncomePopulation = (dataOutPut["data"]["region"]["avgDailyIncomePopulation"]);
    var power;
    //Determine period when given days, weeks or months
    if(period == "months"){
        days*=30;
        power = Math.trunc(days/3);
    }else if(period == "weeks"){
        days*=7;
        power = Math.trunc(days/3)
    }else if(period == "days"){
        power = Math.trunc(days/3)
    }
    //Initialising variables to be accessed for computations in impact and severeImpact functions
    var currentlyInfected;
    var infectionsByRequestedTime;
    var severeCasesByRequestedTime;
    var hospitalBedsByRequestedTime;
    var casesForICUByRequestedTime;
    var casesForVentilatorsByRequestedTime;
    var dollarsInFlight;
    // computations for the impact
    impact = () => {
        currentlyInfected =  (reported* 10);
        infectionsByRequestedTime = Math.trunc(currentlyInfected * Math.pow(2,power));
        severeCasesByRequestedTime = Math.trunc((15/100)*infectionsByRequestedTime);
        hospitalBedsByRequestedTime = Math.trunc(((35/100)*beds)-severeCasesByRequestedTime);
        casesForICUByRequestedTime = Math.trunc((5/100)*infectionsByRequestedTime);
        casesForVentilatorsByRequestedTime = Math.trunc((2/100)*infectionsByRequestedTime);
        dollarsInFlight =Math.trunc((infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncome) /days);
        dataOutPut["estmate"]["impact"] = {
            currentlyInfected,
            infectionsByRequestedTime,
            severeCasesByRequestedTime,
            hospitalBedsByRequestedTime,
            casesForICUByRequestedTime,
            casesForVentilatorsByRequestedTime,
            dollarsInFlight
        }
    }
    impact();
    // computations for severeImpact
    severeImpact = () => {
        currentlyInfected = (reported* 50);
        infectionsByRequestedTime = Math.trunc(currentlyInfected * Math.pow(2,power));
        severeCasesByRequestedTime = Math.trunc((15/100)*infectionsByRequestedTime);
        hospitalBedsByRequestedTime = Math.trunc(((35/100)*beds)-severeCasesByRequestedTime);
        casesForICUByRequestedTime = Math.trunc((5/100)*infectionsByRequestedTime);
        casesForVentilatorsByRequestedTime = Math.trunc((2/100)*infectionsByRequestedTime);
        dollarsInFlight =Math.trunc((infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncome) /days);
        dataOutPut["estmate"]["severeImpact"] = {
            currentlyInfected,
            infectionsByRequestedTime,
            severeCasesByRequestedTime,
            hospitalBedsByRequestedTime,
            casesForICUByRequestedTime,
            casesForVentilatorsByRequestedTime,
            dollarsInFlight
        }
    }
    severeImpact();
    return dataOutPut;
}
console.log(covid19ImpactEstimator())

export default covid19ImpactEstimator;
