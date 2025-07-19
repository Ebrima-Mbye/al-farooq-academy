import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log("Contact form submitted");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to begin your journey? Get in touch with us today and discover
            how Al-Farooq Academy can help you achieve your educational and
            professional goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Get In Touch
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Whether you have questions about our courses, need guidance on
                which program is right for you, or want to learn more about our
                academy, we're here to help. Reach out to us through any of the
                methods below.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              <Card className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        Phone
                      </h3>
                      <p className="text-muted-foreground">+220 650 9580</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Available during business hours
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        Email
                      </h3>
                      <p className="text-muted-foreground">
                        info@alfarooqacademy.gm
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        We'll respond within 24 hours
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        Location
                      </h3>
                      <p className="text-muted-foreground">
                        Serrekunda, Kanifing
                      </p>
                      <p className="text-muted-foreground">The Gambia</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        Working Hours
                      </h3>
                      <div className="text-muted-foreground space-y-1">
                        <p>Monday - Thursday: 9:00 AM - 5:00 PM</p>
                        <p>Friday: 9:00 AM - 1:00 PM</p>
                        <p>Saturday & Sunday: Closed</p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        *Special evening or weekend classes may be scheduled
                        based on program demand.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  <span>Send us a Message</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        First Name *
                      </label>
                      <Input id="firstName" name="firstName" required />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Last Name *
                      </label>
                      <Input id="lastName" name="lastName" required />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Email Address *
                    </label>
                    <Input id="email" name="email" type="email" required />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Phone Number
                    </label>
                    <Input id="phone" name="phone" type="tel" />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Subject *
                    </label>
                    <Input id="subject" name="subject" required />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      placeholder="Tell us about your interest in our courses or any questions you have..."
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Visit Our Campus
          </h2>
          <Card>
            <CardContent className="p-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3880.234717743389!2d-16.688216326780168!3d13.459623803994752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec29a3707daa3d1%3A0xbc31ee0843def79d!2sKairaba%20Ave%2C%20Serrekunda%2C%20The%20Gambia!5e0!3m2!1sen!2str!4v1752895072664!5m2!1sen!2str"
                width={window?.innerWidth - 40}
                height={450}
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen={true}
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-primary/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Don't wait to begin your educational journey. Browse our courses and
            enroll today to start building the skills that will shape your
            future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/courses">View Courses</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/register">Register Now</a>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
