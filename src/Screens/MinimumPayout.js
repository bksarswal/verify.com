import React from 'react';
import MinimumPay from "../Assetss/project.png"
import TwoDoller from "../Assetss/Untitled-1.png"
const MinimumPayout = () => {
  return (
    <div className="w-full  bg-[#F2FAFA] py-16">
      <div className="max-w-7xl mx-auto px-4 w-full  flex flex-col items-center gap-8  md:flex-row md:gap-12">
      {/* <section className="w-full max-w-screen-xl flex flex-col items-center gap-8 px-6 md:flex-row md:gap-12"> */}
{/* Left section with images and data */}
<div className="relative  w-full max-w-[1204px h-[587px] bg-cover shadow-[0px_4px_4px_#00000040] flex items-center justify-center">
<img
src={MinimumPay}
alt="Business professional"
className="w-auto h-auto max-h-[587px] max-w-[606]"
/>
  <div className="absolute mt-24 ml-28 left-[30%]  bg-white rounded-[20px] shadow-[0px_1px_6px_#0000001a] px-4 py-6 text-center">
    <h4 className="text-3xl md:text-4xl font-semibold text-[#1e88e5]">500+</h4>
    <p className="text-xl md:text-2xl text-[#9d9d9d]">Daily Users</p>
  </div>
  {/* <div className="absolut  -m-20 left-[30%]  bg-white rounded-[20px] shadow-[0px_1px_6px_#0000001a] px-4 py-6 text-center">
    <h4 className="text-3xl md:text-4xl font-semibold text-[#1e88e5]">300+</h4>
    <p className="text-xl md:text-2xl text-[#9d9d9d]">Task Available</p>
  </div> */}
</div>

{/* Right section with text */}
<div className="flex max-h-[587px] max-w-[606] flex-col justify-between text-center space-y-6 md:space-y-8">
  <div className="text-3xl md:text-4xl lg:text-[56px] p-2 font-medium text-[#252525]  ">
    <pre><p>Unlock Unlimited</p> <p>Earning</p> <p>Opportunities! </p><br />
    <hr className="border border-solid black  my-3" />
   <p> Minimum Payout</p>
   </pre>
  </div>
 
  <img className="w-[180px] h-[180px] mx-auto md:w-[201px] md:h-[200px]" src={TwoDoller} alt="Minimum Payout" />
</div>
{/* </section> */}
      </div>
    </div>
  );
};

export default MinimumPayout;

