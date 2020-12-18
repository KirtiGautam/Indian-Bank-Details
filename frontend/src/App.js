import "bootstrap/dist/css/bootstrap.min.css";
import Landing from "./layouts/landing";
import Bank from "./layouts/Bank";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/banks/:ifsc" component={Bank} />
      </Switch>
    </div>
  );
}

export default App;
