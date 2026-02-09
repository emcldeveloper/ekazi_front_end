import React, { useEffect, useState } from "react";
import { Card, Button, Image } from "react-bootstrap";
 
const API_BASE_URL = process.env.REACT_APP_API_URL;


const RecomendJob = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


  
    return (
        <div className="d-flex flex-column gap-3">
            {/* Featured Companies Section */}
            <Card className="shadow-sm">
                <Card.Body>
                    <h5 className="fw-bold mb-3">Recommended Job</h5>

                </Card.Body>
            </Card>


        </div>
    );
};

export default RecomendJob;
