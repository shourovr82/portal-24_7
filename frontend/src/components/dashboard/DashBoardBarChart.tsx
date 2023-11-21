/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useGetAllOrdersMonthlyStaticQuery } from "../../redux/features/orders/ordersApi";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DashBoardBarChart = () => {
  const { data: monthlyStatic } = useGetAllOrdersMonthlyStaticQuery(null);

  const currentYear = new Date().getFullYear();

  // Find the data for the current year
  const productDataCurrentYear = monthlyStatic?.data.find(
    (data: any) => data.year === currentYear
  );
  // Find the data for the current year
  const productDataNextYear = monthlyStatic?.data.find(
    (data: any) => data.year === currentYear + 1
  );

  // Find the data for the last year (currentYear - 1)
  const productDataLastYear = monthlyStatic?.data.find(
    (data: any) => data.year === currentYear - 1
  );

  // Find the data for the year before the last year (currentYear - 2)
  const productDataYearBeforeLast = monthlyStatic?.data.find(
    (data: any) => data.year === currentYear - 2
  );

  const userData = {
    labels: productDataCurrentYear?.monthlyCounts.map(
      (count: any) => count?.month?.monthName
    ),
    datasets: [
      {
        label: `${currentYear - 2} - Before Last Year Shipments`,
        data: productDataYearBeforeLast?.monthlyCounts.map(
          (count: any) => count?.count
        ),
        backgroundColor: "#007BFF",
        borderRadius: 5,
        barThickness: 22,
        borderColor: "white",
        borderWidth: 4,
      },
      {
        label: `${currentYear - 1} - Last Year Shipments`,
        data: productDataLastYear?.monthlyCounts.map(
          (count: any) => count?.count
        ),
        backgroundColor: "#FFC107",
        borderRadius: 5,
        barThickness: 22,
        borderColor: "white",
        borderWidth: 4,
      },

      {
        label: `${currentYear} - Current Year Shipments`,
        data: productDataCurrentYear?.monthlyCounts?.map(
          (count: any) => count?.count
        ),
        backgroundColor: "#16A34A",
        borderRadius: 5,
        barThickness: 22,
        borderColor: "white",
        borderWidth: 4,
      },
      {
        label: `${currentYear + 1} - Next Year Shipments`,
        data: productDataNextYear?.monthlyCounts?.map(
          (count: any) => count?.count
        ),
        backgroundColor: "#87CEEB",
        borderRadius: 5,
        barThickness: 22,
        borderColor: "white",
        borderWidth: 4,
      },
    ],
  };

  return (
    <div>
      <Bar data={userData} />
    </div>
  );
};

export default DashBoardBarChart;
