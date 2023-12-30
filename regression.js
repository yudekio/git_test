const csv = require("csvtojson");
const regression = require("regression");

async function fetchData() {
  try {
    const jsonObj = await csv().fromFile("./data.csv");
    return jsonObj;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error if needed
  }
}

(async () => {
  try {
    const objectJSON = await fetchData();

    const dataStr = objectJSON.map((features) => Object.values(features));
    const dataFloat = dataStr.map((row) => row.map((str) => parseFloat(str)));
    const result = regression.linear(dataFloat);
    console.log(result);
    // Now you can use objectJSON in the rest of your code
  } catch (error) {
    // Handle errors if needed
    console.error(error);
  }
})();

// console.log(data);
