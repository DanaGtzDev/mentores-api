function filterExpertos(query, data){
  return data.filter(item =>
    (item.fields?.['Verticals']?.some(v => query['vertical']?.includes(v)) ?? false) &&
    (item.fields?.['Languages']?.some(l => query['language']?.includes(l)) ?? false) &&
    (item.fields?.['Entrepreneur Superpowers']?.some(es => query['entrepreneur_superpower']?.includes(es)) ?? false) &&
    (item.fields?.['Main approach']?.some(ma => query['main_approach']?.includes(ma)) ?? false)
  );
};

module.exports = { filterExpertos };