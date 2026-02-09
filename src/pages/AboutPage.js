import React from "react";
import About from "../Component/Pages/About";
import MainLayout1 from "../layouts/MainLayout1";
import PageHeader from "../Component/Pages/PageHeader";

const AboutPage=()=>{
  
    return(
         <MainLayout1>
            <PageHeader title="About"/>
    
            <About/>
      </MainLayout1>
   
    )


}

export default AboutPage;