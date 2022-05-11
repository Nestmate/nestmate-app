import { Navigation } from "./pages/sections/Navigation";
import { Footer } from "./pages/sections/Footer";
import { Router } from "./router/Router";

function App() {
  return (
    <div>
      <Navigation/>
      <Router/>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
