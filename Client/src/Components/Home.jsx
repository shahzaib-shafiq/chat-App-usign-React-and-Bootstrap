import React, { useState } from "react";

function Home() {
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://your-backend-api.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);
      // Handle successful submission, e.g., display a message
    } catch (error) {
      console.error("Error:", error);
      // Handle errors, e.g., display an error message
    }
  };

  return (
    <div className="container">
      <h1>Submit Your Data</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Home;

// import React from "react";
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// function Home() {
//   return (
//     <div>
//       <form>
//         <div className="form-group">
//           <label htmlFor="exampleInputEmail1">Email Name</label>
//           <input
//             type="email"
//             className="form-control mt-3"
//             id="exampleInputEmail1"
//             aria-describedby="emailHelp"
//             placeholder="Enter email"
//           />
//         </div>

//         <button type="submit" className="btn btn-primary mt-4">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Home;
