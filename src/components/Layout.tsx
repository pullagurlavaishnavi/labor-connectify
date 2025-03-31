
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Briefcase, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Briefcase className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-blue-700">Labor<span className="text-orange-500">Connectify</span></span>
          </Link>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
            <Link to="/job-requests" className="text-gray-700 hover:text-blue-600 font-medium">Job Requests</Link>
            <Link to="/providers" className="text-gray-700 hover:text-blue-600 font-medium">Providers</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">About</Link>
            <Button variant="default" className="bg-orange-500 hover:bg-orange-600">Post a Job</Button>
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">Sign In</Button>
          </nav>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t py-2">
            <div className="container mx-auto px-4 flex flex-col space-y-3">
              <Link to="/" className="px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600">Home</Link>
              <Link to="/job-requests" className="px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600">Job Requests</Link>
              <Link to="/providers" className="px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600">Providers</Link>
              <Link to="/about" className="px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600">About</Link>
              <div className="flex flex-col space-y-2 pt-2">
                <Button variant="default" className="bg-orange-500 hover:bg-orange-600 w-full">Post a Job</Button>
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 w-full">Sign In</Button>
              </div>
            </div>
          </div>
        )}
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-blue-400" />
                <span>Labor<span className="text-orange-400">Connectify</span></span>
              </h3>
              <p className="text-gray-300">Connecting skilled labor with businesses in need.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Customers</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-blue-400">Post a Job</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400">How It Works</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400">Find Providers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Providers</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-blue-400">Join as Provider</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400">Find Jobs</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400">Provider Dashboard</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li className="text-gray-300">support@laborconnectify.com</li>
                <li className="text-gray-300">+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} LaborConnectify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
