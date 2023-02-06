import React from 'react'
import Logo from '../img/logo.png'
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { app } from "../firebase.config"
import Avatar from "../img/avatar.png"
import { motion } from "framer-motion"
import { Link } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';



const Header = () => {
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{ user, cartShow, cartItems }, dispatch] = useStateValue()
    const [isMenu, setIsMenu] = React.useState(false);

    const login = async () => {
        if (!user) {
            const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider)
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0],
            })

            localStorage.setItem('user', JSON.stringify(providerData[0]));
        } else {
            setIsMenu(!isMenu)
        }

    }

    const logout = () => {
        setIsMenu(false)
        localStorage.clear()

        dispatch({
            type: actionType.SET_USER,
            user: null,
        })
    }

    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        })
    }

    return (
        <header className=' fixed z-50 w-screen  p-3 px-8 md:p-6 md:px60 bg-primary'>
            {/* desktop and tablet */}
            <div className='hidden md:flex w-full h-full items-center justify-between '>
                <Link to="/" className="flex items-center gap-2">
                    <img src={Logo} className='w-8 object-cover' alt="logo" />

                    <p className='text-headingColor text-xl font-bold'> Foodie.com</p>
                </Link >

                <div className='flex items-center justify-center gap-8'>
                    <motion.ul initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 200 }}
                        className=' flex items-center gap-8 '>
                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Home </li>
                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Menu</li>
                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>About Us</li>
                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Service</li>
                    </motion.ul>

                    {/* cart */}
                    <div className="relative flex items-center justify-center cursor-pointer" onClick={showCart}>
                        <MdShoppingBasket className='text-textColor text-2xl ' />
                        {cartItems && cartItems.length > 0 && (
                            <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                                <p className="text-xs text-white font-semibold">{cartItems.length}</p>
                            </div>
                        )}
                    </div>

                    <div
                        className="relative">
                        <motion.img whileTap={{ scale: 0.6 }} src={user ? user.photoURL : Avatar} onClick={login}
                            className=' w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full' alt="userProfile" />

                        {
                            isMenu && (
                                <motion.div initial={{ opacity: 0, scale: 0.6 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.6 }}
                                    className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute 
                        right-0 top-11 '>
                                    {
                                        user && user.email === "gamzzclashh57@gmail.com" && (
                                            <Link to={'/createItem'} >
                                                <p className='px-4 py-2 flex items-center gap-3 cursor-pointer 
                            hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor' onClick={() => setIsMenu(false)}>New Item {<MdAdd />}</p>
                                            </Link>
                                        )
                                    }
                                    <p className='px-4 py-2 flex items-center gap-3 cursor-pointer 
                            hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor' onClick={logout}>log out {<MdLogout />}</p>
                                </motion.div>
                            )
                        }
                    </div>


                </div>
            </div>

            {/* mobile */}
            <div className='flex items-center   justify-between md:hidden w-full h-full  '>

                {/* cart */}
                <div className="relative flex items-center justify-center cursor-pointer" onClick={showCart}>
                    <MdShoppingBasket className='text-textColor text-2xl ' />
                    {cartItems && cartItems.length > 0 && (
                        <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                            <p className="text-xs text-white font-semibold">{cartItems.length}</p>
                        </div>
                    )}
                </div>

                {/* logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img src={Logo} className='w-8 object-cover' alt="logo" />

                    <p className='text-headingColor text-xl font-bold'> Foodie.com</p>
                </Link >

                {/* menu */}

                <div className="relative">
                    <motion.img whileTap={{ scale: 0.6 }} src={user ? user.photoURL : Avatar} onClick={login}
                        className=' w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full' alt="userProfile" />

                    {
                        isMenu && (
                            <motion.div initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute 
                        right-0 top-11 '>
                                {
                                    user && user.email === "gamzzclashh57@gmail.com" && (
                                        <Link to={'/createItem'} >
                                            <p className='px-4 py-2 flex items-center gap-3 cursor-pointer 
                            hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor' onClick={() => setIsMenu(false)}>New Item {<MdAdd />}</p>
                                        </Link>
                                    )
                                }

                                <ul
                                    className=' flex flex-col gap-2 '>
                                    <li className='text-base px-4  text-textColor hover:text-headingColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer' onClick={() => setIsMenu(false)}>Home </li>
                                    <li className='text-base px-4  text-textColor hover:text-headingColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer' onClick={() => setIsMenu(false)}>Menu</li>
                                    <li className='text-base px-4  text-textColor hover:text-headingColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer' onClick={() => setIsMenu(false)}>About Us</li>
                                    <li className='text-base px-4  text-textColor hover:text-headingColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer' onClick={() => setIsMenu(false)}>Service</li>
                                </ul>

                                <p className=' rounded-md shadow-lg m-2 px-4 py-2 flex items-center gap-3 cursor-pointer  bg-gray-200 
                            hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor'
                                    onClick={logout}
                                >log out {<MdLogout />}</p>
                            </motion.div>
                        )
                    }
                </div>

            </div>
        </header>
    )
}

export default Header