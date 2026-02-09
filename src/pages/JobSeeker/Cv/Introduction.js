import React from "react";
import JobSeekerLayout2 from "../../../layouts/JobSeekerLayout2";
import JobSeekerLayout from "../../../layouts/JobSeekerLayout";
import IntroductionDetails from "../../../Component/Cv/IntroductionDeatil";
import { Card } from "react-bootstrap";
const IntroductionData = () => {
    return (
        //  <JobSeekerLayout2>

        //  </JobSeekerLayout2>
        <JobSeekerLayout>
            <Card className="shadow-smy">
                <Card.Body className="p-4">
                    <IntroductionDetails />
                </Card.Body>
            </Card>
        </JobSeekerLayout>
    )
}
export default IntroductionData