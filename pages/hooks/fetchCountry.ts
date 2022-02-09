const fetchCountry = async (country: string) => {
  const response = await fetch(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=all`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Invalid Country');
      }
      return response.json();
    })
    .catch((error) => {
      return error.message;
    });
  return response;
};

export default fetchCountry;
