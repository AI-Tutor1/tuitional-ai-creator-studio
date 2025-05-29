
import React from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, Brain, Users, Settings, Search } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Brain className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-gray-900">Tuitional AI</span>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-8">
                <a href="#" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Dashboard
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Questions
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Tests
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Analytics
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Users className="h-4 w-4 mr-2" />
              Profile
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
