import React from 'react';
import { useState, useEffect } from 'react';
import { Spinner } from 'reactstrap';

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
} from "reactstrap";


/*
Example of how to use this:
<>    
    <Card>
        <CardHeader>
            <CardTitle>
                Hi.
            </CardTitle>
        </CardHeader>
        <CardBody>
            {
                !cardReady //ALWAYS SET CARD READY AFTER API CALL SUCCESS
                ?
                <LoaderSpinner />
                :
                <div className="chart-area">
                    <h4>Total Users Created: {totalUsers}</h4>
                    <Line data={allChartData} options={chartOptions} />
                </div>
            }  
        </CardBody>
    </Card>
</>

*/

function LoaderSpinner() {

    return (
        <>
            <div className='spinnerHolder'>
                <Spinner
                    color="info"
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                    type="grow"
                >
                    Loading...
                </Spinner>
            </div>

        </>
    )
}

export default LoaderSpinner;