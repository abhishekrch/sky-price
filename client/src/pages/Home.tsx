
import { ArrowRight, PlaneTakeoff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FlightSearchForm } from '@/components/FlightSearchForm';

const features = [
  {
    title: 'Extensive Flight Search',
    description: 'Search through thousands of flights to find the best deals for your journey.',
    icon: PlaneTakeoff,
  },
  {
    title: 'Real-time Pricing',
    description: 'Get up-to-date pricing information from multiple airlines and booking platforms.',
    icon: PlaneTakeoff,
  },
  {
    title: 'Smart Recommendations',
    description: 'Receive personalized flight recommendations based on your preferences and travel history.',
    icon: PlaneTakeoff,
  },
];

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="pt-24 min-h-[80vh] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 -z-10"></div>
        
        <div className="absolute top-40 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slideDown">
              <div className="inline-block mb-6 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Flight Price Tracking
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Find the <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">best flights</span> at the best prices
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Compare flight prices, track fare changes, and get notified when prices drop for your preferred routes.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/search">
                  <Button size="lg" className="group">
                    Start Searching
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="lg" variant="outline">
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="animate-fadeIn">
              <FlightSearchForm variant="hero" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slideUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose SkyPrice</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our advanced platform helps you find the best flight deals with powerful features and real-time data.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 animate-slideUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto animate-slideUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Next Flight?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Sign up now and start tracking flight prices to never miss a deal.
            </p>
            <Link to="/register">
              <Button size="lg" className="px-8">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
