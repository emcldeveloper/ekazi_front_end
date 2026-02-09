import { useContext, useEffect, useState } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import PageLoader from "../widgets/pageLoader";
import axios from "axios";
import { checkIfExists } from "../controllers/apisController";
import moment from "moment";




const MySubscription = () => {

    const [originalDetails, setOriginalDetails] = useState(null)
    const [careerObjective, setCareerObjective] = useState(
        originalDetails?.careers[0].career || ''
    );
    const [Objective, setObjective] = useState(
        originalDetails?.objective.objective || ''
    );
    const [subscription, setSubscription] = useState([]);
    const { uuid, template } = useParams()

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/applicant/CvSubscriptiondata/${uuid}`)
            .then((response) => {
                console.log("API Response:", response); // Debug API response
                if (response) {
                    const data = response.data.subscription
                    setSubscription(data);
                    console.log("test cv sub", data);
                } else {
                    console.error("Unexpected response structure:", response);
                }
            })
            .catch((error) => {
                console.error("Error fetching CV Subscription data:", error.message);
            });
    }, []); // Empty dependency array means this runs only once on component mount



    //   originalDetails == null || candidate == null ? <PageLoader />
    return (
        <div>
        <div className="p-4 sm:p-6">
  {/* Header Section */}
  <div className="flex flex-col sm:flex-row justify-between items-center">
    <h1 className="font-bold text-2xl sm:text-3xl mb-4 sm:mb-0">My CV Subscription</h1>
   
  </div>

  {/* Subscription CV Section */}
  <div className="mt-8">
    <label className="block text-lg font-medium text-gray-700 mb-2">My Subscription CV</label>
    {/* <div className="subscription-page bg-gray-50 p-4 rounded-lg">
  
    </div> */}
  </div>
</div>
            <div className="mt-2">
                <div className="overflow-x-auto">
                    <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Image</th>
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                {/* <th className="border border-gray-300 px-4 py-2">Description</th> */}
                                <th className="border border-gray-300 px-4 py-2">Price (Tsh)</th>
                                <th className="border border-gray-300 px-4 py-2">CV Limit</th>
                                <th className="border border-gray-300 px-4 py-2">Remainin Cvs</th>
                                <th className="border border-gray-300 px-4 py-2">Duration</th>
                                <th className="border border-gray-300 px-4 py-2">Start</th>
                                <th className="border border-gray-300 px-4 py-2">End</th>
                                <th className="border border-gray-300 px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscription.map((sub) => (

                                // const isActive = moment().isSameOrBefore(sub.end_date); // Compare current date with end_date
                                // const remainingCvs = sub.plan.cv_limit - sub.cv_used;

                                // return (
                                //   <tr key={sub.id}>
                                //     <td>{sub.plan.name}</td>
                                //     <td>{sub.plan.cv_limit}</td>
                                //     <td>{sub.cv_used}</td>
                                //     <td>{remainingCvs}</td>
                                //     <td>{moment(sub.start_date).format("YYYY-MM-DD HH:mm:ss")}</td>
                                //     <td>{moment(sub.end_date).format("YYYY-MM-DD HH:mm:ss")}</td>
                                //     <td>{isActive ? "Active" : "Expired"}</td>
                                <tr key={sub.id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2">
                                        <img
                                            src="/cv5.jpg"
                                            alt={sub.name}
                                            className="w-16 h-16 object-cover rounded-md"
                                        />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">{sub.plan.name}</td>
                                    {/* <td className="border border-gray-300 px-4 py-2">{sub.plan.description}</td> */}
                                    <td className="border border-gray-300 px-4 py-2">{sub.plan.price}</td>
                                    <td className="border border-gray-300 px-4 py-2">{sub.plan.cv_limit}</td>
                                    <td className="border border-gray-300 px-4 py-2">{sub.plan.cv_limit - sub.cv_used}</td>
                                    <td className="border border-gray-300 px-4 py-2">{sub.plan.duration}</td>
                                    <td className="border border-gray-300 px-4 py-2">{moment(sub.start_date).format("YYYY-MM-DD ")}</td>
                                    <td className="border border-gray-300 px-4 py-2">{moment(sub.end_date).format("YYYY-MM-DD ")}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {sub.verify === 0 ? "Pending" : "Active"}

                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    );
}

export default MySubscription