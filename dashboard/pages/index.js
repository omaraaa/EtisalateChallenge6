import Dashboard from '../components/Dashboard'
import { useState, useEffect, useRef } from 'react'
import styles from '../styles/Home.module.css'
import TestChart from '../components/TestChart'


export default function Home() {
  return <Dashboard>
    <h1 className="text-6xl font-bold m-4">
      Example
    </h1>



    <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
      <a
        className={styles.card}
      >
        <div>
          <h3 className="text-2xl font-bold whitespace-nowrap">Adjustments &rarr;</h3>
          <p className="mt-4 text-xl">
            description
          </p>
        </div>

        <TestChart></TestChart>

      </a>

    </div>
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