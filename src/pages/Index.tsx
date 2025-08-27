import { ChatBot } from "@/components/ChatBot";
import wellnessHero from "@/assets/wellness-hero.jpg";

const Index = () => {
  return (
    <div 
      className="min-h-screen bg-gradient-calm relative"
      style={{
        backgroundImage: `linear-gradient(rgba(247, 250, 252, 0.9), rgba(247, 250, 252, 0.8)), url(${wellnessHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-4 py-8 h-screen flex flex-col relative z-10">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            Mental Wellness Companion
          </h1>
          <p className="text-muted-foreground">
            AI-powered support for your mental health journey • UN SDG 3: Good Health & Well-being
          </p>
        </header>
        
        <div className="flex-1 max-w-4xl mx-auto w-full">
          <ChatBot className="h-full bg-card/95 backdrop-blur-sm rounded-lg shadow-therapeutic border border-therapeutic/10" />
        </div>
        
        <footer className="text-center mt-6 text-sm text-muted-foreground">
          <p>
            🤝 Supporting mental wellness with compassionate AI • 
            <span className="mx-1">•</span>
            Built with care for your privacy and safety
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
