import { React, useState, useEffect } from "react";
import useAxiosJWT from '../../hooks/useAxiosJWT';
import { Line } from 'react-chartjs-2';

import calculateUsersByDate from "./calculateUsersByDate.js";
import LoaderSpinner from '../LoaderSpinner';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
} from "reactstrap";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function Card2RPD() {

    const axiosJWT = useAxiosJWT();

    //STATES
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalAdmins, setTotalAdmins] = useState(0);
    const [totalNonAdmins, setTotalNonAdmins] = useState(0);

    const [allChartData, setAllChartData] = useState([]);
    const [cardReady, setCardReady] = useState(false);

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {

        try {

            var users = await axiosJWT.get("/admin/users");

            let ubdData = calculateUsersByDate(users.data);

            let ubdArray = ubdData.ubdArray;

            // FORMAT CHART DATA
            let calcLabels = [];
            let calcUserData = [];
            let calcAdminData = [];
            let calcNonAdminData = [];

            ubdArray.forEach((ubd) => {
                calcLabels.push(ubd.label);
                calcUserData.push(ubd.userCount);
                calcAdminData.push(ubd.adminCount);
                calcNonAdminData.push(ubd.nonAdminCount);
            });

            let formattedData = {
                labels: calcLabels,
                datasets: [
                    {
                        label: 'All Users',
                        data: calcUserData,
                        borderColor: 'rgb(168, 255, 61)',
                        backgroundColor: 'rgba(168, 255, 61, 0.5)',
                    },
                    {
                        label: 'Admins',
                        data: calcAdminData,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                    {
                        label: 'Non-Admins',
                        data: calcNonAdminData,
                        borderColor: 'rgb(98, 159, 208)',
                        backgroundColor: 'rgba(98, 159, 208, 0.5)',
                    },
                ],
            }

            setAllChartData(formattedData);
            setTotalUsers(ubdData.totalUsers);
            setTotalAdmins(ubdData.totalAdmins);
            setTotalNonAdmins(ubdData.totalNonAdmins);
            setCardReady(true);

        } catch (err) {
            console.log("Error Code: 0066");
            console.log(err); // TODO: Flash Messages
        }
    }

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <>    
            <Card className="card-chart my-5 custom-card" >
                <CardHeader>
                    <CardTitle tag="h3">
                        <i className="custom-icons bell-icon text-info" /> New Users Per Day
                    </CardTitle>

                </CardHeader>
                <CardBody className="">
                    {!cardReady
                        ?
                        <LoaderSpinner />
                        :
                        <div className="chart-area">
                            <h4>Total Users Created: {totalUsers}</h4>
                            <h6>Admins: {totalAdmins}</h6>
                            <h6>Non-admins: {totalNonAdmins}</h6>
                            <p><small>--click to toggle options--<br/>--hover for precise data--</small></p>
                            <Line data={allChartData} options={chartOptions} />
                        </div>
                    }
                </CardBody>
            </Card>
        </>
    );
}

export default Card2RPD;
