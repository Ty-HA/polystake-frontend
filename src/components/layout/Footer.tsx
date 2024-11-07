'use client'

import React from 'react';
import { Github, X, Disc, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-yellow-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="text-2xl font-bold text-white">
              Poly<span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">Stake</span>
            </div>
            <p className="text-zinc-400 text-sm">
              The next generation staking platform for your digital assets. Secure, efficient, and rewarding.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors">
                <X className="h-5 w-5" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors">
                <Disc className="h-5 w-5" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors">
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors text-sm">
                  Stake
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors text-sm">
                  Rewards
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors text-sm">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors text-sm">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors text-sm">
                  Support Center
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors text-sm">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <form className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-lg hover:from-orange-600 hover:to-orange-500 transition-all duration-200 text-sm"
              >
                Subscribe to Newsletter
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-yellow-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-zinc-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} PolyStake. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors text-sm">
                Terms
              </a>
              <a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors text-sm">
                Privacy
              </a>
              <a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors text-sm">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;