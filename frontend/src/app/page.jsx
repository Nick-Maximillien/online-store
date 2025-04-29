"use server"
import { Suspense } from 'react'
import FeaturedCategories from './components/FeaturedCategories'
import TrendingProducts from './components/TrendingProducts'
import TestimonyToggle from './components/TestimonyToggle' 
import Newsletter from "./components/Newsletter"
import LoginToggle from './components/LoginToggle'
import SignUpButton from "./components/SignUpButton"


const Home = () => {
  return (
    <div className="homeContainer">
      <div className=''>
      <div>
         <LoginToggle />
         <SignUpButton />
      </div><br /><hr />
        <h1>Lets sort you out !</h1>
        <Suspense fallback={<p>Loading...</p>}> 
        <TrendingProducts />
         </Suspense>
        <Suspense fallback={<p>Loading...</p>}> 
        <FeaturedCategories />
         </Suspense>
         <Suspense fallback={<p>Loading...</p>}> 
        <TestimonyToggle />
         </Suspense>
         <Suspense fallback={<p>Loading...</p>}> 
        <Newsletter />
         </Suspense>
        </div>
      </div>
  );
};

export default Home;