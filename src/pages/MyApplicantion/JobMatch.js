import React, { useEffect, useState } from "react";
import JobSeekerLayout from "../../layouts/JobSeekerLayout";
import { JobsMatch } from "../../Api/Job/FeactureJob";
import JobSeekerStatistic from "../JobSeeker/JobSeeker/Statistics/JobSeekerStatistic";
import MatchJobList from "../../Component/Jobs/JobMatch";

const JobMatch = () => {
  const applicant_id = 48;
  const [jobmatchs, setJobMatch] = useState([]);

  useEffect(() => {
    const myJobMatch = async () => {
      try {
        const response = await JobMatch(applicant_id);
        console.log("jobmatch");
        setJobMatch(response); // response is already the data
      } catch (err) {
        console.error("Error fetching applications:", err);
      }
    };

    myJobMatch();
  }, [applicant_id]);

  console.log("Response data my job match are:", jobmatchs);

  return (
    <JobSeekerLayout>
      <MatchJobList />
    </JobSeekerLayout>
  );
};
export default JobMatch;
