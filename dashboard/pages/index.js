import Dashboard from '../components/Dashboard'
import { useState, useEffect, useRef } from 'react'
import styles from '../styles/Home.module.css'
import TestWidget from '../components/widgets/TestWidget'
import Widget from '../components/Widget'
import AddWidgetBtn from '../components/AddWidgetBtn'


export default function Home() {
  return <Dashboard>
    <TestWidget></TestWidget>
    <TestWidget></TestWidget>
    <TestWidget></TestWidget>
    <AddWidgetBtn />
  </Dashboard>
}

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== 'undefined') {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}