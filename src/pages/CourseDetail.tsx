
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { EnrollmentModal } from '@/components/EnrollmentModal';
import EditProfileModal from '@/components/EditProfileModal';
import { useCourse } from '@/hooks/useCourses';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { ArrowDown, User, Play } from 'lucide-react';

const CourseDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { data: course, isLoading, error } = useCourse(id!);
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Fetch user profile data
  const { data: userProfile, refetch: refetchProfile } = useQuery({
    queryKey: ['user-profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      return data;
    },
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading course...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-8">The course you're looking for doesn't exist.</p>
          <Link to="/courses">
            <Button>Back to Courses</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleEnroll = () => {
    if (!user) {
      // Redirect to login
      window.location.href = '/auth?redirect=' + window.location.pathname;
    } else {
      setShowEnrollmentModal(true);
    }
  };

  const handleProfileUpdate = () => {
    setShowEnrollmentModal(false);
    setShowProfileModal(true);
  };

  const handleProfileUpdated = () => {
    refetchProfile();
    setShowProfileModal(false);
  };

  // Use course image or fallback to a placeholder
  const courseImage = course.image_url || `https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Course Hero */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/20 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <div className="flex items-center gap-3 mb-4">
                  {course.category && <Badge variant="secondary" className="text-sm">{course.category}</Badge>}
                  {course.level && <Badge variant="outline" className="text-sm">{course.level}</Badge>}
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  {course.title}
                </h1>
                
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {course.description}
                </p>
                
                <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-8">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{course.instructor}</span>
                  </div>
                  {course.duration && (
                    <>
                      <span>•</span>
                      <span>{course.duration}</span>
                    </>
                  )}
                  {course.modules && (
                    <>
                      <span>•</span>
                      <span>{course.modules.length} modules</span>
                    </>
                  )}
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-primary">${course.price || 0}</span>
                  <Button size="lg" onClick={handleEnroll} className="px-8 hover-lift">
                    Enroll Now
                  </Button>
                </div>
              </div>
              
              <div className="animate-scale-in">
                <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/30">
                  <img 
                    src={courseImage} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center">
                          <div class="w-24 h-24 bg-primary rounded-full flex items-center justify-center">
                            <span class="text-white font-bold text-2xl">
                              ${course.category?.substring(0, 2).toUpperCase() || 'AF'}
                            </span>
                          </div>
                        </div>
                      `;
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Course Overview */}
            <section className="animate-fade-in">
              <h2 className="text-2xl font-bold mb-6">Course Overview</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-muted-foreground">
                  This comprehensive course will provide you with the knowledge and skills needed to excel in {course.category || 'this subject area'}. 
                  Led by expert instructor {course.instructor}, you'll learn through a combination of theoretical concepts and practical applications.
                </p>
              </div>
            </section>

            {/* Course Curriculum */}
            {course.modules && course.modules.length > 0 && (
              <section className="animate-fade-in">
                <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {course.modules.map((module: any, index: number) => (
                    <AccordionItem key={module.id || index} value={module.id || index.toString()} className="border rounded-lg px-6">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center justify-between w-full mr-4">
                          <div className="text-left">
                            <h3 className="font-semibold">Module {index + 1}: {module.title || `Module ${index + 1}`}</h3>
                            <p className="text-sm text-muted-foreground">
                              {module.lessons?.length || 0} lessons • {module.duration || '2 hours'}
                            </p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4">
                        <div className="space-y-3">
                          {module.lessons && module.lessons.map((lesson: any, lessonIndex: number) => (
                            <div key={lesson.id || lessonIndex} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                              <div className="flex items-center space-x-3">
                                <Play className="w-4 h-4 text-primary" />
                                <span className="text-sm text-muted-foreground w-6">{lessonIndex + 1}.</span>
                                <span className="text-sm">{lesson.title || `Lesson ${lessonIndex + 1}`}</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Badge variant="outline" className="text-xs">{lesson.type || 'Video'}</Badge>
                                <span className="text-xs text-muted-foreground">{lesson.duration || '10 min'}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Enrollment Card */}
            <Card className="sticky top-8 animate-scale-in">
              <CardHeader>
                <CardTitle className="text-xl">Course Access</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <span className="text-3xl font-bold text-primary">${course.price || 0}</span>
                </div>
                
                <div className="space-y-3">
                  <Button onClick={handleEnroll} className="w-full hover-lift">
                    Enroll Now
                  </Button>
                  {!user && (
                    <p className="text-xs text-muted-foreground text-center">
                      Please <Link to="/auth" className="text-primary hover:underline">login</Link> to enroll
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    {course.duration && (
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>{course.duration}</span>
                      </div>
                    )}
                    {course.level && (
                      <div className="flex justify-between">
                        <span>Level:</span>
                        <span>{course.level}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Modules:</span>
                      <span>{course.modules?.length || 0}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instructor */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-lg">Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{course.instructor}</h4>
                    <p className="text-sm text-muted-foreground">Expert Instructor</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />

      {/* Enrollment Modal */}
      {course && (
        <EnrollmentModal
          isOpen={showEnrollmentModal}
          onClose={() => setShowEnrollmentModal(false)}
          course={{
            id: course.id,
            title: course.title,
            instructor: course.instructor,
            price: course.price,
            category: course.category,
          }}
          userProfile={userProfile}
          onProfileUpdate={handleProfileUpdate}
        />
      )}

      {/* Profile Modal */}
      <EditProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onProfileUpdated={handleProfileUpdated}
      />
    </div>
  );
};

export default CourseDetail;
