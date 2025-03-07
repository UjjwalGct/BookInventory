import React from 'react'
import Banner from '../components/Banner'
import BestSeLLerBooks from './BestSeLLerBooks'
import FavBook from './FavBook'
import PromoBanner from './PromoBanner'
import OtherBooks from './OtherBooks'
import Review from './Review'

const home = () => {
  return (
    <div>
      <Banner/>
      <BestSeLLerBooks/>
      <FavBook/>
      <PromoBanner/>
      <OtherBooks/>
      <Review/>
      
    </div>
  )
}
export default home