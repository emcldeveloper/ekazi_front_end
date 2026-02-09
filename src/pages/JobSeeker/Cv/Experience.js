import React from "react";
import JobSeekerLayout from "../../../layouts/JobSeekerLayout";
import WorksExperiencesCv from "../../../Component/Cv/ExperienceCv";
import { Card } from "react-bootstrap";

const ExperinceCv = () => {
    return (
        <JobSeekerLayout>
            <Card>
                <Card.Body>
                    <WorksExperiencesCv />
                </Card.Body>
            </Card>
        </JobSeekerLayout>
    )
}
export default ExperinceCv;