
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Users, Award, Target, Heart, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About Al-Farooq Academy
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Where Clarity Meets Conviction: Distinguishing Right from Wrong in all endeavors
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Islamic Architecture" 
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Al-Farooq Academy is dedicated to empowering individuals with a deep understanding of 
                Islamic principles applied to modern finance and practical technological skills. We strive 
                to cultivate ethical leaders and proficient professionals who can contribute meaningfully 
                to the Islamic economy and beyond.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Guided by the wisdom to distinguish right from wrong in all their endeavors, our students 
                emerge as competent professionals ready to make a positive impact in their communities and 
                the global Islamic economy.
              </p>
            </div>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="mb-16 bg-secondary/30 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Our Philosophy</h2>
          <p className="text-muted-foreground text-center leading-relaxed max-w-4xl mx-auto">
            Rooted in the noble tradition of discerning truth, our academy combines rigorous academic 
            instruction with hands-on practical training. We foster an environment of intellectual 
            curiosity, ethical grounding, and continuous learning, ensuring our students develop both 
            technical competence and moral clarity.
          </p>
        </div>

        {/* What We Offer */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Islamic Finance Training</h3>
                <p className="text-muted-foreground">
                  Comprehensive courses covering principles, products, and practices of Sharia-compliant finance.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Shari'ah & Banking</h3>
                <p className="text-muted-foreground">
                  In-depth studies on Islamic law applied to financial transactions and banking operations.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Islamic FinTech</h3>
                <p className="text-muted-foreground">
                  Exploring Islamic finance and technology, including digital currencies and blockchain.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Microsoft Excel</h3>
                <p className="text-muted-foreground">
                  From beginner to advanced levels, focusing on data analysis and financial modeling.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">PowerPoint Mastery</h3>
                <p className="text-muted-foreground">
                  Developing compelling presentation skills and advanced visual storytelling.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Word Professionalism</h3>
                <p className="text-muted-foreground">
                  Creating, formatting, and managing professional documents efficiently.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Target Audience */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Who We Serve</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Students seeking to deepen their understanding of Islamic finance</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Professionals looking to enhance their digital literacy</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Entrepreneurs building ethical businesses</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Anyone committed to continuous learning and growth</p>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Learning Environment" 
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Location Advantage */}
        <div className="bg-primary/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Strategically Located</h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Based in Serrekunda, Kanifing, The Gambia, we are accessible to a vibrant community and 
            contribute to the local and regional development of Islamic financial expertise. Our 
            experienced instructors bring both theoretical knowledge and practical industry insights 
            to create a comprehensive learning experience.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
