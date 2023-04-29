import React from 'react'
import styles from './style';
import { Navbar, Hero, Footer } from './components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Contact, Terms } from './pages';

const App = () => {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <Router>
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>      
      
        <div className={`bg-primary ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Hero />
          </div>
        </div>

        <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
              <Routes>
                <Route path="/" element={<Home />} exact />
                <Route path="/:ref" element={<Home />} exact />
                <Route path="/contact" element={<Contact />} exact/>
                <Route path="/terms" element={<Terms />} exact/>
              </Routes>

            <Footer /> 
          </div>
        </div>

      </Router>
    </div>
  )
}

export default App