import React from "react";
import JobSeekerLayout from "../../../layouts/JobSeekerLayout";
import { Card } from "react-bootstrap";
import LanguagesCvComponent from "../../../Component/Cv/Language";

const LanguageCv =()=>{
   return (
    <JobSeekerLayout>
    <Card>
        <Card.Body>
          <LanguagesCvComponent />
        </Card.Body>
    </Card>
    </JobSeekerLayout>
   ) 
}
export default LanguageCv;