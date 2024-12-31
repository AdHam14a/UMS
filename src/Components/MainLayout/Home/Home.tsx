import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import styles from "./Home.module.css";

export default function Home() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );

  const barData = {
    labels: ["Adham", "Karim", "Yasser"],
    datasets: [
      {
        label: "Food",
        data: [150, 300, 400],
        backgroundColor: [
          "rgba(243, 182, 0, 0.3)",
          "rgba(243, 182, 0, 0.6)",
          "rgba(243, 182, 0, 0.9)",
        ],
        borderRadius: 10,
      },
      {
        label: "Transportation",
        data: [70, 200, 55],
        backgroundColor: [
          "rgba(243, 182, 0, 0.6)",
          "rgba(243, 182, 0, 0.9)",
          "rgba(243, 182, 0, 0.3)",
        ],
        borderRadius: 10,
      },
      {
        label: "Games",
        data: [250, 130, 155],
        backgroundColor: [
          "rgba(243, 182, 0, 0.9)",
          "rgba(243, 182, 0, 0.3)",
          "rgba(243, 182, 0, 0.6)",
        ],
        borderRadius: 10,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutData = {
    labels: ["Food", "Transportation", "Games"],
    datasets: [
      {
        label: "Money",
        data: [100, 180, 200],
        backgroundColor: [
          "rgba(243, 182, 0, 0.3)",
          "rgba(243, 182, 0, 0.6)",
          "rgba(243, 182, 0, 0.9)",
        ],
        borderColor: [
          "rgba(159, 119, 0, 0.3)",
          "rgba(159, 119, 0, 0.6)",
          "rgba(159, 119, 0, 0.9)",
        ]
      },
    ],
  };

  return (
    <>
      <div className="mainTitle d-flex justify-content-center flex-column align-items-center">
        <h3 className={styles.mainH3}>Hello !</h3>
        <h4 className={styles.mainH4}>Welcome back to your homepage</h4>
        <p className={styles.paragraphs}>
          Here are some statistics you may find interesting.{" "}
        </p>
      </div>
      <div className="container">
        <div className="row justify-content-between align-items-center mx-3">
          <div className="col-md-5">
            <Bar data={barData} options={options} />
          </div>
          <div className="col-md-5">
            <Doughnut data={doughnutData} />
          </div>
        </div>
      </div>
    </>
  );
}
