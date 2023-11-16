import React from "react";
import Delivery from "../img/delivery.png";
import HeroBg from "../img/heroBg.png";
import { heroData } from "../utils/data";

const HomeContainer = () => {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
      id="home"
    >
      <div className=" py-2 flex-1 flex flex-col items-start justify-center  gap-6">
        <div className="flex items-center gap-2 justify-center bg-orange-100 px-2 py-1 drop-shadow-xl rounded-full ">
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>
          <div className="w-8 h-8 rounded-full overflow-hidden bg-white">
            <img
              className="w-full h-full object-contain"
              src={Delivery}
              alt="delivery"
            />
          </div>
        </div>

        <p className="text-[2.5rem] md:text-[3rem] font-bold tracking-wide text-headingColor text-center md:text-left">
          The Fastest Delivery in{" "}
          <span className="text-orange-600 text-[3rem] md:text-[4rem]">
            Your City
          </span>
        </p>

        <p className="text-base text-textColor text-center md:text-left md:w-[80%] ">
          Welcome to Foodie.com, where deliciousness meets convenience. Explore
          a world of flavors, from savory kebabs to refreshing ice creams, all
          in the comfort of your home.
        </p>
        <button
          type="button"
          className=" md:w-auto bg-gradient-to-br from-orange-400 to-orange-500 w-full px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
        >
          Order Now
        </button>
      </div>

      {/* card */}

      <div className=" py-2 flex-1 flex items-center relative ">
        <img
          src={HeroBg}
          alt="hero-Bg"
          className=" h-420 w-full lg:w-auto lg:h-650 ml-auto"
        />

        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center py-4 gap-4 flex-wrap lg:px-32">
          {heroData &&
            heroData.map((n) => (
              <div
                key={n.id}
                className="  lg:w-190  p-4  bg-cardOverlay backdrop-blur-md rounded-3xl flex items-center justify-cente flex-col drop-shadow-lg "
              >
                <img
                  className=" w-20 lg:w-40  -mt-10 lg:-mt-20"
                  src={n.imageSrc}
                  alt="i1"
                />
                <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                  {n.name}
                </p>

                <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3 ">
                  {n.decp}{" "}
                </p>

                <p className="text-sm font-semibold text-headingColor">
                  {" "}
                  <span className=" text-xs text-red-600">$</span> {n.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
