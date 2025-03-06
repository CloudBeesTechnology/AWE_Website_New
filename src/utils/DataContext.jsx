import { generateClient } from "@aws-amplify/api";
import { createContext, useEffect, useState } from "react";
import { listHiringJobs } from "../graphql/queries";

export const DataSupply = createContext();

const client = generateClient();

const DataContext = ({ children }) => {
  const [dataState, setDataState] = useState({
    hiringData: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queries = [{ query: listHiringJobs, key: "hiringData" }];
        const responses = await Promise.all(
          queries.map(({ query }) =>
            client.graphql({ query }).catch((error) => {
              // console.error("GraphQL Error:", error);
              return { data: { items: [] } }; // fallback for failed query
            })
          )
        );

        const newData = queries.reduce((acc, { key }, index) => {
          const items =
            responses[index]?.data?.[Object.keys(responses[index].data)[0]]
              ?.items || [];
          return { ...acc, [key]: items };
        }, {});

        setDataState((prevState) => ({ ...prevState, ...newData }));
      } catch (error) {
        // console.error("Data Fetch Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataSupply.Provider value={dataState}>{children}</DataSupply.Provider>
  );
};

export default DataContext;
