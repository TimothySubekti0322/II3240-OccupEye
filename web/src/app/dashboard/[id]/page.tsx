"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import type { DashboardData, Data } from "./dashboard.type";
import Cookies from 'universal-cookie';

const dashboard = (id: number) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (token: string) => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/dashboard/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 401) {
          window.location.href = "/";
        } else {
          const dashboardData: DashboardData = (res.data);
          console.log(res.data);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const Cookie = new Cookies();
    const payload = Cookie.get("payload");
    if (payload) {
      window.location.href = "/";
    } else {
      const token: string = Cookie.get("token");
      fetchData(token);
    }
  }, []);

  const hourFormatter = (hour: number): string => {
    if (hour < 10) {
      return `0${hour}:00`;
    }
    return `${hour}:00`;
  };


  return (
    <>
      <Navbar currPage='dashboard' />
      <div className="w-full min-h-screen items-center justify-between font- text-sm p-24 bg-gradient-to-b from-black1 to-blue1">
        <div className='justify-center content-center text-white1'>
          <div className="mx-auto font-bold text-xl content-center text-center my-2 bg-gradient-to-br text-center from-purple1 to-yellow1 border-2 text-white1 w-96 text-md rounded-lg block px-8 mt-12 py-2" >
            Dashboard Toko Tuku
          </div>
          <div className='text-lg border-2 border-white1 rounded-lg gap-x-8 px-12'>
            <div className='flex'>
              <div className='block content-end mr-0 p-4'>
                <p className='inline-block'>Current Visitors:</p>
                <div className='flex items-center justify-end'>
                  <p>a</p>
                  <img src="/person.png" alt="people" className='h-6' />
                </div>
              </div>
              <div className='block content-end mr-0 p-4'>
                <p className='inline-block'>Daily Total:</p>
                <div className='flex items-center justify-end'>
                  <p>a</p>
                  <img src="/person.png" alt="people" className='h-6' />
                </div>
              </div>
              <div className='block content-end mr-0 p-4'>
                <p className='inline-block'>Hourly Total:</p>
                <div className='flex items-center justify-end'>
                  <p>a</p>
                  <img src="/person.png" alt="people" className='h-6' />
                </div>
              </div>
              <div>

                <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800">
                  <div className="flex justify-between p-4 md:p-6 pb-0 md:pb-0">
                    <div>
                      <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">$12,423</h5>
                      <p className="text-base font-normal text-gray-500 dark:text-gray-400">Sales this week</p>
                    </div>
                    <div
                      className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                      23%
                      <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                      </svg>
                    </div>
                  </div>
                  <div id="labels-chart" className="px-2.5"></div>
                  <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-5 p-4 md:p-6 pt-0 md:pt-0">
                    <div className="flex justify-between items-center pt-5">
                      <button
                        id="dropdownDefaultButton"
                        data-dropdown-toggle="lastDaysdropdown"
                        data-dropdown-placement="bottom"
                        className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
                        type="button">
                        Last 7 days
                        <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                        </svg>
                      </button>
                      <div id="lastDaysdropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                          <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Yesterday</a>
                          </li>
                          <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today</a>
                          </li>
                          <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 7 days</a>
                          </li>
                          <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 30 days</a>
                          </li>
                          <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 90 days</a>
                          </li>
                        </ul>
                      </div>
                      <a
                        href="#"
                        className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
                        Sales Report
                        <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

              </div>
              <div>
                <table className="md:w-full table-auto">
                  {/* Table header */}
                  <thead>
                    <tr className="bg-[#DAE0E6]">
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
                    {data.map((item) => (
                      <tr key={item.id} className="border-b-2 border-black">
                        <td className="px-4 py-2 text-center ">{item.date.split("T")[0]}</td>
                        <td className="px-4 py-2 text-center ">{hourFormatter(item.hour)}</td>
                        <td className="px-4 py-2 text-center ">{item.visitors}</td>
                        <td className="px-4 py-2 text-center ">{item.entered}</td>
                        <td className="px-4 py-2 text-center ">{item.exited}</td>                        <td className="px-4 py-2  flex flex-row items-center justify-center">

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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