import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Hero() {
  const { user } = useSelector((state) => state.auth);
  const isAuth = !!user;

  return (
    <section className="relative min-h-[80vh] bg-linear-to-br from-blue-50 to-white mb-8 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute w-full h-64 bottom-0 left-0"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(96, 165, 250, 0.1)"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        {/* Enhanced decorative circles */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-20 h-20 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-40 left-1/2 w-20 h-20 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        {/* New decorative circles */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 border-4 border-blue-200 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 border-4 border-purple-200 rounded-full animate-bounce-slow"></div>
        <div className="absolute top-1/3 left-1/3 w-16 h-16 bg-linear-to-br from-blue-400 to-purple-400 rounded-full opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center py-20 px-8">
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
              Support Made <span className="text-blue-600">Simple</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              Streamline your customer support with our powerful ticket
              management system. Focus on what matters most: delivering
              exceptional service to your customers.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to={!isAuth ? "/auth/signup" : "/dashboard"}
                className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transform transition-transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {isAuth ? "Go to Dashboard" : "Get Started for Free"}
              </Link>
              {!isAuth && (
                <Link
                  to="/dashboard"
                  className="btn btn-outline border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg text-lg transform transition-transform hover:scale-105"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="relative w-full h-[500px] bg-white rounded-lg shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="absolute inset-0 bg-linear-to-br from-blue-100 to-purple-100 rounded-lg"></div>
              <div className="relative space-y-4">
                <div className="w-full h-12 bg-white rounded-lg shadow-sm"></div>
                <div className="w-3/4 h-12 bg-white rounded-lg shadow-sm"></div>
                <div className="w-5/6 h-12 bg-white rounded-lg shadow-sm"></div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="h-24 bg-white rounded-lg shadow-sm"></div>
                  <div className="h-24 bg-white rounded-lg shadow-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 pb-20">
          {/* Feature Box 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Lightning Fast
            </h3>
            <p className="text-gray-600">
              Handle support tickets with unprecedented speed and efficiency.
            </p>
          </div>

          {/* Feature Box 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Easy to Customize
            </h3>
            <p className="text-gray-600">
              Tailor the system to match your specific workflow and
              requirements.
            </p>
          </div>

          {/* Feature Box 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-pink-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Real-time Support
            </h3>
            <p className="text-gray-600">
              Engage with your customers in real-time for better resolution
              times.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
