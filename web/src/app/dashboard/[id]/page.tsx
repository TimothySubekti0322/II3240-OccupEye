"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import type { TableData, Device, DashboardData } from "./dashboard.type";
import Cookies from "universal-cookie";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  LinearScale,
  CategoryScale,
  Title,
  Legend,
  BarElement,
  BarController,
} from "chart.js";
import { convertTZ } from "../../utils/dateFormatter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Dashboard = (id: number) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [dashboard, setDashboard] = useState<DashboardData>({
    deviceId: "",
    deviceName: "",
    owner: "",
    currentVisitors: 0,
    enteredToday: 0,
    enteredThisHour: 0,
    enteredByHour: [],
    enteredByDay: [],
  });

  const [selectedSort, setSelectedSort] = useState<string>("highest");
  const [selectedFilter, setSelectedFilter] = useState<string>("daily");
  const [selectedDate, setSelectedDate] = useState<Date>(convertTZ());

  useEffect(() => {
    const fetchData = async (token: string) => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/dashboard/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const res2 = await axios.get(`/api/table/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 401) {
          window.location.href = "/";
        } else {
          setDashboard(res.data.data);
          setTableData(res2.data.data);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const Cookie = new Cookies();
    const payload = Cookie.get("payload");
    if (!payload) {
      window.location.href = "/";
    } else {
      const token: string = Cookie.get("token");
      fetchData(token);
    }
  }, [selectedSort, selectedFilter, selectedDate]);

  const hourFormatter = (hour: number): string => {
    if (hour < 10) {
      return `0${hour}:00`;
    }
    return `${hour}:00`;
  };

  Chart.register(
    LinearScale,
    CategoryScale,
    Title,
    Legend,
    BarElement,
    BarController
  );

  return (
    <>
      <Navbar currPage="dashboard" />
      <div className="w-full min-h-screen items-center justify-between font- text-sm p-24 bg-gradient-to-b from-black1 to-blue1">
        <div className="justify-center content-center text-white1">
          <div className="mx-auto font-bold text-xl content-center text-center my-2 bg-gradient-to-br text-center from-purple1 to-yellow1 border-2 text-white1 w-96 text-md rounded-lg block px-8 mt-12 py-2">
            Dashboard {dashboard?.deviceName}
          </div>
          <div className="text-lg border-2 border-white1 rounded-lg px-4">
            <div className="text-lg  rounded-lg gap-x-8">
              <div className="flex items-center align-middle justify-between">
                <div>
                  <div className="flex align-middle">
                    <div className="block content-end mr-0 p-4">
                      <p className="inline-block">Current Visitors:</p>
                      <div className="flex items-center justify-end">
                        <p>{dashboard?.currentVisitors}</p>
                        <img src="/person.png" alt="people" className="h-6" />
                      </div>
                    </div>
                    <div className="block content-end mr-0 p-4">
                      <p className="inline-block">Daily Total:</p>
                      <div className="flex items-center justify-end">
                        <p>{dashboard?.enteredToday}</p>
                        <img src="/person.png" alt="people" className="h-6" />
                      </div>
                    </div>
                    <div className="block content-end mr-0 p-4">
                      <p className="inline-block">Hourly Total:</p>
                      <div className="flex items-center justify-end">
                        <p>{dashboard?.enteredThisHour}</p>
                        <img src="/person.png" alt="people" className="h-6" />
                      </div>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="block content-end mr-0 p-4">
                      <p className="">Sort:</p>
                      <select
                        className="w-32 bg-gradient-to-br from-purple1 to-yellow1 block w-full text-sm px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        value={selectedSort}
                        onChange={(e) => setSelectedSort(e.target.value)}
                      >
                        <option className="text-black" value="highest">
                          highest
                        </option>
                        <option className="text-black" value="lowest">
                          lowest
                        </option>
                      </select>
                    </div>
                    <div className="block content-end mr-0 p-4">
                      <p className="">Filter:</p>
                      <select
                        className="w-32 bg-gradient-to-br from-purple1 to-yellow1 block w-full text-sm px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                      >
                        <option className="text-black" value="dailly">
                          daily
                        </option>
                        {/* <option className='text-black' value="lowest">lowest</option> */}
                      </select>
                    </div>
                    <div className="block content-end mr-0 p-4">
                      <p className="">Date:</p>
                      <DatePicker
                        selected={selectedDate}
                        onChange={(e) => (e ? setSelectedDate(e) : {})}
                        className="w-32 bg-gradient-to-br from-purple1 to-yellow1 block w-full text-sm px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="block content-end mr-0 p-4">
                      <p className="inline-block">Custom Total:</p>
                      <div className="flex items-center justify-end">
                        <p>{dashboard?.currentVisitors ?? 0}</p>
                        <img src="/person.png" alt="people" className="h-6" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="max-w-sm w-full rounded-lg shadow dark:bg-gray-800 text-white m-8">
                    <Bar
                      className="bg-transparent"
                      data={{
                        labels: dashboard?.enteredByHour.map(
                          (entry) => entry.label
                        ),
                        datasets: [
                          {
                            label: "",
                            data: dashboard?.enteredByHour.map(
                              (entry) => entry.value
                            ),
                            backgroundColor: "white",
                            // backgroundColor: 'white',
                            // borderWidth: 1,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            display: false, // Remove legend
                          },
                          title: {
                            display: false,
                            text: "Bar Chart",
                          },
                        },
                        scales: {
                          y: {
                            type: "linear",
                            beginAtZero: true,
                            ticks: {
                              color: "white", // Change text labels color to white
                            },
                          },
                          x: {
                            ticks: {
                              color: "white", // Change text labels color to white
                            },
                          },
                        },
                        backgroundColor: "#11306F", // Chart background color
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <table className="md:w-full ">
                {/* Table header */}
                <thead className="">
                  <tr className="bg-gradient-to-br from-purple1 to-yellow1 ">
                    <th className="px-4 py-2 text-center">Date</th>
                    <th className="px-4 py-2 text-center">Hour</th>
                    <th className="px-4 py-2 text-center">Visitors</th>
                    <th className="px-4 py-2 text-center">Entered</th>
                    <th className="px-4 py-2 text-center">Exited</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {tableData.map((item) => (
                    <tr key={item.id} className="border-b-2 border-black">
                      <td className="px-4 py-2 text-center ">
                        {item.date.split("T")[0]}
                      </td>
                      <td className="px-4 py-2 text-center ">
                        {hourFormatter(item.hour)}
                      </td>
                      <td className="px-4 py-2 text-center ">
                        {item.visitors}
                      </td>
                      <td className="px-4 py-2 text-center ">{item.entered}</td>
                      <td className="px-4 py-2 text-center ">{item.exited}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <table></table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
