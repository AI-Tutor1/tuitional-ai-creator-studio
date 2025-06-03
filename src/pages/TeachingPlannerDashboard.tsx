
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Calendar, 
  FolderOpen, 
  Users, 
  Brain, 
  GraduationCap, 
  Map, 
  Library,
  ChevronRight,
  Plus
} from 'lucide-react';

const TeachingPlannerDashboard: React.FC = () => {
  const stats = [
    { title: 'Total Notes', value: 24, icon: BookOpen, iconColor: 'text-blue-600' },
    { title: 'Lessons Planned', value: 12, icon: Calendar, iconColor: 'text-green-600' },
    { title: 'Resources', value: 156, icon: FolderOpen, iconColor: 'text-orange-500' },
    { title: 'Classes', value: 8, icon: Users, iconColor: 'text-purple-600' }
  ];

  const planningTools = [
    {
      title: 'AI Notes Generator',
      description: 'Create curriculum-aligned notes using AI with metadata filters and analytics.',
      icon: Brain,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
      stat: '24 notes created',
      href: '/ai-notes-generator'
    },
    {
      title: 'Lesson Planner',
      description: 'Plan and organize your lessons with templates and scheduling tools.',
      icon: GraduationCap,
      iconColor: 'text-green-600',
      iconBg: 'bg-green-50',
      stat: '12 lessons planned',
      href: '#'
    },
    {
      title: 'Curriculum Mapper',
      description: 'Map your content to curriculum standards and learning outcomes.',
      icon: Map,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50',
      stat: '8 units mapped',
      href: '#'
    },
    {
      title: 'Resource Library',
      description: 'Organize and manage your teaching resources and materials.',
      icon: Library,
      iconColor: 'text-orange-500',
      iconBg: 'bg-orange-50',
      stat: '156 resources',
      href: '#'
    }
  ];

  const recentActivities = [
    {
      title: 'Created AI note: Newton\'s Laws of Motion',
      timestamp: '2 hours ago',
      href: '#'
    },
    {
      title: 'Planned lesson: Cell Biology Lab',
      timestamp: '1 day ago',
      href: '#'
    },
    {
      title: 'Updated curriculum: Physics Grade 11',
      timestamp: '2 days ago',
      href: '#'
    },
    {
      title: 'Added resource: Chemistry Video Series',
      timestamp: '3 days ago',
      href: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-4 lg:px-6">
        {/* Header Section */}
        <header className="flex justify-between items-center h-20 mt-6 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 m-0">
              Teaching Planner
            </h1>
            <p className="text-sm text-gray-500 mt-1 hidden md:block">
              Plan, organize, and track your teaching materials and curriculum.
            </p>
          </div>
          <Button 
            className="hidden md:flex bg-blue-600 hover:bg-blue-700 text-white px-6 h-12 rounded-lg shadow-sm transition-colors duration-150"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create New Content
          </Button>
        </header>

        {/* Summary Metrics - Stat Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 cursor-default">
              <CardContent className="flex justify-between items-center p-4">
                <div>
                  <p className="text-sm text-gray-500 m-0">{stat.title}</p>
                  <h2 className="text-xl font-semibold text-gray-900 mt-1 mb-0">{stat.value}</h2>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.iconColor}`} aria-hidden="true" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Planning Tools Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Planning Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {planningTools.map((tool, index) => (
                <Card 
                  key={index}
                  className="bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 cursor-pointer"
                  onClick={() => tool.href !== '#' && (window.location.href = tool.href)}
                >
                  <CardContent className="flex flex-col justify-between p-4 h-full">
                    {/* Icon & Title Row */}
                    <div className="flex items-center mb-3">
                      <div className={`w-10 h-10 rounded-lg ${tool.iconBg} flex items-center justify-center mr-4`}>
                        <tool.icon className={`h-6 w-6 ${tool.iconColor}`} aria-hidden="true" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 m-0">{tool.title}</h3>
                    </div>
                    
                    {/* Description */}
                    <div className="flex-1">
                      <p className="text-base text-gray-500 mb-4">{tool.description}</p>
                    </div>
                    
                    {/* Footer: Stat & CTA */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{tool.stat}</span>
                      <button className="bg-transparent border-none text-blue-600 text-base font-medium cursor-pointer flex items-center p-0 hover:text-blue-700">
                        Open
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-50 border border-gray-200 shadow-sm h-fit">
              <CardContent className="p-4">
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Latest Updates</h2>
                <ul className="list-none p-0 m-0">
                  {recentActivities.map((activity, index) => (
                    <li key={index} className={`flex items-start ${index < recentActivities.length - 1 ? 'mb-3' : ''}`}>
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                      <div>
                        <p className="text-base m-0">
                          <a 
                            href={activity.href}
                            className="text-blue-600 font-medium no-underline hover:underline"
                          >
                            {activity.title}
                          </a>
                        </p>
                        <p className="text-sm text-gray-500 mt-0.5 mb-0">{activity.timestamp}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions Placeholder */}
        <Card className="bg-gray-50 border border-gray-200 shadow-sm mt-6 mb-8">
          <CardContent className="p-4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Quick Actions</h2>
            <p className="text-base text-gray-500 m-0">
              (Place quick-access shortcuts here for creating content, importing data, or generating analytics.)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Mobile FAB */}
      <Button 
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center justify-center p-0"
        aria-label="Create New Content"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default TeachingPlannerDashboard;
