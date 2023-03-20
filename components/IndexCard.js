import React from "react";
import {
   Flex,
   Stat,
   StatArrow,
   StatHelpText,
   StatLabel,
   StatNumber,
} from "@chakra-ui/react";

const Card = ({ name, lastPrice, priceChangePercent }) => {
   return (
      <Flex
         justifyContent="center"
         alignItems="flex-start"
         border="2px solid"
         borderColor="white"
         color="white"
         borderRadius={{ base: 5 }}
         width="max-content"
         margin={{ base: "2em" }}
         padding={{ base: "1em" }}
         flexDir="column"
      >
         <Stat>
            <StatLabel>{name}</StatLabel>
            <StatNumber>{lastPrice}</StatNumber>
            <StatHelpText>
               <StatArrow
                  type={priceChangePercent < 0 ? "decrease" : "increase"}
               />
               {`${priceChangePercent}%`}
            </StatHelpText>
         </Stat>
      </Flex>
   );
};

export default Card;
