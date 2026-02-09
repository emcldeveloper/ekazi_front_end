import { Outlet, useNavigate, useParams } from "react-router-dom";
import Template1 from "../templates/template1";
import { createContext, useEffect, useState } from "react";
import FromReactPdf from "../templates/fromReactPdf";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa";
import Sidebar from './Sidebar';

// import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
// import { firestore } from "../utils/firebase";
// import { api } from "../utils/apiSample";
// MainLayout.js


import { checkIfExists } from "../controllers/apisController";
import Template2 from "../templates/template2";
import Template3 from "../templates/template3";
import Template4 from "../templates/template4";
import Template5 from "../templates/template5";
import Template6 from "../templates/template6";
import Template7 from "../templates/template7";
import Template8 from "../templates/template8";
import Template9 from "../templates/template9";
import Template10 from "../templates/template10";
import NavBar from "../layouts/NavBar";
import PageLoader from "../widgets/pageLoader";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Footer from "./footer";

export const StepsContext = createContext()
const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const [currentStep, setCurrentStep] = useState(0)
    const [showPreview, setShowPreview] = useState(false)
    const [candidate, setCandidate] = useState(null)
    const [originalDetails, setOriginalDetails] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [selected, setSelected] = useState(null); 
    const [showPaymentModal, setShowPaymentModal] = useState(false); 
    const [cvSubscription, setCvSubscription] = useState([]);
    const [MySubscription, setSubscription] = useState('');
    const cvSubscriptionArray = Object.values(cvSubscription);
    return (<div>
        <div className="">
            <NavBar openModal={openModal} />
            <div className="w-12/12 ms-auto min-h-screen bg-gray-100">
                <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-6 md:py-8 pb-16 sm:pb-24 md:pb-32 pt-10 sm:pt-16 md:pt-20 max-w-full overflow-x-hidden">
                    <StepsContext.Provider
                        value={{ currentStep, setCurrentStep, candidate, setCandidate, originalDetails }}
                    >
                        <Outlet />
                    </StepsContext.Provider>
                </div>
            </div>
            <Footer></Footer>
        </div>
    </div>);
}

export default MainLayout;