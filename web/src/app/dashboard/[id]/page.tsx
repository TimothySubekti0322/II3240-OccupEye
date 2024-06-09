"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import type { TableData, Device } from "./dashboard.type";
import Cookies from 'universal-cookie';
import { Bar } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, Title, Legend, BarElement, BarController } from 'chart.js';
import { convertTZ1, convertTZ2 } from '../../../../utils/formatDate';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const dashboard = (id: number) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [dashboard, setDashboard] = useState<Device>({
    id: "",
    name: "",
    email: "",
    currentVisitors: 0,
    enteredToday: 0,
    enteredThisHour: 0,
    chartData: [],
  });

  const [selectedSort, setSelectedSort] = useState<string>("highest");
  const [selectedFilter, setSelectedFilter] = useState<string>("daily");
  const [selectedDate, setSelectedDate] = useState<Date>(convertTZ1());


  useEffect(() => {
    // const fetchData = async (token: string) => {
    //   try {
    //     setLoading(true);
    //     const res = await axios.get(`/api/dashboard/${id}`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     const res2 = await axios.get(`/api/table/${id}`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     if (res.status === 401) {
    //       window.location.href = "/";
    //     } else {
    //       setDashboard(res.data);
    //       setTableData(res2.data);
    //       setLoading(false);
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };


    //dummies
    setDashboard({
      id: '1',
      name: 'Device 1',
      email: 'example@example.com',
      currentVisitors: 0,
      enteredToday: 0,
      enteredThisHour: 0,
      chartData: [{ value: 65, label: '1' }, { value: 59, label: '2' }, { value: 80, label: '3' }, { value: 81, label: '4' }, { value: 56, label: '5' }, { value: 55, label: '6' }, { value: 40, label: '7' }, { value: 80, label: '8' }, { value: 81, label: '9' }, { value: 56, label: '10' }, { value: 55, label: '11' }, { value: 40, label: '12' }, { value: 65, label: '13' }, { value: 59, label: '14' }, { value: 80, label: '15' }, { value: 81, label: '16' }, { value: 56, label: '17' }, { value: 55, label: '18' }, { value: 40, label: '19' }, { value: 80, label: '20' }, { value: 81, label: '21' }, { value: 56, label: '22' }, { value: 55, label: '23' }, { value: 40, label: '24' }
      ]
    });

    setTableData([{ id: '1', deviceId: 'device1', date: '2024-06-09', hour: 0, visitors: 10, entered: 7, exited: 3 }, { id: '2', deviceId: 'device1', date: '2024-06-09', hour: 1, visitors: 15, entered: 10, exited: 5 }, { id: '3', deviceId: 'device1', date: '2024-06-09', hour: 2, visitors: 20, entered: 14, exited: 6 }, { id: '4', deviceId: 'device1', date: '2024-06-09', hour: 3, visitors: 18, entered: 12, exited: 6 }, { id: '5', deviceId: 'device1', date: '2024-06-09', hour: 4, visitors: 22, entered: 18, exited: 4 }, { id: '6', deviceId: 'device1', date: '2024-06-09', hour: 5, visitors: 25, entered: 20, exited: 5 }, { id: '7', deviceId: 'device1', date: '2024-06-09', hour: 6, visitors: 30, entered: 25, exited: 5 }, { id: '8', deviceId: 'device1', date: '2024-06-09', hour: 7, visitors: 35, entered: 30, exited: 5 }, { id: '9', deviceId: 'device1', date: '2024-06-09', hour: 8, visitors: 40, entered: 35, exited: 5 }, { id: '10', deviceId: 'device1', date: '2024-06-09', hour: 9, visitors: 45, entered: 40, exited: 5 }, { id: '11', deviceId: 'device1', date: '2024-06-09', hour: 10, visitors: 50, entered: 45, exited: 5 }, { id: '12', deviceId: 'device1', date: '2024-06-09', hour: 11, visitors: 55, entered: 50, exited: 5 }, { id: '13', deviceId: 'device1', date: '2024-06-09', hour: 12, visitors: 60, entered: 55, exited: 5 }, { id: '14', deviceId: 'device1', date: '2024-06-09', hour: 13, visitors: 65, entered: 60, exited: 5 }, { id: '15', deviceId: 'device1', date: '2024-06-09', hour: 14, visitors: 70, entered: 65, exited: 5 }, { id: '16', deviceId: 'device1', date: '2024-06-09', hour: 15, visitors: 75, entered: 70, exited: 5 }, { id: '17', deviceId: 'device1', date: '2024-06-09', hour: 16, visitors: 80, entered: 75, exited: 5 }, { id: '18', deviceId: 'device1', date: '2024-06-09', hour: 17, visitors: 85, entered: 80, exited: 5 }, { id: '19', deviceId: 'device1', date: '2024-06-09', hour: 18, visitors: 90, entered: 85, exited: 5 }, { id: '20', deviceId: 'device1', date: '2024-06-09', hour: 19, visitors: 95, entered: 90, exited: 5 }, { id: '21', deviceId: 'device1', date: '2024-06-09', hour: 20, visitors: 100, entered: 95, exited: 5 }, { id: '22', deviceId: 'device1', date: '2024-06-09', hour: 21, visitors: 105, entered: 100, exited: 5 }, { id: '23', deviceId: 'device1', date: '2024-06-09', hour: 22, visitors: 110, entered: 105, exited: 5 }, { id: '24', deviceId: 'device1', date: '2024-06-09', hour: 23, visitors: 115, entered: 110, exited: 5 }]);

    const Cookie = new Cookies();
    const payload = Cookie.get("payload");
    if (!payload) {
      window.location.href = "/";
    } else {
      const token: string = Cookie.get("token");
      // fetchData(token);
    }
  }, [selectedSort, selectedFilter, selectedDate]);

  const hourFormatter = (hour: number): string => {
    if (hour < 10) {
      return `0${hour}:00`;
    }
    return `${hour}:00`;
  };

  Chart.register(LinearScale, CategoryScale, Title, Legend, BarElement, BarController);

  return (
    <>
      <Navbar currPage='dashboard' />
      <div className="w-full min-h-screen items-center justify-between font- text-sm p-24 bg-gradient-to-b from-black1 to-blue1">
        <div className='justify-center content-center text-white1'>
          <div className="mx-auto font-bold text-xl content-center text-center my-2 bg-gradient-to-br text-center from-purple1 to-yellow1 border-2 text-white1 w-96 text-md rounded-lg block px-8 mt-12 py-2" >
            Dashboard {dashboard.name}
          </div>
          <div className='text-lg border-2 border-white1 rounded-lg px-4'>

            <div className='text-lg  rounded-lg gap-x-8'>

              <div className='flex items-center align-middle justify-between'>
                <div>
                  <div className='flex align-middle'>
                    <div className='block content-end mr-0 p-4'>
                      <p className='inline-block'>Current Visitors:</p>
                      <div className='flex items-center justify-end'>
                        <p>{dashboard.currentVisitors}</p>
                        <img src="/person.png" alt="people" className='h-6' />
                      </div>
                    </div>
                    <div className='block content-end mr-0 p-4'>
                      <p className='inline-block'>Daily Total:</p>
                      <div className='flex items-center justify-end'>
                        <p>{dashboard.enteredToday}</p>
                        <img src="/person.png" alt="people" className='h-6' />
                      </div>
                    </div>
                    <div className='block content-end mr-0 p-4'>
                      <p className='inline-block'>Hourly Total:</p>
                      <div className='flex items-center justify-end'>
                        <p>{dashboard.enteredThisHour}</p>
                        <img src="/person.png" alt="people" className='h-6' />
                      </div>
                    </div>
                  </div>

                  <div className='flex'>
                    <div className='block content-end mr-0 p-4'>
                      <p className=''>Sort:</p>
                      <select className="w-32 bg-gradient-to-br from-purple1 to-yellow1 block w-full text-sm px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                      value={selectedSort}
                      onChange={e => setSelectedSort(e.target.value)}>
                        <option className='text-black' value="highest">highest</option>
                        <option className='text-black' value="lowest">lowest</option>
                      </select>
                    </div>
                    <div className='block content-end mr-0 p-4'>
                      <p className=''>Filter:</p>
                      <select className="w-32 bg-gradient-to-br from-purple1 to-yellow1 block w-full text-sm px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                      value={selectedFilter}
                      onChange={e => setSelectedFilter(e.target.value)}>
                        <option className='text-black' value="dailly">daily</option>
                        {/* <option className='text-black' value="lowest">lowest</option> */}
                      </select>
                    </div>
                    <div className='block content-end mr-0 p-4'>
                      <p className=''>Date:</p>
                      <DatePicker
                        selected={selectedDate}
                        onChange={e => e ? setSelectedDate(e) : {}}
                        className="w-32 bg-gradient-to-br from-purple1 to-yellow1 block w-full text-sm px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className='block content-end mr-0 p-4'>
                      <p className='inline-block'>Custom Total:</p>
                      <div className='flex items-center justify-end'>
                        <p>{dashboard?.currentVisitors ?? 0}</p>
                        <img src="/person.png" alt="people" className='h-6' />
                      </div>
                    </div>
                  </div>
                </div>


                <div>
                  <div className="max-w-sm w-full rounded-lg shadow dark:bg-gray-800 text-white m-8">
                    <Bar className='bg-transparent'
                      data={{
                        labels: dashboard.chartData.map(entry => entry.label),
                        datasets: [{
                          label: '',
                          data: dashboard.chartData.map(entry => entry.value),
                          backgroundColor: 'white',
                          // backgroundColor: 'white',
                          // borderWidth: 1,
                        }]
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            display: false, // Remove legend
                          },
                          title: {
                            display: false,
                            text: 'Bar Chart',
                          },
                        },
                        scales: {
                          y: {
                            type: 'linear',
                            beginAtZero: true,
                            ticks: {
                              color: 'white', // Change text labels color to white
                            },
                          },
                          x: {
                            ticks: {
                              color: 'white', // Change text labels color to white
                            },
                          },
                        },
                        backgroundColor: '#11306F', // Chart background color
                      }} />
                  </div>

                </div>
              </div>
            </div>
            <div>
              <table className="md:w-full ">
                {/* Table header */}
                <thead className=''>
                  <tr className="bg-gradient-to-br from-purple1 to-yellow1 ">
                    <th className="px-4 py-2 text-center">
                      Date
                    </th>
                    <th className="px-4 py-2 text-center">
                      Hour
                    </th>
                    <th className="px-4 py-2 text-center">
                      Visitors
                    </th>
                    <th className="px-4 py-2 text-center">
                      Entered
                    </th>
                    <th className="px-4 py-2 text-center">
                      Exited
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {tableData.map((item) => (
                    <tr key={item.id} className="border-b-2 border-black">
                      <td className="px-4 py-2 text-center ">{item.date.split("T")[0]}</td>
                      <td className="px-4 py-2 text-center ">{hourFormatter(item.hour)}</td>
                      <td className="px-4 py-2 text-center ">{item.visitors}</td>
                      <td className="px-4 py-2 text-center ">{item.entered}</td>
                      <td className="px-4 py-2 text-center ">{item.exited}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <table>

              </table>
            </div>
          </div>
        </div>

      </div>
    </>

  );
};

export default dashboard;