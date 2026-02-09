import React from "react";
import JobSeekerLayout from "../../../layouts/JobSeekerLayout";
import { Card } from "react-bootstrap";
import Training from "../../../Component/Cv/Training";

const TrainingCv =()=>{
    return (
        <JobSeekerLayout>
          <Card>
            <Card.Body>
                <Training>
                    
                </Training>
            </Card.Body>
          </Card>
        </JobSeekerLayout>
    )
}
export default TrainingCv;