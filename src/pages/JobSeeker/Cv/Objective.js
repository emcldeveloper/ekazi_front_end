import React from "react";
import JobSeekerLayout from "../../../layouts/JobSeekerLayout";
import ProfessionalSummary from "../../../Component/Cv/Objective";
import { Card } from "react-bootstrap";


const ObjectDetail = () => {
    return (

        <JobSeekerLayout>

            <Card className="shadow-smy">
                <Card.Body className="p-4">
                    <ProfessionalSummary />
                </Card.Body>
            </Card>
        </JobSeekerLayout>
    )
}
export default ObjectDetail