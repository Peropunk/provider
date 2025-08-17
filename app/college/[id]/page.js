'use client'
import Gallery from "../GalleryCollege";
import Market from "../Market";
import AllProperties from "../AllColleges";
import Details from "../DetailsCollege";
import {useParams} from "next/navigation";
import Footer from "../../components/Footer";
// import AlertForm from "../../components/propertyAlert/AlertFormCollege";

const PropertyDetails = () => {
   const params = useParams(); // <-- STEP 2: Call the useParams hook
    const id = decodeURIComponent(params.id);
   

    // Now 'Data' will hold the object with the matching 'id' property

    return (
    <> 
    {/* Details start here */}
    < Details id={id}/>

    {/* Gallery start here */} 

    {/* All Properties start here */}
    <AllProperties id={id}/>

    {/* Alert Form for College */} 
        <Footer/>
    </>
    );
};

export default PropertyDetails;