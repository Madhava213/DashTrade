import { extendTheme } from "@chakra-ui/react";

export const defaultTheme = extendTheme({
   colors: {
      primary: "rgba(0, 52, 89, 1)",
      primary_500: "rgba(0, 52, 89, 0.5)",
      primary_200: "rgba(0, 52, 89, 0.2)",
      secondary: "#E2E2E2",
      lightText: "rgba(83,86,90,1)",
      accordion: "#F0EEF0",
   },
   fonts: {
      body: "Hauora",
      heading: "Hauora",
   },
});
