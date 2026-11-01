import { useState } from 'react';

function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [darkMode, setDarkMode] = useState(false);
  const [courseFilter, setCourseFilter] = useState('all');

  const courses = [
    { id: 1, name: 'React Fundamentals', progress: 75, instructor: 'Sarah Wilson', nextLesson: 'Components & Props', color: 'blue' },
    { id: 2, name: 'JavaScript Advanced', progress: 45, instructor: 'Mike Johnson', nextLesson: 'Async/Await', color: 'purple' },
    { id: 3, name: 'UI/UX Design', progress: 90, instructor: 'Emily Chen', nextLesson: 'Color Theory', color: 'pink' },
  ];

  const assignments = [
    { id: 1, title: 'Build a Todo App', course: 'React Fundamentals', dueDate: '2024-03-20', status: 'pending' },
    { id: 2, title: 'API Integration', course: 'JavaScript Advanced', dueDate: '2024-03-18', status: 'completed' },
    { id: 3, title: 'Design System', course: 'UI/UX Design', dueDate: '2024-03-25', status: 'in-progress' },
  ];

  const announcements = [
    { id: 1, title: 'New Course Available', message: 'Check out our new TypeScript course!', time: '2 hours ago' },
    { id: 2, title: 'Maintenance Notice', message: 'Platform updates scheduled for tonight', time: '5 hours ago' },
  ];

  const stats = [
    { label: 'Average Grade', value: '88%', icon: '📊' },
    { label: 'Courses', value: '3', icon: '📚' },
    { label: 'Study Hours', value: '45h', icon: '⏰' },
    { label: 'Assignments', value: '12', icon: '✍️' },
  ];

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: '🏠' },
    { id: 'courses', label: 'My Courses', icon: '📖' },
    { id: 'assignments', label: 'Assignments', icon: '📝' },
  ];

  const filteredCourses = courseFilter === 'all' 
    ? courses 
    : courses.filter(c => courseFilter === 'completed' ? c.progress === 100 : c.progress < 100);

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      {/* Navigation Sidebar */}
      <aside className={`w-64 border-r flex flex-col justify-between p-4 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="space-y-6">
          <div className="flex items-center space-x-2 px-2 py-3">
            <span className="text-2xl">🎓</span>
            <span className="font-bold text-xl tracking-tight">EduPulse</span>
          </div>
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white'
                    : darkMode 
                      ? 'text-gray-400 hover:bg-gray-700 hover:text-gray-200' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition-colors ${
            darkMode 
              ? 'border-gray-700 hover:bg-gray-700 text-yellow-400' 
              : 'border-gray-200 hover:bg-gray-100 text-gray-600'
          }`}
        >
          <div className="flex items-center space-x-3">
            <span>{darkMode ? '☀️' : '🌙'}</span>
            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </div>
        </button>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 py-8 px-8 overflow-y-auto max-w-7xl">
        {/* Dynamic Header */}
        <header className={`rounded-2xl shadow-sm p-6 mb-6 flex items-center justify-between transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Student!</h1>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
              {activeTab === 'overview' && "Here's what's happening with your courses today."}
              {activeTab === 'courses' && 'Manage your enrolled paths and curriculum progress.'}
              {activeTab === 'assignments' && 'Track and submit your open coursework deadlines.'}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
              <button className={`p-2 transition-colors ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-500'}`}>
                🔔
              </button>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white font-semibold shadow-md">
              S
            </div>
          </div>
        </header>

        {/* Tab Sub-views */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className={`rounded-xl shadow-sm p-6 transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="flex items-center">
                    <div className="text-2xl mr-4">{stat.icon}</div>
                    <div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Quick Overview Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className={`rounded-xl shadow-sm p-6 h-full transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h2 className="text-lg font-semibold mb-4">Current Progress</h2>
                  <div className="space-y-4">
                    {courses.slice(0, 2).map(course => (
                      <div key={course.id} className={`rounded-lg p-4 transition-colors ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">{course.name}</h3>
                          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{course.progress}%</span>
                        </div>
                        <div className={`w-full rounded-full h-2.5 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                          <div className={`h-2.5 rounded-full bg-${course.color}-500`} style={{ width: `${course.progress}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={`rounded-xl shadow-sm p-6 transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-lg font-semibold mb-4">Announcements</h2>
                <div className="space-y-4">
                  {announcements.map(announcement => (
                    <div key={announcement.id} className="border-l-4 border-blue-500 pl-4">
                      <h3 className="font-medium text-sm">{announcement.title}</h3>
                      <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{announcement.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <section className={`rounded-xl shadow-sm p-6 transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-lg font-semibold">All Enrolled Courses</h2>
              <div className="flex space-x-2">
                {['all', 'ongoing', 'completed'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setCourseFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-colors ${
                      courseFilter === filter
                        ? 'bg-blue-600 text-white'
                        : darkMode 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCourses.map(course => (
                <div key={course.id} className={`rounded-xl p-5 border transition-colors ${darkMode ? 'bg-gray-700/30 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-base">{course.name}</h3>
Use code with caution.
<p className={text-xs mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}}>Instructor: {course.instructor}

{course.progress}%
<div className={w-full rounded-full h-2 mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}}>
<div className={h-2 rounded-full bg-${course.color}-500} style={{ width: ${course.progress}% }}>
<div className={text-xs flex items-center justify-between border-t pt-3 ${darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}}>
🎯 Next up: {course.nextLesson}


))}


)}
{activeTab === 'assignments' && (
Coursework Deadlines

{assignments.map(assignment => (
<div key={assignment.id} className={flex items-center justify-between p-4 rounded-xl border transition-colors ${darkMode ? 'bg-gray-700/30 border-gray-700' : 'bg-gray-50 border-gray-100'}}>

{assignment.title}
<p className={text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}}>{assignment.course}


<span className={inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ assignment.status === 'completed' ? 'bg-green-100 text-green-800' :  assignment.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :  'bg-red-100 text-red-800' }}>
{assignment.status}

<p className={text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}}>Due {assignment.dueDate}


))}


)}


);
}
export default StudentDashboard;