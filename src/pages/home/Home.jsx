import React from 'react'
import { HomeHeader } from './HomeHeader'
import { HomeMS } from './HomeMS'
import { HomeNewEvent } from './HomeNewEvent'
import { HomeCelebration } from './HomeCelebration'
import { HomeNR } from './HomeNR'
import { useEffect } from 'react'

export const Home = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  
  return (
    <section >
<HomeHeader/>
{/* <HomeCertify/> */}
<HomeMS/>
<HomeNewEvent/>
<HomeCelebration/>
<HomeNR/>
    </section>
  )
}
