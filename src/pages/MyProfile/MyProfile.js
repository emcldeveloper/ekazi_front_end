import React from "react";
import JobSeekerLayout from "../../layouts/JobSeekerLayout";
import { Container, Row, Col, Card } from 'react-bootstrap';
import PersonalData from "../../Component/Profile/PersonalData";
const MyProfile = () => {
    return (
        <JobSeekerLayout>
            <Container fluid style={{
                height: '170vh',
                overflowY: 'scroll',
                scrollbarWidth: 'none', /* Firefox */
                msOverflowStyle: 'none',  /* IE and Edge */
            }}>
                {/* Hide scrollbar for Chrome, Safari and Opera */}
                {/* <style>
                    {`::-webkit-scrollbar {
                    display: none;
                    }`}
                </style> */}
             <PersonalData/>

                {/* Career Profile */}
                <Row className="justify-content-center mb-3">
                    <Col >
                        <Card className="shadow-sm">
                            <Card.Body className="p-4">
                                <h5 className="card-title text-primary">Career Profile</h5>
                                {/* Add career profile content here */}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Career Objective */}
                <Row className="justify-content-center mb-3">
                    <Col >
                        <Card className="shadow-sm">
                            <Card.Body className="p-4">
                                <h5 className="card-title text-primary">Career Objective</h5>
                                {/* Add career objective content here */}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Work Experience */}
                <Row className="justify-content-center mb-3">
                    <Col >
                        <Card className="shadow-sm">
                            <Card.Body className="p-4">
                                <h5 className="card-title text-primary">Work Experience</h5>
                                {/* Add work experience content here */}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Education */}
                <Row className="justify-content-center mb-3">
                    <Col>
                        <Card className="shadow-sm">
                            <Card.Body className="p-4">
                                <h5 className="card-title text-primary">Education</h5>
                                {/* Add education content here */}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Career Skills */}
                <Row className="justify-content-center mb-3">
                    <Col >
                        <Card className="shadow-sm">
                            <Card.Body className="p-4">
                                <h5 className="card-title text-primary">Skills & Tools</h5>
                                {/* Include your career skills component here */}
                                {/* <CareerSkills /> */}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Job Fit */}
                <Row className="justify-content-center mb-3">
                    {/* <Col xs={12} md={10} lg={8} xl={6}> */}
                    <Col>
                        <Card className="shadow-sm">
                            <Card.Body className="p-4">
                                <h5 className="card-title text-primary">Job Fit</h5>
                                {/* Add job fit content here */}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Languages */}
                <Row className="justify-content-center mb-3">
                    <Col >
                        <Card className="shadow-sm">
                            <Card.Body className="p-4">
                                <h5 className="card-title text-primary">Languages</h5>
                                {/* Add languages content here */}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Proficiency */}
                <Row className="justify-content-center mb-3">
                    <Col >
                        <Card className="shadow-sm">
                            <Card.Body className="p-4">
                                <h5 className="card-title text-primary">Proficiency</h5>
                                {/* Add proficiency content here */}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Training */}
                <Row className="justify-content-center mb-3">
                    <Col >
                        <Card className="shadow-sm">
                            <Card.Body className="p-4">
                                <h5 className="card-title text-primary">Training</h5>
                                {/* Add training content here */}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* References */}
                <Row className="justify-content-center mb-3">
                    <Col >
                        <Card className="shadow-sm">
                            <Card.Body className="p-4">
                                <h5 className="card-title text-primary">References</h5>
                                {/* Add references content here */}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </JobSeekerLayout>

    )
}
export default MyProfile;