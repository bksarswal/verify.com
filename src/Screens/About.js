import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="w-full mt-16 min-h-screen bg-[#F2FAFA] relative">
      <div className="mx-auto max-w-7xl px-4 pt-28 sm:pt-40 lg:pt-48">
        <div className="relative">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
          </div>

          <div className="space-y-12 pb-32">
            <p className="text-center sm:text-left text-gray-800 text-lg">
              Welcome to Verify Earn, a platform where your time and efforts turn into rewards!
            </p>

            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold text-center sm:text-left mb-8">
                Overview
              </h1>
              <p className="text-gray-800 text-lg sm:text-xl">
                At Verify Earn, we believe in empowering individuals by creating opportunities to
                earn money effortlessly. Our platform connects users with simple, engaging tasks
                that they can complete at their convenience. From surveys to app testing and data
                verification, we ensure every task is easy, rewarding, and impactful.
              </p>
            </div>

            <section>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-800 text-lg sm:text-xl">
                Our mission is to help people monetize their spare time by offering meaningful
                micro-tasks that benefit both users and businesses. We aim to create a win-win
                ecosystem where companies achieve their goals and users are rewarded fairly for
                their contributions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Why Choose Verify Earn?</h2>
              <ul className="space-y-4 text-lg sm:text-xl">
                <li>
                  <span className="font-semibold">Simple Tasks:</span> No technical expertise
                  required—anyone can participate and earn.
                </li>
                <li>
                  <span className="font-semibold">Instant Rewards:</span> Get compensated quickly
                  for the tasks you complete.
                </li>
                <li>
                  <span className="font-semibold">Flexibility:</span> Work at your pace, from
                  anywhere, anytime.
                </li>
                <li>
                  <span className="font-semibold">Transparency:</span> Your earnings are tracked in
                  real-time with no hidden terms.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">How It Works</h2>
              <ol className="space-y-4 text-lg sm:text-xl">
                <li>
                  <span className="font-semibold">1. Sign Up:</span> Create your account on Verify
                  Earn and get started.
                </li>
                <li>
                  <span className="font-semibold">2. Choose Tasks:</span> Browse through available
                  tasks and pick what interests you.
                </li>
                <li>
                  <span className="font-semibold">3. Complete & Earn:</span> Finish tasks and watch
                  your earnings grow.
                </li>
              </ol>
            </section>

            <div className="space-y-6 text-lg sm:text-xl">
              <p className="text-gray-800">
                Whether you're looking to supplement your income, explore new experiences, or simply
                spend your time more productively, Verify Earn is here to make it happen.
              </p>

              <p className="text-gray-800">
                Join the community of thousands already earning with Verify Earn. Your journey to
                extra income starts here!
              </p>
            </div>

            <div className="text-center pt-8">
              <p className="mb-2 text-lg sm:text-xl">
                Ready to get started?{" "}
                <Link
                  to={"/signup"}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg "
                >
                  Sign Up Now
                </Link>
              </p>
              <p className="text-gray-800">and begin earning today!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
