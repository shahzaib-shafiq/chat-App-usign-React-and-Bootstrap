import logo from "./logo.svg";
// import "./../node_modules/bootstrap/dist/css.min.css";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App d-flex justify-content-center align-items-center min-vh-100">
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email UserName</label>
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

export default App;
