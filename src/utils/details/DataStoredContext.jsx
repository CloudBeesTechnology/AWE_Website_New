
import { generateClient } from "@aws-amplify/api";
import { createContext, useEffect, useState } from "react";
import {
  // listHiringJobs,

  listKeyValueStores,
  
} from "../../graphql/queries";

export const DataSupply = createContext();

const client = generateClient();

const DataStoredContext = ({ children }) => {
  const [dataState, setDataState] = useState({
    dropDownVal: [],  
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queries = [
         
          { query: listKeyValueStores, key: "dropDownVal" },
        
        ];
        const responses = await Promise.all(
          queries.map(async ({ query, key }) => {
            let allItems = [];
            let nextToken = null;

            do {
              const response = await client
                .graphql({
                  query: query,
                  variables: { nextToken },
                })
                .catch((error) => {
        
                  return { data: { items: [] } }; 
                });
       
              const items =
                response?.data?.[Object.keys(response.data)[0]]?.items || [];
              allItems = [...allItems, ...items];
    
              nextToken =
                response?.data?.[Object.keys(response.data)[0]]?.nextToken;
            } while (nextToken); 

            return { key, items: allItems };
          })
        );

        const newData = responses.reduce((acc, { key, items }) => {
          return { ...acc, [key]: items };
        }, {});

        setDataState((prevState) => ({ ...prevState, ...newData }));
      } catch (error) {
        console.error("Data Fetch Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataSupply.Provider value={dataState}>{children}</DataSupply.Provider>
  );
};

export default DataStoredContext;