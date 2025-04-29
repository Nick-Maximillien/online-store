"use server"
import { Suspense } from 'react'
import FeaturedCategories from '../../components/FeaturedCategories'
import TrendingProducts from '../../components/TrendingProducts'
import TestimonyToggle from '../../components/TestimonyToggle' 
import Newsletter from "../../components/Newsletter"

export default async function Page() {
    return (
     <div className='home'>
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
    )
}