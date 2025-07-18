
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EditProfileModal from '@/components/EditProfileModal';
import { useAuth } from '@/hooks/useAuth';
import { User, Mail, BookOpen, MessageSquare, Info, Home, Users, LogOut } from 'lucide-react';
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

const Dashboard = () => {
  const { user, isAdmin, loading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    // Only redirect if we're not loading and have determined the user's role
    if (!loading && user && isAdmin) {
      console.log('Redirecting admin to admin dashboard');
      navigate('/admin-dashboard', { replace: true });
    } else if (!loading && !user) {
      // Redirect to login if not authenticated
      navigate('/login', { replace: true });
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-8">Please log in to access your dashboard.</p>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // If user is admin, show loading instead of student dashboard content
  if (isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Redirecting to admin dashboard...</p>
        </div>
      </div>
    );
  }

  // Get user's full name from metadata or email
  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Student';

  const sidebarItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "My Courses", url: "/courses", icon: BookOpen },
    { title: "About Academy", url: "/about", icon: Info },
    { title: "Contact Support", url: "/contact", icon: MessageSquare },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Al-Farooq Academy</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild
                        isActive={location.pathname === item.url}
                      >
                        <Link to={item.url} className="flex items-center space-x-2 transition-colors duration-200">
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </Link>
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
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Welcome back, {userName}!</h1>
              <p className="text-muted-foreground">Continue your learning journey with Al-Farooq Academy</p>
            </div>
          </header>

          <div className="flex-1 space-y-4 p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Enrolled Courses */}
                <section className="animate-fade-in">
                  <h2 className="text-2xl font-semibold mb-6">My Courses</h2>
                  
                  <Card>
                    <CardContent className="py-12 text-center">
                      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">📚</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">No enrolled courses yet</h3>
                      <p className="text-muted-foreground mb-6">
                        Start your learning journey by enrolling in one of our comprehensive courses.
                      </p>
                      <Link to="/courses">
                        <Button>Browse Courses</Button>
                      </Link>
                    </CardContent>
                  </Card>
                </section>

                {/* Recent Activity */}
                <section className="animate-fade-in">
                  <h2 className="text-2xl font-semibold mb-6">Recent Activity</h2>
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                      <p>No recent activity to display.</p>
                      <p className="text-sm mt-2">Start learning to see your progress here!</p>
                    </CardContent>
                  </Card>
                </section>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Profile Card */}
                <Card className="animate-scale-in">
                  <CardHeader>
                    <CardTitle className="text-lg">My Profile</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{userName}</h4>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Mail className="w-3 h-3" />
                          <span>{user.email}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-border">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-primary">0</div>
                          <div className="text-xs text-muted-foreground">Enrolled Courses</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">0</div>
                          <div className="text-xs text-muted-foreground">Completed</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setIsEditProfileOpen(true)}
                      >
                        Edit Profile
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={handleLogout}
                        className="flex items-center space-x-1"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Achievement Badge */}
                <Card className="animate-fade-in">
                  <CardContent className="py-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white text-2xl">🌟</span>
                    </div>
                    <h4 className="font-semibold mb-2">Welcome Achiever</h4>
                    <p className="text-sm text-muted-foreground">
                      You've successfully joined Al-Farooq Academy! Start your first course to unlock more achievements.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
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

export default Dashboard;
