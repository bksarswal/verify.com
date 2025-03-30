import React from 'react';
import Bitcoin  from "../Assetss/pngegg.png"
import BankTransfer from "../Assetss/bank_to_bank_transfer.png"
import UpiPament from "../Assetss/upigpay-1.jpg"
const PaymentMethod = () => {
  return (
    <div className="w-full bg-[#F2FAFA] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="text-blue-500">Payment</span>{' '}
          <span className="text-gray-900">Withdrawal Method</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* UPI Card */}
          <div className="bg-white rounded-lg shadow-md p-8 flex items-center justify-center">
            <div className="space-y-4">
              <img 
                src={UpiPament}
                alt="UPI Payment Options"
                className="h-20 object-contain mx-auto"
              />
             
            </div>
          </div>

          {/* Bank Transfer Card */}
          <div className="bg-white rounded-lg shadow-md p-8 flex items-center justify-center">
            <img 
              src={BankTransfer}
              alt="Bank Transfer"
              className="h-32  object-contain"
            />
          </div>

          {/* Bitcoin Card */}
          <div className="bg-white rounded-lg shadow-md p-8 flex items-center justify-center">
            <img 
              src={Bitcoin}
              alt="Bitcoin"
              className="h-32 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;

