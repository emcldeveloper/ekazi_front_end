import React from "react";
import JobSeekerLayout from "../../../layouts/JobSeekerLayout";
import Proficiencycvcomponent from "../../../Component/Cv/Procifiency";
import { Card } from "react-bootstrap";
const Proficiencycv = () => {
    return (
        <JobSeekerLayout>
            <Card>
                <Card.Body>
                    <Proficiencycvcomponent />
                </Card.Body>
            </Card>
        </JobSeekerLayout>
    )
}
export default Proficiencycv;