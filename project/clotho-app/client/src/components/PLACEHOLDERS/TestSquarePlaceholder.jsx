import React, { useState, useEffect } from 'react';

// reactstrap components
import {
    Row,
    Col,
} from "reactstrap";

function TestSquarePlaceholder({ details }) {

    return (
        <>
            <div className="testSquare">
                <Row>
                    <Col>
                        <div>
                            <h4>Under Construction</h4>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>
                            <p>{ details.text }</p>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default TestSquarePlaceholder;