"use client";
import React, { ChangeEvent, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Cookies from 'universal-cookie';
import toast from 'react-hot-toast';
import { Device } from './[id]/dashboard.type';
import { Bar } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, Title, Legend, BarElement, BarController } from 'chart.js';



const dashboard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dashboards, setDashboards] = useState<Device[]>([]);
  const [dashboardError, setDashboardError] = useState("");
  const [input, setInput] = useState({
    id: "",
    name: ""
  });



  useEffect(() => {
    //   const fetchData = async (token: string) => {

    //     // try {
    //     setLoading(true);
    //     const res = await axios.get('/api/listDashboard', {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     console.log(res);
    //     if (res.status === 401) {
    //       // window.location.href = "/";
    //     } else {
    //       setDashboards(res.data);
    //       setLoading(false);
    //     }
    //     // } catch (err) {
    //     //   console.log(err);
    //     // }
    //   };

    const data: Device[] = [
      {
        id: '1',
        name: 'Device 1',
        email: 'example@example.com',
        currentVisitors: 0,
        enteredToday: 0,
        enteredThisHour: 0,
        chartData: [
          { value: 65, label: '1' },
          { value: 59, label: '2' },
          { value: 80, label: '3' },
          { value: 81, label: '4' },
          { value: 56, label: '5' },
          { value: 55, label: '6' },
          { value: 40, label: '7' },
          { value: 80, label: '8' },
          { value: 81, label: '9' },
          { value: 56, label: '10' },
          { value: 55, label: '11' },
          { value: 40, label: '12' },
          { value: 65, label: '13' },
          { value: 59, label: '14' },
          { value: 80, label: '15' },
          { value: 81, label: '16' },
          { value: 56, label: '17' },
          { value: 55, label: '18' },
          { value: 40, label: '19' },
          { value: 80, label: '20' },
          { value: 81, label: '21' },
          { value: 56, label: '22' },
          { value: 55, label: '23' },
          { value: 40, label: '24' }
        ],
      },
      // Add more devices as needed
    ];
  
    setDashboards(data);
    console.log(dashboards);  

    const Cookie = new Cookies();
    const payload = Cookie.get("payload");
    if (!payload) {
      // window.location.href = "/";
    } else {
      const token: string = Cookie.get("token");
      // fetchData(token);
    }
  }, []);

  const handleDashboard = (idx: number) => {
    // window.location.href = `/dashboard/${idx}`;
  }

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setInput(prevState => ({
      ...prevState,
      [name]: value
    }));
  }


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    if (input.name === "" || input.id === "") {
      setDashboardError("Input tidak boleh kosong!");
    } else {
      try {
        event.preventDefault();
        const Cookie = new Cookies();
        const token = Cookie.get("token");
        const res = await axios.post("/api/device", input, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 201) {
          toast.success("Dashboard added successfully");
        } else if (res.status === 401) {
          toast.error("Failed to add dashboard")
          // window.location.href = "/";
        }
      } catch (err) {
        console.log(err);
        setTimeout(toast.error("Something went wrong"), 100);
      } finally {
        setLoading(false);
        setInput({
          id: "",
          name: ""
        });
        setTimeout(() => {
          // window.location.href = "/dashboard";
        }, 1000); // Delayed by 2000 milliseconds (2 seconds)
      }
    }

  };


  Chart.register(LinearScale, CategoryScale, Title, Legend, BarElement, BarController);

  return (
    <>
      <Navbar currPage='dashboard' />
      <div className="w-full min-h-screen items-center justify-between font- text-sm p-24 bg-gradient-to-b from-black1 to-blue1">
        <div className='justify-center content-center text-white1 align-middle'>
          <div className='flex justify-center'>
            {dashboards.map((item, idx) =>
              <button onClick={() => {window.location.href = `/dashboard/${item.id}`}} key={idx} >
                <div className="mx-auto font-bold text-xl content-center text-center my-2 bg-gradient-to-br text-center from-purple1 to-yellow1 border-2 text-white1 w-96 text-md rounded-lg block px-8 mt-12 py-2" >
                  Dashboard {item.name}
                </div>
                <div className='text-lg border-2 border-white1 rounded-lg gap-x-8 px-12'>
                  <div className='flex items-center align-middle justify-between'>
                    <div className='block content-end mr-0 p-4'>
                      <p className='inline-block'>Current Visitors:</p>
                      <div className='flex items-center justify-end'>
                        <p>{item.currentVisitors}</p>
                        <img src="/person.png" alt="people" className='h-6' />
                      </div>
                    </div>
                    <div className='block content-end mr-0 p-4'>
                      <p className='inline-block'>Daily Total:</p>
                      <div className='flex items-center justify-end'>
                        <p>{item.enteredToday}</p>
                        <img src="/person.png" alt="people" className='h-6' />
                      </div>
                    </div>
                    <div className='block content-end mr-0 p-4'>
                      <p className='inline-block'>Hourly Total:</p>
                      <div className='flex items-center justify-end'>
                        <p>{item.enteredThisHour}</p>
                        <img src="/person.png" alt="people" className='h-6' />
                      </div>
                    </div>
                    <div>

                      <div className="max-w-sm w-full rounded-lg shadow dark:bg-gray-800 text-white m-8">
                        <Bar className='bg-transparent'
                          data={{
                            labels: item.chartData.map(entry => entry.label),
                            datasets: [{
                              label: '',
                              data: item.chartData.map(entry => entry.value),
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
              </button>
            )}
          </div>
        </div>
        <div className='flex'>
          <div className="text-lg text-white1 text-md rounded-lg block w-96 px-2.5  hover:text-white drop-shadow-lg hover:drop-shadow-md hover:"
          // onClick={generateKey} 
          >
            <label
              htmlFor="id"
              className="block py-2 text-sm font-medium whitespace-nowrap"
            >
              ID Dashboard:
            </label>
            <div className="w-full rounded-lg h-[40px] items-center flex justify-center bg-gradient-to-br from-pink1 to-purple1">
              <input
                id="id"
                name="id"
                className="rounded-lg  w-full h-[34px] m-0.5 text-black1 px-2 text-sm"
                onChange={handleInputChange}
              ></input>
            </div>
            <i className="text-sm text-red1">{dashboardError}</i>
          </div>
          <div className="text-lg text-white1 text-md rounded-lg block w-96 px-2.5  hover:text-white drop-shadow-lg hover:drop-shadow-md hover:"
          // onClick={generateKey} 
          >
            <label
              htmlFor="name"
              className="block py-2 text-sm font-medium whitespace-nowrap"
            >
              Nama Dashboard:
            </label>
            <div className="w-full rounded-lg h-[40px] items-center flex justify-center bg-gradient-to-br from-pink1 to-purple1">
              <input
                id="name"
                name="name"
                className="rounded-lg  w-full h-[34px] m-0.5 text-black1 px-2 text-sm"
                onChange={handleInputChange}
              ></input>
            </div>
            <i className="text-sm text-red1">{dashboardError}</i>
          </div>
          <form className="mx-auto font-bold text-xl content-center text-center bg-gradient-to-br text-center from-purple1 to-yellow1 border-2 text-white1 w-96 text-md rounded-lg block px-8 mt-4 py-2"
            onClick={handleSubmit}>
            Add Dashboard
          </form>
        </div>

      </div>
    </>

  );
}

export default dashboard;