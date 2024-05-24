'use client';
import { ChangeEvent, useLayoutEffect, useState } from "react";
import axios from "axios";
import { getCookie, setCookie } from 'typescript-cookie'
// import Loader from "./Loader";
import Navbar from "../components/Navbar";

interface LoginData {
    email: string,
    password: string
}

export default function SignUp() {
    const [loginData, setLoginData] = useState<LoginData>({
        email: "",
        password: ""
    })

    const [loading, setLoading] = useState<boolean>(true);
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    useLayoutEffect(() => {
        // const cookies = new Cookies();
        // const token = cookies.get("token");
        // if (token) {
        //     window.location.href = "/dashboard";
        // } else {
        //     setLoading(false);
        // }
    }, []);


    const handleLoginChange = (
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoadingSubmit(true);
        try {
            // const res = await axios.post("/api/auth/", form);
            // console.log(res.data);
            // if (res.data.status === 200) {
            //     console.log(res.data);
            //     const cookies = new Cookies();
            //     if (res.data.rememberMe) {
            //         cookies.set("token", res.data.token, {
            //             path: "/",
            //             expires: new Date(Date.now() + 12096e5),
            //         });
            //         cookies.set("payload", res.data.payload, {
            //             path: "/",
            //             expires: new Date(Date.now() + 12096e5),
            //         });
            //     } else {
            //         cookies.set("token", res.data.token, { path: "/" });
            //         cookies.set("payload", res.data.payload, { path: "/" });
            //     }
            //     setEmailError(false);
            //     setPasswordError(false);
            //     if (res.data.payload.role === "Admin") {
            //         window.location.href = "/dashboard/student";
            //     } else {
            //         window.location.href = "/dashboard/class";
            //     }
            // } else if (res.data.status === 404) {
            //     setEmailError(true);
            // } else if (res.data.status === 401) {
            //     setPasswordError(true);
            // }
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingSubmit(false);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <div className="w-full min-h-screen items-center justify-between font- text-sm p-24 bg-gradient-to-b from-black1 to-blue1">
                <div>
                    <div className="font-bold text-white text-xl text-center pt-8 pb-4">
                        Sign Up to OccupEye.
                    </div>
                    <div className="flex flex-col items-center ">
                    <div className="text-lg text-white1 text-md rounded-lg block w-96 px-2.5  hover:text-white drop-shadow-lg hover:drop-shadow-md hover:"
                        // onClick={generateKey} 
                        >
                            <label
                                htmlFor="key"
                                className="block py-2 text-sm font-medium whitesspace-nowrap"
                            >
                                Name:
                            </label>
                            <div className="w-full rounded-lg h-[40px] items-center flex justify-center bg-gradient-to-br from-purple1 to-yellow1">
                                <input
                                    id="key"
                                    name="key"
                                    className="rounded-lg  w-full h-[34px] m-0.5 text-black1 px-2 text-sm"
                                    onChange={handleLoginChange}
                                ></input>
                            </div>
                            <i className="text-sm text-red1">{nameError}</i>
                        </div>
                        <div className="text-lg text-white1 text-md rounded-lg block w-96 px-2.5  hover:text-white drop-shadow-lg hover:drop-shadow-md hover:"
                        // onClick={generateKey} 
                        >
                            <label
                                htmlFor="key"
                                className="block py-2 text-sm font-medium whitespace-nowrap"
                            >
                                Email:
                            </label>
                            <div className="w-full rounded-lg h-[40px] items-center flex justify-center bg-gradient-to-br from-purple1 to-yellow1">
                                <input
                                    id="key"
                                    name="key"
                                    className="rounded-lg  w-full h-[34px] m-0.5 text-black1 px-2 text-sm"
                                    onChange={handleLoginChange}
                                ></input>
                            </div>
                            <i className="text-sm text-red1">{emailError}</i>
                        </div>
                        <div className="text-lg text-white1 text-md rounded-lg block w-96 px-2.5  hover:text-white drop-shadow-lg hover:drop-shadow-md hover:"
                        // onClick={generateKey} 
                        >
                            <label
                                htmlFor="key"
                                className="block py-2 text-sm font-medium whitesspace-nowrap"
                            >
                                Password:
                            </label>
                            <div className="w-full rounded-lg h-[40px] items-center flex justify-center bg-gradient-to-br from-purple1 to-yellow1">
                                <input
                                    id="key"
                                    name="key"
                                    className="rounded-lg  w-full h-[34px] m-0.5 text-black1 px-2 text-sm"
                                    onChange={handleLoginChange}
                                ></input>
                            </div>
                        </div>
                        <div className="text-lg text-white1 text-md rounded-lg block w-96 px-2.5  hover:text-white drop-shadow-lg hover:drop-shadow-md hover:"
                        // onClick={generateKey} 
                        >
                            <label
                                htmlFor="key"
                                className="block py-2 text-sm font-medium whitesspace-nowrap"
                            >
                                Confirm Password:
                            </label>
                            <div className="w-full rounded-lg h-[40px] items-center flex justify-center bg-gradient-to-br from-purple1 to-yellow1">
                                <input
                                    id="key"
                                    name="key"
                                    className="rounded-lg  w-full h-[34px] m-0.5 text-black1 px-2 text-sm"
                                    onChange={handleLoginChange}
                                ></input>
                            </div>
                            <i className="text-sm text-red1">{passwordError}</i>
                        </div>
                        <div>
                            <form className="my-2 bg-gradient-to-br text-center from-purple1 to-yellow1 border-2 border- text-white1 text-md rounded-lg block w-96 mt-8 py-2  hover:text-white drop-shadow-lg hover:drop-shadow-md hover:"
                            onSubmit ={handleSubmit} 
                            >
                                Sign Up
                            </form>
                        </div>
                        <div>
                            <button onClick={() => (window.location.href = "/login")} className="my-2 text-white1 text-md rounded-lg block w-96  hover:text-white drop-shadow-lg hover:drop-shadow-md hover:" >
                                log in instead
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
