import ProductShopDetails from "@/app/components/ProductShopDetails/ProductShopDetails";
import { SizeSelector } from "@/app/components/shop/SizeSelector";
import { SHOP_PRODUCTS, SHOP_SIZES } from "../shopData";


export default function () {
    return (
        
        <div className="p-16 font-[Stratos] font-light">
      <div className="shop-card flex px-24">
        <div className="product-carousel mr-10 w-1/2">
          <div className="big-caruousel mb-5">
            <img
              src="/jacket_details/slide1.png"
              alt=""
              className="bg-gray-200 size-96"
            />
          </div>
          <div className="little-pictures flex">
            <img
              src="/jacket_details/slide1.png"
              alt=""
              className="bg-gray-200 size-24 mr-1"
            />
            <img
              src="/jacket_details/jacket.png"
              alt=""
              className="bg-gray-200 size-24 mr-1"
            />
            <img
              src="/jacket_details/slide3.png"
              alt=""
              className="bg-gray-200 size-24 mr-1"
            />
            <img
              src="/jacket_details/slide4.png"
              alt=""
              className="bg-gray-200 size-24 mr-1"
            />
          </div>
        </div>
        <div className="shop-section w-2/3 bg-white">
          <h1 className="text-[36px] pb-3 font-bold text-[#063860]">
            {" "}
            TACTUS CODEC JACKET{" "}
          </h1>
          <p className="text-[15px] pb-10">
          This premium trainer’s jacket fuses style, comfort, and innovation. Crafted from performance materials and embedded with advanced haptic technology, it lets you feel music in motion — each beat translated into a tactile rhythm that moves with your body.
          <br />
          The Tactus Codec Jacket was designed to move with you, it’s lightweight, breathable, and made from premium materials that keep you comfortable in every moment. Its haptic technology lets you experience your favorite songs in a whole new way.
          </p>
          <h3 className="text-xl pb-3">
            <span className="line-through">$500.00</span>
            <span className="text-[#fe9475] font-bold"> $459.00</span>
            <span className="text-xs"> Shipping not included </span>
          </h3>
          <div className="small-pictures flex">
            <img
              src="/jacket_details/jacket.png"
              alt=""
              className="bg-[#f8eddb] border border-[#f9e5ce] border-2 rounded-sm size-20 m-1"
            />
            <img
              src="/jacket_details/vest.png"
              alt=""
              className="border rounded-sm size-20 m-1"
            />
          </div>
          <p className="text-sm ">Product: Codec Jacket</p>
          <br />
          <p className="bold">Size</p>
          <div className="flex pb-3 items-end">
            <div className="w-64">
              {" "}
              <SizeSelector sizes={["S", "M", "L"]} />{" "}
            </div>

            <p className="text-sm ">&nbsp; View size chart</p>
          </div>

          <button className="bg-[#04365f] hover:bg-[#04565f] text-white font-bold py-2 px-4 rounded w-full">
            {" "}
            Add to Cart{" "}
          </button>
        </div>
      </div>

      <div id="specs" className="border border-gray-200 rounded m-20 pb-5">
        <div className="flex p-5 text-[#04365f]">
          <div className="w-1/2 rounded bg-[#f8eddb] m-1 text-center font-bold py-1">
            Description
          </div>
          <div className="w-1/2 rounded bg-[#f8eddb] m-1 text-center font-bold py-1">
            Specifications
          </div>
        </div>
        <div className="py-15 px-10">
          <b>About the product</b>
          <br />
          <br />
          <p className="text-[15px] font-light">
          Each piece is meticulously handcrafted with premium, breathable materials for lasting comfort and style. Designed around the human body, it delivers a natural, responsive vibration experience powered by advanced haptic technology. With seamless Bluetooth connectivity, the wearable syncs effortlessly to your music or instrument — combining craftsmanship, innovation, and emotion in one refined design.
 <br /> Each piece is designed with intention  from the premium, breathable materials to the lightweight, stretchable fit that moves naturally with you. The Tactus Codec line combines handcrafted design with advanced haptic technology to create a responsive, wearable experience that lets you feel every beat. With seamless Bluetooth connectivity, it syncs effortlessly with your music. Innovation in one refined design.
          </p>
        </div>
        <br />
        <div className="font-semibold text-sm flex justify-self-center">
          <div className="px-3 justify-items-center">
            <img src="/jacket_details/happy.png" alt="" width={30} />
             Handcrafted
          </div>
          <div className="px-3 justify-items-center">
            <img src="/jacket_details/soundcloud.png" alt="" width={30} />
            Bluetooth connectivity
          </div>
          <div className="px-3 justify-items-center">
            <img src="/jacket_details/pulse_icon.png" alt="" width={30} />
            Premium materials
          </div>
        </div>
      </div>

      <div className="bento-grid w-5/6 justify-self-center">
        <div className="flex align-items-top">
         
          <div className="relative w-2/3 rounded overflow-hidden h-96">
            <img
              src="/jacket_details/running_jpg.png"
              alt="Running couple by city skyline"
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent text-white p-10">
              <p>
                Built for movement to match your lifestyle
              </p>
            </div>
          </div>

          <div className="w-1/3 m-2 bg-gradient-to-b from-[#043b61] to-[#03626c] text-white  text-xl rounded p-10">
            <img src="/jacket_details/heart.png" alt="" width={30} />
            <br />
            Built for movement <br />
            to match your <br />
            lifestyle
          </div>
        </div>

        <br />

        
        <div className="flex">
          <div className="w-1/4 bg-gradient-to-b from-[#043b61] to-[#03626c] m-2 h-96 text-white text-xl rounded p-10">
            <img src="/jacket_details/squiggle.png" alt="" width={30} />
            <br />
            Feel the beat, <br />
            wherever, <br />
            whenever.
          </div>


          <div className="relative w-3/4 rounded overflow-hidden border h-96">
            <img
              src="/jacket_details/arms_crossed_jpg.png"
              alt="Running couple by city skyline"
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent text-white p-10">
              <p>
              Lightweight performance fit, <br />made with premium materials
              </p>
            </div>
          </div>

          <div className="relative w-1/4 rounded overflow-hidden border h-96">
            <img
              src="/jacket_details/batter.png"
              alt="Running couple by city skyline"
              className="object-cover h-96"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent text-white p-10">
              <p className="text-sm sm:text-base font-medium">
              Rechargeable battery
              </p>
            </div>
          </div>





        </div>
      </div>
    </div>
  );
   
}