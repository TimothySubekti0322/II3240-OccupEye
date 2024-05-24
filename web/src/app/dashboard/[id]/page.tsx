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
              const dashboardData : DashboardData = (res.data);
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