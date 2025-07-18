import React from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Academy Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <img
                  src="/favicon.ico"
                  alt="Logo"
                  className="w-full h-full rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">Al-Farooq Academy</h3>
                <p className="text-sm opacity-80">
                  Where Clarity Meets Conviction
                </p>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed mb-4">
              Empowering individuals with deep understanding of Islamic
              principles applied to modern finance and practical technological
              skills. We strive to cultivate ethical leaders and proficient
              professionals who can contribute meaningfully to the Islamic
              economy.
            </p>
            <div className="flex items-center space-x-2 text-sm opacity-90">
              <MapPin className="w-4 h-4" />
              <span>Serrekunda, Kanifing, The Gambia</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <Link
                to="/"
                className="block opacity-90 hover:opacity-100 transition-opacity"
              >
                Home
              </Link>
              <Link
                to="/courses"
                className="block opacity-90 hover:opacity-100 transition-opacity"
              >
                Courses
              </Link>
              <Link
                to="/about"
                className="block opacity-90 hover:opacity-100 transition-opacity"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="block opacity-90 hover:opacity-100 transition-opacity"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 opacity-90">
                <Mail className="w-4 h-4" />
                <span>info@alfarooqacademy.gm</span>
              </div>
              <div className="opacity-90">
                <p className="font-medium mb-1">Working Hours:</p>
                <p>Mon-Thu: 9:00 AM - 5:00 PM</p>
                <p>Friday: 9:00 AM - 1:00 PM</p>
                <p>Sat-Sun: Closed</p>
              </div>
              <div className="opacity-90">
                <p className="text-xs mt-2">
                  *Special evening or weekend classes may be scheduled based on
                  program demand.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white border-opacity-20 mt-8 pt-8 text-center">
          <p className="text-sm opacity-80">
            © 2024 Al-Farooq Academy. All rights reserved. | Distinguishing
            Right from Wrong in all endeavors.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
