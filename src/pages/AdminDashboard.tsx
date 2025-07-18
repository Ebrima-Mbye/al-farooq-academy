
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseManagement from '@/components/admin/CourseManagement';
import UserManagement from '@/components/admin/UserManagement';
import AdminSettings from '@/components/admin/AdminSettings';
import EditProfileModal from '@/components/EditProfileModal';
import { Users, BookOpen, Settings, BarChart3, User, Home, LogOut } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider,
  SidebarTrigger,
  SidebarInset
} from '@/components/ui/sidebar';

const AdminDashboard = () => {
  const { user, isAdmin, loading, logout } = useAuth();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  // Fetch dashboard statistics
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [usersResponse, coursesResponse, studentsResponse, adminsResponse] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('courses').select('id', { count: 'exact', head: true }),
        supabase.from('user_roles').select('id', { count: 'exact', head: true }).eq('role', 'student'),
        supabase.from('user_roles').select('id', { count: 'exact', head: true }).eq('role', 'admin')
      ]);

      return {
        totalUsers: usersResponse.count || 0,
        totalCourses: coursesResponse.count || 0,
        totalStudents: studentsResponse.count || 0,
        totalAdmins: adminsResponse.count || 0,
        activeEnrollments: 0, // Placeholder for future enrollment feature
        revenue: 0 // Placeholder for future payment feature
      };
    },
    enabled: !!user && !!isAdmin,
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect non-admin users to regular dashboard or login
  if (!loading && !user) {
    return <Navigate to="/login" replace />;
  }
  
  if (!loading && user && !isAdmin) {
    console.log('Redirecting non-admin user to dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Admin';

  const sidebarItems = [
    { title: "Overview", key: "overview", icon: Home },
    { title: "Courses", key: "courses", icon: BookOpen },
    { title: "Users", key: "users", icon: Users },
    { title: "Analytics", key: "analytics", icon: BarChart3 },
    { title: "Settings", key: "settings", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'courses':
        return <CourseManagement />;
      case 'users':
        return <UserManagement />;
      case 'analytics':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Analytics & Reports</CardTitle>
              <CardDescription>
                View detailed analytics about course performance and user engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Analytics Coming Soon</h3>
                <p className="text-muted-foreground">
                  Detailed analytics and reporting features will be available here.
                </p>
              </div>
            </CardContent>
          </Card>
        );
      case 'settings':
        return <AdminSettings />;
      default:
        return (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="animate-scale-in">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {statsLoading ? '...' : stats?.totalUsers || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">Registered students</p>
                </CardContent>
              </Card>

              <Card className="animate-scale-in">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {statsLoading ? '...' : stats?.totalCourses || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">Published courses</p>
                </CardContent>
              </Card>

              <Card className="animate-scale-in">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Enrollments</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {statsLoading ? '...' : stats?.activeEnrollments || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">Current enrollments</p>
                </CardContent>
              </Card>

              <Card className="animate-scale-in">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <span className="text-lg">💰</span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${statsLoading ? '...' : stats?.revenue || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">Total earnings</p>
                </CardContent>
              </Card>
            </div>

            {/* Welcome Card */}
            <Card>
              <CardHeader>
                <CardTitle>Welcome to the Admin Dashboard</CardTitle>
                <CardDescription>
                  Manage your academy efficiently with these tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col space-y-2"
                    onClick={() => setActiveSection('courses')}
                  >
                    <BookOpen className="w-6 h-6" />
                    <span>Manage Courses</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col space-y-2"
                    onClick={() => setActiveSection('users')}
                  >
                    <Users className="w-6 h-6" />
                    <span>Manage Users</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
              <SidebarGroupContent>
                  <SidebarMenu>
                    {sidebarItems.map((item) => (
                      <SidebarMenuItem key={item.key}>
                        <SidebarMenuButton 
                          asChild
                          isActive={activeSection === item.key}
                        >
                          <button 
                            onClick={() => setActiveSection(item.key)}
                            className="flex items-center space-x-2 w-full transition-colors duration-200"
                          >
                            <item.icon className="w-4 h-4" />
                            <span>{item.title}</span>
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">Welcome, {userName}!</p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditProfileOpen(true)}
                  className="flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Edit Profile
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </div>
          </header>

          <div className="flex-1 space-y-4 p-8">
            {renderContent()}
          </div>

          <Footer />
        </SidebarInset>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal 
        isOpen={isEditProfileOpen} 
        onClose={() => setIsEditProfileOpen(false)} 
      />
    </SidebarProvider>
  );
};

export default AdminDashboard;
