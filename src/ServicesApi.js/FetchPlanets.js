const fetchPlanets = async () => {
  const response = await fetch('https://swapi.dev/api/planets')
    .then((data) => data.json());
  return response.results;
};

export default fetchPlanets;
