import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(url);
        //console.log("Response : ",response);

        if (response.status !== 200) {
          setError("Failed to Fetch");
        }

        // const result = await response.json();
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error while Fetching The Data in useFetch Hook : ", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
