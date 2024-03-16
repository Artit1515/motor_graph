import Chart from "./chart";
import Vibration2 from "./vibration2";
import Vibration from "./vibration";
import Voltage from "./voltage";
import "./App.css";
function App() {
  return (
    <>
      <div className="temp">
        {" "}
        <Chart />
      </div>
      <div className="vibrat">
        {" "}
        <Vibration/>
      </div>
      <div className="volt">
        {" "}
        <Voltage />
      </div>
    </>
  );
}

export default App;
