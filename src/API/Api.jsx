import { useState, useEffect } from 'react';

const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData(``);
      setData(fetchedData);
    };
    getData();
  }, []);

  // Use the data here
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Display your fetched data here */}
      <p>Name: {data.name}</p>
    </div>
  );
};

export default MyComponent;
