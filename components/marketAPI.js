import { indexData } from "../components/Data";
export async function getMarketData() {
   // Fetching data for broad market indices
   const broadData = await Promise.all(
      indexData.broadIndices.map(async (index) => {
         const res = await fetch(
            `https://query1.finance.yahoo.com/v7/finance/quote?lang=en-US&region=IN&corsDomain=in.finance.yahoo.com&symbols=${index.symbol}`
         );
         if (res.status !== 200) {
            return {
               name: index.name,
               lastPrice: null,
               priceChange: null,
               priceChangePercent: null,
            };
         }
         const data = await res.json();
         const actualData = data.quoteResponse.result;
         if (actualData.length > 0) {
            const lastPrice = data.quoteResponse.result[0].regularMarketPrice;
            const prevClose =
               data.quoteResponse.result[0].regularMarketPreviousClose;
            const priceChange = lastPrice - prevClose;
            const priceChangePercent = (priceChange / prevClose) * 100;
            return {
               name: index.name,
               data: data,
               lastPrice: lastPrice,
               priceChange: priceChange,
               priceChangePercent: priceChangePercent.toFixed(2),
            };
         } else {
            return {
               name: index.name,
               lastPrice: null,
               priceChange: null,
               priceChangePercent: null,
            };
         }
      })
   );

   // Fetching data for broad market indices
   const sectoralData = await Promise.all(
      indexData.sectoralIndices.map(async (index) => {
         const res = await fetch(
            `https://query1.finance.yahoo.com/v7/finance/quote?lang=en-US&region=IN&corsDomain=in.finance.yahoo.com&symbols=${index.symbol}`
         );
         if (res.status !== 200) {
            return {
               name: index.name,
               lastPrice: null,
               priceChange: null,
               priceChangePercent: null,
            };
         }
         const data = await res.json();
         const actualData = data.quoteResponse.result;
         if (actualData.length > 0) {
            const lastPrice = data.quoteResponse.result[0].regularMarketPrice;
            const prevClose =
               data.quoteResponse.result[0].regularMarketPreviousClose;
            const priceChange = lastPrice - prevClose;
            const priceChangePercent = (priceChange / prevClose) * 100;
            return {
               name: index.name,
               data: data,
               lastPrice: lastPrice,
               priceChange: priceChange,
               priceChangePercent: priceChangePercent.toFixed(2),
            };
         } else {
            return {
               name: index.name,
               lastPrice: null,
               priceChange: null,
               priceChangePercent: null,
            };
         }
      })
   );
   return { broadData, sectoralData };
}
