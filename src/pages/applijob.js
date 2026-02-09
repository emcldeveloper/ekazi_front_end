import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

const CoverLetterForm = () => {
    const [originalDetails, setOriginalDetails] = useState(null);
   
   
    const [coverLetter, setCoverLetter] = useState('');
    const { register, handleSubmit } = useForm();
    const { uuid, template } = useParams();
    const [searchParams] = useSearchParams();
    const jobId = searchParams.get('jobId') || localStorage.getItem('jobId');
    
    const [job, setJob] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // Debugging output
    console.log({
      uuid,
      template,
      jobIdFromURL: searchParams.get('jobId'),
      jobIdFromStorage: localStorage.getItem('jobId'),
      finalJobId: jobId
    });
  
    // Fetch job data when jobId changes
    
 
    useEffect(() => {
        
        const fetchData = async () => {
            try {
                console.log("Fetching data for UUID:", uuid);
                const response = await axios.get(`http://127.0.0.1:8000/api/cv/cv_builder/${uuid}`);

                if (response.data?.data) {
                    console.log("API Response:", response.data.data);
                    setOriginalDetails(response.data.data);
                } else {
                    throw new Error("Invalid response format");
                }
            } catch (error) {
                console.error("API Error:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [uuid]);

    useEffect(() => {
        if (!jobId) {
            setError('No job ID found');
            setLoading(false);
            return;
          }
      
        const fetchJobData = async () => {
            try {
                
                const response = await axios.get(`http://127.0.0.1:8000/api/applicant/jobdetail/${jobId}`);

                if (response.data) {
                    console.log("view job by id:", response.data);
                    setJob(response.data);
                } else {
                    throw new Error("Invalid response format");
                }
            } catch (error) {
                console.error("API Error:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobData();
    }, [jobId]);

    if (loading) {
        return <div className="container text-center py-5">Loading application data...</div>;
    }

    if (error) {
        return <div className="container text-center py-5 text-danger">Error: {error}</div>;
    }

    if (!originalDetails) {
        return <div className="container text-center py-5">No application data found</div>;
    }

    // Ensure applicant_profile exists and is an array
    const applicantProfiles = originalDetails.applicant_profile || [];
    const applicantadress = originalDetails.address || [];

    return (
        <div className="container px-4"> {/* Added horizontal padding */}
        <div className="row">
          <div className="col-md-12">
            <div className="job_header text-center py-3">
              <h2 className="text-primary fw-bold border-bottom pb-2 d-inline-block">
                Cover Letter Application Form
              </h2>
            </div>
      
            <div className="card" style={{
              borderTop: 'none',
              borderBottom: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              backgroundColor: 'transparent' // Remove card background if needed
            }}>
              <div className="card-header bg-transparent"> {/* Removed background */}
                {/* Address section with improved spacing */}
                <div className="row justify-content-between mb-4"> {/* Added bottom margin */}
                  {/* Employer Address - Bottom Left */}
                  <div className="col-md-5 align-self-end"> {/* Align to bottom */}
                    {job.map((jobItem, index) => (
                      <div className="form-group mb-0" key={index}> {/* Remove bottom margin */}
                        <div><b>{jobItem.client?.client_name}</b></div>
                        <div><b>{jobItem.job_position?.position_name}</b></div>
                        <div><b>P.O.BOX</b></div>
                        <div>
                          {jobItem.client?.client_addresses?.sub_location},
                          {jobItem.client?.client_addresses?.region?.region_name}
                        </div>
                        <div>
                          {jobItem.client?.client_addresses?.region?.country?.name}
                        </div>
                      </div>
                    ))}
                  </div>
      
                  {/* Applicant Address - Top Right */}
                  <div className="col-md-5 text-end align-self-start"> {/* Align to top */}
                    <div className="form-group">
                      {originalDetails.applicant_profile.map((item, index) => (
                        <p key={index} className="mb-1"><b>{item.first_name} {item.last_name}</b></p>
                      ))}
                      <div className="mb-1">P.O.BOX</div>
                      {applicantadress.map((item, index) => (
                        <p key={index} className="mb-1">{item.region_name}, {item.name}</p>
                      ))}
                      <p className="mb-0">{new Date().toLocaleDateString('en-GB')}</p>
                    </div>
                  </div>
                </div>
      
                {/* Salutation with proper spacing */}
                <div className="row mt-4"> {/* Increased top margin */}
                  <div className="col-md-12 px-3"> {/* Added horizontal padding */}
                    <p>Dear Sir/Madam,</p>
                  </div>
                </div>
              </div>
      
              {/* Content with side margins */}
              <div className="card-body px-lg-5"> {/* Responsive side padding */}
                <form>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="job_header text-center mb-4"> {/* Increased bottom margin */}
                        REF: APPLICATION FOR THE POST OF
                        {job.map((jobItem, index) => (
                          <span key={index} className="d-block mt-1"> {/* Changed to span and added spacing */}
                            {jobItem.job_position?.position_name?.toUpperCase()}
                          </span>
                        ))}
                      </div>
                      
                      {/* Textarea with improved spacing */}
                      <div className="form-group px-3"> {/* Added horizontal padding */}
                        <textarea
                          name="notes"
                          className="form-control"
                          placeholder="Add Cover Letter Objective"
                          required
                          id="coverLetter"
                          style={{
                            minHeight: '300px',
                            fontSize: '1rem',
                            padding: '1.5rem', /* Increased padding */
                            lineHeight: '1.6',
                            width: '100%',
                            border: '1px solid #dee2e6' /* Added border if needed */
                          }}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  
                  {/* Submit button with proper spacing */}
                  <div className="mt-4 text-center"> {/* Increased top margin */}
                    <button type="submit" className="btn btn-primary px-4 py-2">Submit Application</button>
                  </div>
                </form>
              </div>
      
              {/* Footer with improved spacing */}
              <div className="card-footer bg-transparent px-lg-5"> {/* Removed background, added padding */}
                <div className="col-md-12">
                  <p className="mb-1">Thank you.</p> {/* Reduced bottom margin */}
                  <p className="mb-1">Regards,</p> {/* Reduced bottom margin */}
                  {originalDetails.applicant_profile.map((item, index) => (
                    <p key={index} className="mb-0">{item.first_name} {item.last_name}</p>  
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
};

export default CoverLetterForm;