// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const CourseDetail = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { course } = location.state; // Access the course data passed via state

//   const handleBuyNow = () => {
//     // Navigate to the Checkout page and pass course data
//     console.log({course});
//     navigate("checkout", { state: { course } });

//   };

//   return (
//     <div className="course-detail p-4">
//       <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
//       <p className="mt-2">{course.description}</p>
//       <p className="mt-2 font-bold">Price: ${course.price}</p>
//       <button
//         onClick={handleBuyNow}
//         className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg"
//       >
//         Buy Now
//       </button>
//     </div>
//   );
// };

// export default CourseDetail;
// CourseDetail Component
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CourseDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Access the course data passed via location state
  const { course } = location.state;

  const handleBuyNow = () => {
    // Log the course data to console for debugging purposes
    console.log({ course });

    // Navigate to the Checkout page and pass course data via state
    navigate("checkout", { state: { course } });
  };

  return (
    <div className="course-detail p-4">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="mt-2">{course.description}</p>
      <p className="mt-2 font-bold">Price: ${course.price}</p>
      <button
        onClick={handleBuyNow}
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg"
      >
        Buy Now
      </button>
    </div>
  );
};

export default CourseDetail;

