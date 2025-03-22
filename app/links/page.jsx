"use client";
import Head from 'next/head'
import { useState } from 'react'

export default function CropDiagnosis() {
  // State for active tab
  const [activeTab, setActiveTab] = useState('videos')

  // Resources data organized by category
  const resources = {
    videos: [
      {
        title: "How to Identify Early Blight in Tomatoes | Crop Disease Diagnosis",
        url: "https://youtu.be/qcbI7F7vUmk?si=UTDst0ZGYDc4FBxT",
        description: "Learn to spot the early signs of tomato blight and take preventative action."
      },
      {
        title: "Late Blight Disease in Potatoes - Identification and Control",
        url: "https://youtu.be/PSXXoGrOyDg?si=QUmKHH54a4Ia2G9G",
        description: "Comprehensive guide to identifying and managing potato late blight."
      },
      {
        title: "Managing Bacterial Spot in Tomatoes",
        url: "https://youtu.be/gjMIh19zH7k?si=qdw08kuF_HV2HhX3",
        description: "Effective strategies for controlling bacterial spot in tomato plants."
      }
    ],
    blogs: [
      {
        title: "How to Spot and Treat Early Blight ",
        url: "https://extension.umn.edu/disease-management/early-blight-tomato-and-potato",
        description: "Expert guidance on recognizing and treating early blight infections."
      },
      {
        title: "Late Blight in Potatoes: What You Need to Know ",
        url: "https://www.pau.edu/potato/lb_disease.php",
        description: "Essential information for potato growers on managing late blight disease."
      },
      {
        title: "Bacterial Spot on Tomatoes: Causes and Control ",
        url: "https://extension.umn.edu/disease-management/bacterial-spot-tomato-and-pepper",
        description: "Understanding the causes and control measures for bacterial spot in tomatoes."
      }
    ],
    news: [
      {
        title: "How Climate Change Is Affecting Crop Diseases | BBC News",
        url: "https://www.bbc.com/news/science-environment-60141387",
        description: "Recent research on climate change impacts on agricultural disease patterns."
      },
      {
        title: "Climate Change Increases Disease Risk for Potato Crops | The Guardian",
        url: "https://www.theguardian.com/food/ng-interactive/2022/apr/14/climate-crisis-food-systems-not-ready-biodiversity",
        description: "New findings on elevated disease risks for potato crops due to climate change."
      },
      {
        title: "Crop Diseases and Pests Are Spreading Faster Due to Climate Change | NIH",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8150874/",
        description: "Research shows accelerated spread of agricultural pests and diseases."
      }
    ]
  }

  return (
    <>
      <Head>
        <title>Crop Disease Diagnosis | Smart Farming Resources</title>
        <meta name="description" content="Expert resources for crop disease identification and management - videos, blogs, and latest research." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section with Background Image */}
      <div className="relative bg-green-900 text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/crop-field.jpg')] bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Crop Disease Diagnosis</h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8">
              Expert resources to help you identify and manage plant diseases in your crops
            </p>
            <div className="flex space-x-4">
              <a href="#resources" className="px-6 py-3 bg-green-600 hover:bg-green-500 transition rounded-lg font-medium text-white">
                Browse Resources
              </a>
              <a href="#contact" className="px-6 py-3 bg-white hover:bg-green-50 transition rounded-lg font-medium text-green-900">
                Get Expert Help
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Bar */}
      <div className="bg-green-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold">15+</p>
            <p className="text-green-200">Video Tutorials</p>
          </div>
          <div>
            <p className="text-3xl font-bold">25+</p>
            <p className="text-green-200">Expert Articles</p>
          </div>
          <div>
            <p className="text-3xl font-bold">10+</p>
            <p className="text-green-200">Research Papers</p>
          </div>
          <div>
            <p className="text-3xl font-bold">5k+</p>
            <p className="text-green-200">Farmers Helped</p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div id="resources" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Disease Diagnosis Resources</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Access our curated collection of resources to help you identify, understand, and manage crop diseases effectively.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex border border-gray-200 rounded-lg overflow-hidden">
              <button 
                onClick={() => setActiveTab('videos')} 
                className={`px-6 py-3 font-medium ${activeTab === 'videos' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Video Tutorials
              </button>
              <button 
                onClick={() => setActiveTab('blogs')} 
                className={`px-6 py-3 font-medium ${activeTab === 'blogs' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Expert Blogs
              </button>
              <button 
                onClick={() => setActiveTab('news')} 
                className={`px-6 py-3 font-medium ${activeTab === 'news' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Latest Research
              </button>
            </div>
          </div>

          {/* Resource Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources[activeTab].map((resource, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl transform hover:-translate-y-1">
                <div className="h-3 bg-green-600"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {resource.description}
                  </p>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center font-medium text-green-600 hover:text-green-500"
                  >
                    View Resource
                    <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Use Our Resources?</h2>
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Expert-Verified Content</h3>
                    <p className="mt-2 text-gray-600">All resources are verified by agricultural scientists and plant pathologists.</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Regularly Updated</h3>
                    <p className="mt-2 text-gray-600">New resources are added weekly to keep you informed of the latest developments.</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Practical Solutions</h3>
                    <p className="mt-2 text-gray-600">Focus on actionable advice that can be implemented in real-world farming situations.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-8 rounded-2xl">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Get Personalized Diagnosis</h3>
                <p className="text-gray-600 mb-6">Upload images of your affected crops and receive expert recommendations within 24 hours.</p>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Crop Type</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500">
                      <option>Select crop type</option>
                      <option>Tomatoes</option>
                      <option>Potatoes</option>
                      <option>Corn</option>
                      <option>Wheat</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image Upload</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                      <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-sm text-gray-500">
                          Click to upload or drag and drop
                        </p>
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="w-full py-3 px-4 bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg">
                    Submit for Analysis
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div id="contact" className="bg-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
            Join our newsletter to receive the latest crop disease alerts, prevention tips, and new resource notifications.
          </p>
          <form className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-green-400"
              />
              <button type="submit" className="px-6 py-3 bg-white text-green-700 font-medium rounded-lg hover:bg-green-50">
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Crop Disease Diagnosis</h3>
              <p className="mb-4">Empowering farmers with the knowledge to identify and manage crop diseases effectively.</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="hover:text-white">
                  <span className="sr-only">YouTube</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Video Tutorials</a></li>
                <li><a href="#" className="hover:text-white">Blog Articles</a></li>
                <li><a href="#" className="hover:text-white">Research Papers</a></li>
                <li><a href="#" className="hover:text-white">Disease Database</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Expert Consultation</a></li>
                <li><a href="#" className="hover:text-white">Disease Diagnosis</a></li>
                <li><a href="#" className="hover:text-white">Treatment Plans</a></li>
                <li><a href="#" className="hover:text-white">Workshops</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:contact@cropdiagnosis.com" className="hover:text-white">
                    contact@cropdiagnosis.com
                  </a>
                </li>
                <li>
                  <a href="tel:+1-555-123-4567" className="hover:text-white">
                    +1-555-123-4567
                  </a>
                </li>
                <li className="pt-2">
                  <a href="#" className="hover:text-white">
                    Contact Form
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p>&copy; {new Date().getFullYear()} Crop Disease Diagnosis. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}