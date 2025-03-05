
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4',
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 font-semibold text-xl hover-float group transition-all duration-300"
        >
          <div className="bg-primary/10 rounded-full p-1.5 group-hover:bg-primary/20 transition-all duration-300">
            <Plane className="h-5 w-5 text-primary" />
          </div>
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">SkyPrice</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            <Link to="/" className={cn(
              "text-sm font-medium transition-all duration-300 hover:text-primary",
              location.pathname === "/" ? "text-primary" : "text-foreground/70"
            )}>
              Home
            </Link>
            <Link to="/search" className={cn(
              "text-sm font-medium transition-all duration-300 hover:text-primary",
              location.pathname === "/search" ? "text-primary" : "text-foreground/70"
            )}>
              Find Flights
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Button variant="ghost" onClick={logout} size="sm">
                Logout
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="default" size="sm" className="animate-pulse-soft">Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-slideDown">
          <div className="flex flex-col p-4 space-y-3">
            <Link to="/" className={cn(
              "px-4 py-2 rounded-md text-sm font-medium",
              location.pathname === "/" ? "bg-primary/10 text-primary" : "hover:bg-muted"
            )}>
              Home
            </Link>
            <Link to="/search" className={cn(
              "px-4 py-2 rounded-md text-sm font-medium",
              location.pathname === "/search" ? "bg-primary/10 text-primary" : "hover:bg-muted"
            )}>
              Find Flights
            </Link>
            
            <div className="border-t border-border my-2 pt-2">
              {isAuthenticated ? (
                <Button variant="ghost" onClick={logout} className="w-full justify-start">
                  Logout
                </Button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link to="/login" className="w-full">
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link to="/register" className="w-full">
                    <Button variant="default" className="w-full">Register</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
