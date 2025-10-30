import React from "react";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Accessibility, ArrowLeftRight, ClipboardEditIcon } from "lucide-react";

export default function Landing() {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="lg:w-[95%] mx-auto">
          <Header />
          <Hero />

          <section className="py-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Why Ticketi?
              </h2>
              <p className="text-lg text-gray-600">
                Ticketi is designed to be simple, intuitive, and powerful. Here
                are some of the features that make it the best choice for your
                team.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card p-8 text-center rounded-lg shadow-lg bg-white">
                <div class="flex justify-center items-center mb-4 w-12 h-12 rounded-full bg-blue-100 lg:h-16 lg:w-16 ">
                  <ClipboardEditIcon class="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-bold text-xl mb-2">
                  Create Tickets with Ease
                </h4>
                <p className="text-gray-600">
                  Our intuitive form makes it simple to create and categorize
                  tickets, so you can get back to what matters.
                </p>
              </div>
              <div className="card p-8 text-center rounded-lg shadow-lg bg-white">
                <div class="flex justify-center items-center mb-4 w-12 h-12 rounded-full bg-blue-100 lg:h-16 lg:w-16 ">
                  <ArrowLeftRight class="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-bold text-xl mb-2">Track Ticket Status</h4>
                <p className="text-gray-600">
                  Keep an eye on the progress of each ticket with our clear,
                  color-coded status indicators.
                </p>
              </div>
              <div className="card p-8 text-center rounded-lg shadow-lg bg-white">
                <div class="flex justify-center items-center mb-4 w-12 h-12 rounded-full bg-blue-100 lg:h-16 lg:w-16 ">
                  <Accessibility class="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-bold text-xl mb-2">
                  Built for Accessibility
                </h4>
                <p className="text-gray-600">
                  We believe in software for everyone. Ticketi is designed with
                  accessibility in mind, from the ground up.
                </p>
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                How It Works
              </h2>
              <p className="text-lg text-gray-600">
                Getting started with Ticketi is as easy as 1, 2, 3.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="card p-8">
                <div class="flex justify-center items-center mb-4 w-12 h-12 rounded-full bg-blue-100 lg:h-16 lg:w-16 mx-auto">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h4 className="font-bold text-xl mb-2">Create an Account</h4>
                <p className="text-gray-600">
                  Sign up for a free account in just a few minutes. No credit
                  card required.
                </p>
              </div>
              <div className="card p-8">
                <div class="flex justify-center items-center mb-4 w-12 h-12 rounded-full bg-blue-100 lg:h-16 lg:w-16 mx-auto">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h4 className="font-bold text-xl mb-2">
                  Create Your First Ticket
                </h4>
                <p className="text-gray-600">
                  Use our simple form to create your first ticket and assign it
                  to a team member.
                </p>
              </div>
              <div className="card p-8">
                <div class="flex justify-center items-center mb-4 w-12 h-12 rounded-full bg-blue-100 lg:h-16 lg:w-16 mx-auto">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <h4 className="font-bold text-xl mb-2">Start Resolving</h4>
                <p className="text-gray-600">
                  Track the status of your tickets and collaborate with your
                  team to resolve issues faster.
                </p>
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                What Our Customers Are Saying
              </h2>
              <p className="text-lg text-gray-600">
                We're trusted by teams of all sizes, from small startups to
                large enterprises.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card p-8 rounded-lg shadow-lg bg-white">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <p className="font-bold text-lg">Sarah, Project Manager</p>
                  </div>
                </div>
                <p className="text-gray-600 text-lg">
                  "Ticketi has been a game-changer for our team. We're more
                  organized and efficient than ever before."
                </p>
              </div>
              <div className="card p-8 rounded-lg shadow-lg bg-white">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <p className="font-bold text-lg">Michael, Developer</p>
                  </div>
                </div>
                <p className="text-gray-600 text-lg">
                  "I love how simple and intuitive Ticketi is. It's a pleasure
                  to use."
                </p>
              </div>
            </div>
          </section>

          <section className="py-20 text-center">
            <div className="bg-blue-600 rounded-lg p-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-blue-100 mb-8">
                Create an account and start managing your tickets in minutes. No
                credit card required.
              </p>
              <a
                href="/auth/signup"
                className="btn btn-primary bg-white text-blue-600 font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-100"
              >
                Sign Up for Free
              </a>
            </div>
          </section>

          <Footer />
        </div>
      </div>
    </div>
  );
}
