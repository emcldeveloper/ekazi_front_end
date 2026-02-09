import React from "react";
import JobSeekerLayout from "../../../layouts/JobSeekerLayout";
import { Card } from "react-bootstrap";
import CompleteCv from "../../../Component/Cv/Complete";

const Complete = () => {
    return (
        <JobSeekerLayout>
            <Card>
                <Card.Body>
                    <CompleteCv></CompleteCv>
                </Card.Body>
            </Card>
        </JobSeekerLayout>
    )
}
export default Complete;