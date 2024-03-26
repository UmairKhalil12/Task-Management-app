import "./App.css"
import Navigation from "./Navigation/Navigation";
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])
  return (
    <div>
        {
          Loading ?
            <ClipLoader
              color={'#D0021B'}
              loading={Loading}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            /> : <Navigation />
        }

    </div>
  );
}

export default App;
