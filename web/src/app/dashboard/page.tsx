"use client";
import React, { ChangeEvent, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Cookies from 'universal-cookie';
import toast from 'react-hot-toast';
import { Device } from './[id]/dashboard.type';
import { Line } from 'react-chartjs-2';


const dashboard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dashboards, setDashboards] = useState<Device[]>([]);
  const [dashboardError, setDashboardError] = useState("");
  const [input, setInput] = useState({
    id: "",
    name: ""
  });

  useEffect(() => {
    const fetchData = async (token: string) => {
      // try {
      setLoading(true);
      const res = await axios.get('/api/listDashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      if (res.status === 401) {
        // window.location.href = "/";
      } else {
        setDashboards(res.data);
        setLoading(false);
      }
      // } catch (err) {
      //   console.log(err);
      // }
    };

    const Cookie = new Cookies();
    const payload = Cookie.get("payload");
    if (!payload) {
      // window.location.href = "/";
    } else {
      const token: string = Cookie.get("token");
      fetchData(token);
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


  return (
    <>
      <Navbar currPage='dashboard' />
      <div className="w-full min-h-screen items-center justify-between font- text-sm p-24 bg-gradient-to-b from-black1 to-blue1">
        <div className='justify-center content-center text-white1'>
          <div>
            {dashboards.map((item, idx) =>
              <div key={idx} >
                <div className="mx-auto font-bold text-xl content-center text-center my-2 bg-gradient-to-br text-center from-purple1 to-yellow1 border-2 text-white1 w-96 text-md rounded-lg block px-8 mt-12 py-2" >
                  Dashboard {item.name}
                </div>
                <div className='text-lg border-2 border-white1 rounded-lg gap-x-8 px-12'>
                  <div className='flex'>
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

                      <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800">
                        {/* <Line data={data} options={{
                          responsive: true,
                          plugins: {
                            legend: {
                              position: 'top',
                            },
                            title: {
                              display: true,
                              text: "Today's Visitors",
                            },
                          },
                        }} /> */}
                      </div>

                    </div>
                  </div>
                </div>
              </div>
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