import React, { useEffect, useState } from "react";

import IndexCard from "../components/IndexCard";
import {
   Box,
   Button,
   Flex,
   Tab,
   TabList,
   TabPanel,
   TabPanels,
   Tabs,
} from "@chakra-ui/react";
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getMarketData } from "../components/marketAPI";
ChartJS.register(
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend
);

export async function getServerSideProps() {
   const propVal = await getMarketData();

   return {
      props: propVal,
   };
}

const Home = ({ broadData, sectoralData }) => {
   const [broadVal, setbroadVal] = useState(broadData);
   const [sectorVal, setsectorVal] = useState(sectoralData);

   useEffect(() => {}, [sectorVal, broadVal]);

   function generateChart(item) {
      const labels = [];
      const data = [];
      const colors = [];
      const dataset = item === "broadVal" ? [...broadVal] : [...sectorVal];
      dataset.sort((a, b) => a.priceChangePercent - b.priceChangePercent);
      dataset.forEach((indexData) => {
         labels.push(indexData.name);
         data.push(parseFloat(indexData.priceChangePercent));
         colors.push(indexData.priceChangePercent < 0 ? "#FEB2B2" : "#9AE6B4");
      });
      return (
         <Flex
            width={{ base: "100%", md: "50%" }}
            height={{ base: "30vh", md: "max-content" }}
            justifyContent="center"
            alignItems="center"
         >
            <Bar
               data={{
                  labels,
                  datasets: [{ data, backgroundColor: colors }],
               }}
               options={{
                  indexAxis: "y",
                  plugins: {
                     legend: {
                        display: false,
                     },
                     title: {
                        display: true,
                        text: "All Indices",
                     },
                  },
               }}
            />
         </Flex>
      );
   }

   return (
      <Flex
         flexDir="column"
         justifyContent="flex-start"
         alignItems="center"
         width={{ base: "100vw" }}
         bg="#121212"
         minH={{ base: "100vh" }}
      >
         <Tabs
            variant="soft-rounded"
            colorScheme="red"
            width="100%"
            justifyContent="center"
            alignItems="center"
         >
            <TabList
               width="100%"
               justifyContent="center"
               alignItems="center"
               paddingY={{ base: "2em" }}
               backgroundColor="#191919"
            >
               <Tab>Broad Market Indices</Tab>
               <Tab>Sectoral Indices</Tab>
            </TabList>
            <TabPanels>
               <TabPanel>
                  <Flex
                     width="100%"
                     justifyContent="center"
                     alignItems="center"
                     marginBottom={{ base: "5em" }}
                  >
                     {generateChart("broadVal")}
                  </Flex>
                  <Flex
                     width={{ base: "100%" }}
                     justifyContent="center"
                     alignItems="center"
                     flexWrap="wrap"
                  >
                     {broadVal.map((indexData) => {
                        return (
                           <IndexCard
                              key={indexData.name}
                              name={indexData.name}
                              lastPrice={indexData.lastPrice}
                              priceChangePercent={indexData.priceChangePercent}
                           />
                        );
                     })}
                  </Flex>
               </TabPanel>
               <TabPanel>
                  <Flex
                     width="100%"
                     justifyContent="center"
                     alignItems="center"
                     marginBottom={{ base: "5em" }}
                  >
                     {generateChart("sectorVal")}
                  </Flex>
                  <Flex
                     width={{ base: "100%" }}
                     justifyContent="center"
                     alignItems="center"
                     flexWrap="wrap"
                  >
                     {sectorVal.map((indexData) => {
                        return (
                           <IndexCard
                              key={indexData.name}
                              name={indexData.name}
                              lastPrice={indexData.lastPrice}
                              priceChangePercent={indexData.priceChangePercent}
                           />
                        );
                     })}
                  </Flex>
               </TabPanel>
            </TabPanels>
         </Tabs>
      </Flex>
   );
};

export default Home;
