const fetchGlobal = async () => {
  const response = await fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=all`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('API Error');
      }
      return response.json();
    })
    .catch((error) => {
      return error.message;
    });
  return response;
};

export default fetchGlobal;
