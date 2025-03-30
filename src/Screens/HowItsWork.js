import React from "react";

const HowItWorks = () => {
  return (
    <div className="w-full mt-16 min-h-screen bg-[#F2FAFA] relative">
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:pt-24 lg:pt-32">
        <div className="space-y-12">
          <h1 className="text-4xl font-semibold text-center mb-8 text-gray-800">
            How It Works
          </h1>

          <div className="space-y-6 text-lg">
            <p className="text-gray-700 text-center">
              At Verify Earn, getting started is simple and rewarding. Follow these three steps to begin your journey to earning rewards effortlessly!
            </p>
          </div>

          <section className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
              <div className="h-16 w-16 mb-4 flex items-center justify-center rounded-full bg-blue-100">
                <span className="text-2xl font-bold text-blue-500">1</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Sign Up</h2>
              <p className="text-gray-600">
                Create an account in just a few clicks. It’s quick, easy, and completely free to get started.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
              <div className="h-16 w-16 mb-4 flex items-center justify-center rounded-full bg-blue-100">
                <span className="text-2xl font-bold text-blue-500">2</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Choose Tasks</h2>
              <p className="text-gray-600">
                Browse through a variety of simple tasks, such as surveys, app testing, or data verification, and pick what interests you.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
              <div className="h-16 w-16 mb-4 flex items-center justify-center rounded-full bg-blue-100">
                <span className="text-2xl font-bold text-blue-500">3</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Complete & Earn</h2>
              <p className="text-gray-600">
                Complete your selected tasks, submit your work, and watch your earnings grow instantly.
              </p>
            </div>
          </section>

          <div className="mt-12 text-center">
            <p className="text-gray-800 text-lg">
              Ready to start earning? <a href="#" className="text-blue-500 hover:text-blue-600 font-semibold">Join us today!</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
