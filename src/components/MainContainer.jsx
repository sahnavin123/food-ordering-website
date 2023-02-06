import React from 'react';
import HomeContainer from './HomeContainer';
import { motion } from "framer-motion"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import RowContainer from './RowContainer';
import { useStateValue } from '../context/StateProvider'
import MenuContainer from './MenuContainer';
import CartContainer from './CartContainer';



const MainContainer = () => {
  const [{ foodItems, cartShow }, dispatch] = useStateValue();

  const [scrollValue, setScrollValue] = React.useState(0)

  React.useEffect(() => {

  }, [scrollValue, cartShow])

  return (
    <div className='w-full h-auto flex flex-col items-center justify-center '>
      <HomeContainer />

      <section className=' w-full my-6 '>
        <div className="w-full flex items-center  justify-center" >
          <p className='text-2xl font-semibold capitalize relative text-headingColor 
           before:absolute before:rounded-lg before:content before:w-20 before:h-1 
           before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600
           transition-all ease-in-out duration-100'>
            Our Fresh & Healthy Fruits
          </p>

          <div className='hidden md:flex  gap-3 items-center '>
            <motion.div whileTap={{ scale: 0.75 }} onClick={() => setScrollValue(-200)}
              className='w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer  hover:shadow-lg flex items-center'>
              <MdChevronLeft className=' text-lg text-white' />
            </motion.div>

            <motion.div onClick={() => setScrollValue(200)} whileTap={{ scale: 0.75 }} className='w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center'>
              <MdChevronRight className=' text-lg text-white' />
            </motion.div>

          </div>
        </div>

        {/* row container */}

        <RowContainer scrollValue={scrollValue} flag={true} data={foodItems?.filter(n => n.category === 'fruits')} />
      </section>

      {/* menu container */}
      <section className=' w-full my-6 '>
        <MenuContainer />

        {cartShow && (<CartContainer />)}

      </section>


    </div>

  )
}

export default MainContainer