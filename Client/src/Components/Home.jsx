import React from "react";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
function Home() {
  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email Name</label>
          <input
            type="email"
            className="form-control mt-3"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Home;
