import Head from 'next/head'


export default function Contact() {
  return (
    <>
    
      <Head>
        <title>Contact Us | Crop Disease Diagnosis</title>
        <meta name="description" content="Get in touch with us for more information or support regarding crop disease diagnosis." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-gradient-to-r from-green-950 to-slate-500 min-h-screen py-16 pt-32">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <h1 className="text-3xl font-semibold text-center text-gray-900 mb-8">Contact Us</h1>
          
          <p className="text-lg text-center text-gray-200 mb-12">
            Have questions or need assistance? Reach out to us through the form below.
          </p>

          <div className="bg-slate-700 p-8 rounded-lg shadow-md">
            <form>
              {/* Name Field */}
              <div className="mb-6">
                <label htmlFor="name" className="block text-lg font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>

              {/* Email Field */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-lg font-medium mb-2">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>

              {/* Message Field */}
              <div className="mb-6">
                <label htmlFor="message" className="block text-lg font-medium text-gray-200 mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Type your message here..."
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-8 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
