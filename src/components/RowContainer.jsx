import React from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import { motion } from "framer-motion"
import NotFound from "../img/NotFound.svg"
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'

const RowContainer = ({ flag, data, scrollValue }) => {

  const rowContainer = React.useRef();

  const [items, setItems] = React.useState([])

  const [{ cartItems }, dispatch] = useStateValue();

  React.useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue])


  const addToCart = () => {
    // console.log(item);

    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  }

  React.useEffect(() => {
    addToCart()
  }, [items])

  return (
    <div ref={rowContainer} className={`w-full scroll-smooth my-12 flex items-center gap-3 ${flag ? 'overflow-x-scroll scrollbar-none' : 'overflow-x-hidden flex-wrap justify-center'}`}>

      {/* if error message is not showing then make changes to data.length  */}
      {data && data.length > 0 ? data.map(item => (
        <div key={item.id} className=' w-275 min-w-[300px] md:w-300 my-12 md:min-w-340 h-[250px]  bg-cardOverlay rounded-lg p-2 
        backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-between'>
          <div className='w-full flex items-center justify-between '>

            <motion.div whileHover={{ scale: 1.2 }} className='w-40 h-40 -mt-8 drop-shadow-2xl' >
              <img src={item?.imageURL} className=' w-full h-full object-contain'
                alt="" />

            </motion.div>

            <motion.div onClick={() => setItems([...cartItems, item])} whileTap={{ scale: 0.75 }} className='w-8 h-8 rounded-full  bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md'>
              <MdShoppingBasket className='text-white  ' />
            </motion.div>
          </div>

          <div className=' w-full flex flex-col gap-4 items-end justify-end'>
            <p className='  text-textColor font-semibold text-base md:text-lg'>{item?.title}</p>
            <p className='mt-1 text-sm text-gray-500'>{item?.calories}</p>
            <div className='flex items-center gap-8'>
              <p className=' text-lg text-headingColor font-semibold'>
                <span>$</span>{item?.price}
              </p>

            </div>
          </div>

        </div>
      )) : (
        <div className='w-full  flex flex-col items-center justify-center'>
          <img src={NotFound} className=' h-340' />
          <p className=' text-xl font-semibold my-2'>Items Not Available</p>
        </div>
      )}
    </div>
  )
}

export default RowContainer