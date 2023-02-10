import { useQuery } from "react-query";
import ApexCharts from "react-apexcharts";
import { fetchCoinHistory } from "api";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "atoms";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Price({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["price", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 5000000000000,
    }
  );
  const exceptData = data ?? [];
  // console.log(exceptData);
  const priceData = exceptData?.map((i) => i.close);
  const dateData = exceptData?.map((i) => i.time_close);
  console.log(priceData);
  return (
    <div>
      {isLoading ? (
        "Loading Price..."
      ) : (
        <ApexCharts
          type="bar"
          series={[
            {
              data: priceData,
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              type: "bar",
              height: 350,
            },
            plotOptions: {
              bar: {
                borderRadius: 4,
                horizontal: true,
              },
            },
            dataLabels: {
              enabled: false,
            },
            xaxis: {
              categories: dateData,
            },
          }}
        ></ApexCharts>
      )}
    </div>
  );
}

export default Price;
