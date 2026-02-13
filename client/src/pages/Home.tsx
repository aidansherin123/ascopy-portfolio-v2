import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Monitor, Mail, Radio, ArrowRight, Instagram, Mail as MailIcon } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { HeroCanvas } from "@/components/HeroCanvas";
import { useCreateInquiry } from "@/hooks/use-inquiries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { insertInquirySchema, type InsertInquiry } from "@shared/schema";
// Calendly can be problematic with SSR/builds sometimes, but basic usage is fine
import { InlineWidget } from "react-calendly";

gsap.registerPlugin(ScrollTrigger);

// --- Sections Components ---

const Hero = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5
      });
    }, textRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <HeroCanvas />
      
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-20">
        <div ref={textRef} className="max-w-3xl">
          <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight font-display">
            Hi, I'm <span className="text-[#a2a4ff]">Aidan</span>.
          </h1>
          <p className="hero-text text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl font-light leading-relaxed">
            I craft digital experiences that blend <span className="text-white font-medium">high-performance code</span> with <span className="text-white font-medium">compelling narrative</span>. 
            From interactive 3D websites to conversion-focused copy. I'm a programmer and freelance copywriter running A.S. Copy.
          </p>
          <div className="hero-text flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => scrollTo('website-samples')}
              className="h-14 px-8 rounded-full bg-transparent border-2 border-[#a2a4ff] text-[#a2a4ff] text-lg font-semibold hover:bg-[#a2a4ff] hover:text-[#000120] transition-all duration-300 group"
            >
              View My Work
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              onClick={() => scrollTo('contact')}
              className="h-14 px-8 rounded-full bg-white text-[#000120] text-lg font-semibold hover:bg-gray-200 transition-all duration-300"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20 hidden md:block">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ icon: Icon, title, description, index }: { icon: any, title: string, description: string, index: number }) => {
  return (
    <div 
      className="sticky top-32 w-full max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-2xl mb-12 transform transition-transform duration-500 border border-gray-100"
      style={{ zIndex: index + 10 }}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="w-20 h-20 bg-[#f0f1ff] rounded-2xl flex items-center justify-center shrink-0">
          <Icon className="w-10 h-10 text-[#a2a4ff]" />
        </div>
        <div>
          <h3 className="text-3xl font-bold text-[#000120] mb-3">{title}</h3>
          <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <section id="services" className="relative py-32 bg-[#000240]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            What I <span className="text-[#a2a4ff]">Do</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Combining technical expertise with creative strategy to build brands that stand out.
          </p>
        </div>

        <div className="flex flex-col gap-8 pb-20">
          <ServiceCard 
            index={1}
            icon={Monitor}
            title="Website Design & Development"
            description="Custom-coded websites that build an immersive, high-performance digital home for your brand."
          />
          <ServiceCard 
            index={2}
            icon={Mail}
            title="Email Sequences"
            description="Automated flows and campaigns that nurture leads into loyal customers. I write subject lines that get opened and body copy that drives action."
          />
          <ServiceCard 
            index={3}
            icon={Radio}
            title="Ad & SMS Copy"
            description="Short-form copy, designed to stop the scroll. From short-form Facebook ads to direct response SMS, I craft messages that convert instantly."
          />
        </div>
      </div>
    </section>
  );
};

import peakScreenshot from "@assets/image_1771012499030.png";
import guardianScreenshot from "@assets/image_1771012521871.png";

const WebsiteSamples = () => {
  return (
    <section id="website-samples" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-[#000120] mb-16 text-center">
          Recent Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Project 1 */}
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] shadow-lg mb-6 bg-gray-100">
              <div className="absolute inset-0 bg-[#000120]/0 group-hover:bg-[#000120]/10 transition-colors duration-300 z-10" />
              <img 
                src={peakScreenshot} 
                alt="Peak Nutrition Website"
                className="website-sample-img w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <h3 className="text-2xl font-bold text-[#000120] group-hover:text-[#a2a4ff] transition-colors">Peak Nutrition</h3>
            <p className="text-gray-500 mt-2">E-commerce • Branding • 3D Product View</p>
          </div>

          {/* Project 2 */}
          <div className="group cursor-pointer md:mt-12">
             <div className="relative overflow-hidden rounded-2xl aspect-[4/3] shadow-lg mb-6 bg-gray-100">
              <div className="absolute inset-0 bg-[#000120]/0 group-hover:bg-[#000120]/10 transition-colors duration-300 z-10" />
              <img 
                src={guardianScreenshot} 
                alt="Guardian Legal Website"
                className="website-sample-img w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <h3 className="text-2xl font-bold text-[#000120] group-hover:text-[#a2a4ff] transition-colors">Guardian Legal</h3>
            <p className="text-gray-500 mt-2">Professional Services • Corporate Identity • React</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Data for Copy Samples
const copyData = {
  companies: ["Urban Thread Co.", "Radiant Beauty Lab", "Apex Performance", "Authority Academy"],
  types: ["Email", "SMS", "Ads"],
  content: {
    "Urban Thread Co.": {
      "Email": {
        subject: "Subject: You left this behind (and it looks good on you)",
        body: "Hey [Name],\n\nWe noticed you were eyeing some fresh fits but didn't pull the trigger. We get it—commitment is scary. But missing out on our limited run collection? That's terrifying. A.S. Copy is here to help you make the right choice.\n\nYour cart is saved for the next 24 hours. After that, no promises.\n\n[Button: Secure My Style]\n\nP.S. Use code THREAD10 for 10% off if you checkout before midnight."
      },
      "SMS": "Urban Thread: Flash sale alert! ⚡ 48 hours only. 30% off all denim. Shop now before sizes run out: [Link] Text STOP to opt out.",
      "Ads": "HEADLINE: Denim that actually fits.\n\nStop settling for jeans that are too tight, too loose, or just plain uncomfortable. Urban Thread uses premium 4-way stretch tech for the perfect fit, every time.\n\nTry them risk-free for 30 days. Shop the collection 👇"
    },
    "Radiant Beauty Lab": {
      "Email": {
        subject: "Subject: The secret to glowing skin isn't more makeup",
        body: "Hi [Name],\n\nYou've been told to cover up imperfections. We believe in clearing them up. A.S. Copy believes your natural beauty should shine.\n\nMeet the Glow Serum—formulated with 15% Vitamin C and Hyaluronic Acid to hydrate, brighten, and protect.\n\nReal results in 2 weeks. See the transformation photos here: [Link]"
      },
      "SMS": "Radiant Beauty: Your skin called. It wants a drink. 💧 Hydrate with our new Hyaluronic Mist. Free shipping today! [Link]",
      "Ads": "HEADLINE: Glow like you just drank a gallon of water.\n\nDull skin? Tired eyes? Our Vitamin C serum wakes up your face instantly. \n\n✨ 100% Vegan\n✨ Cruelty-Free\n✨ 30-Day Money-Back Guarantee\n\nShop the glow up now."
    },
    "Apex Performance": {
      "Email": {
        subject: "Subject: Motivation is garbage",
        body: "Discipline is what gets you results. Motivation is just a feeling.\n\nAt Apex, we don't rely on feelings. We rely on science-backed training protocols designed by A.S. Copy to break plateaus.\n\nAre you ready to stop guessing and start training? Join the program today."
      },
      "SMS": "Apex Gym: Don't skip Monday. Book your slot for tomorrow's HIIT class now. Spaces filling fast! 🏋️‍♂️ [Link]",
      "Ads": "HEADLINE: Stop exercising. Start training.\n\nMost people go to the gym and waste time. Apex members go to the gym and get results.\n\nJoin the gym that builds athletes, not just memberships. First week free."
    },
    "Authority Academy": {
      "Email": {
        subject: "Subject: Your expertise is worth more",
        body: "Most consultants undercharge. Not because they aren't good, but because they don't know how to position their value.\n\nIn this week's masterclass, I'm breaking down the exact framework A.S. Copy used to close my first $10k retainer.\n\nWatch it here (free for the next 24h): [Link]"
      },
      "SMS": "Authority Academy: Live webinar starting in 15 mins! Learn how to scale your consulting biz to 6-figures. Join here: [Link]",
      "Ads": "HEADLINE: Stop trading time for money.\n\nIf you're an expert in your field, you should be selling outcomes, not hours.\n\nLearn the 'Value-Based Pricing' model that top consultants use to 5x their revenue. Download the free guide."
    }
  }
};

const CopySamples = () => {
  const [selectedCompany, setSelectedCompany] = useState(copyData.companies[0]);
  const [selectedType, setSelectedType] = useState(copyData.types[0]);

  // @ts-ignore
  const currentContent = copyData.content[selectedCompany][selectedType];

  return (
    <section id="copy-samples" className="py-32 bg-[#000120] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
          Words That <span className="text-[#a2a4ff]">Sell</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Controls */}
          <div className="lg:col-span-4 space-y-10">
            <div>
              <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-4">Select Client</h3>
              <div className="flex flex-col gap-2">
                {copyData.companies.map(company => (
                  <button
                    key={company}
                    onClick={() => setSelectedCompany(company)}
                    className={`text-left px-5 py-3 rounded-xl transition-all duration-300 font-medium ${
                      selectedCompany === company 
                        ? "bg-[#a2a4ff] text-[#000120] shadow-lg shadow-[#a2a4ff]/20 translate-x-2" 
                        : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    {company}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-4">Select Format</h3>
              <div className="flex flex-wrap gap-2">
                {copyData.types.map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                      selectedType === type
                        ? "bg-transparent border-[#a2a4ff] text-[#a2a4ff]"
                        : "bg-transparent border-gray-700 text-gray-500 hover:border-gray-500"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Display Area */}
          <div className="lg:col-span-8">
            <div className="bg-[#000230] border border-white/10 rounded-3xl p-8 md:p-12 min-h-[400px] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#a2a4ff] to-purple-600" />
              
              <div className="flex items-center justify-between mb-8 opacity-50">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-xs font-mono uppercase">
                  {selectedCompany} • {selectedType}
                </div>
              </div>

              <div className="font-mono text-gray-300 whitespace-pre-wrap leading-relaxed animate-in fade-in duration-500 key={selectedCompany+selectedType}">
                {typeof currentContent === 'string' ? currentContent : (
                  <>
                    <div className="text-white font-bold mb-4">{currentContent.subject}</div>
                    <div>{currentContent.body}</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const createInquiry = useCreateInquiry();

  const onSubmit = (data: InsertInquiry) => {
    createInquiry.mutate(data, {
      onSuccess: () => form.reset()
    });
  };

  return (
    <section id="contact" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Contact Info + Form */}
          <div>
            <h2 className="text-5xl font-bold text-[#000120] mb-6">
              Let's Start a <br/><span className="text-[#a2a4ff]">Conversation</span>
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Whether you need a website overhaul, a converting email sequence, or just want to chat about 3D web design—I'm here.
            </p>

            <form 
              action="https://formspree.io/f/aidansherin123@gmail.com" 
              method="POST" 
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  placeholder="John Doe" 
                  className="flex h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  placeholder="john@company.com" 
                  className="flex h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Message</label>
                <textarea 
                  name="message" 
                  required 
                  placeholder="Tell me about your project..." 
                  className="flex min-h-[150px] w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-14 bg-[#000120] text-white rounded-xl text-lg font-semibold hover:bg-[#a2a4ff] hover:text-[#000120] transition-colors"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Right: Calendly */}
          <div className="bg-white rounded-3xl shadow-2xl p-4 border border-gray-100 min-h-[600px] flex flex-col justify-center">
             <div className="text-center mb-4 text-gray-500 font-medium">Or book a call directly</div>
             <div className="h-[600px] w-full overflow-hidden rounded-xl">
               <InlineWidget 
                 url="https://calendly.com/aidansherin123/30min" 
                 styles={{ height: '100%' }}
               />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#000120] py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h2 className="text-2xl font-bold font-display text-white mb-2">A.S. Copy.</h2>
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} A.S. Copy. All rights reserved.</p>
        </div>
        
        <div className="flex items-center gap-6">
          <a href="mailto:aidansherin123@gmail.com" className="flex items-center gap-2 text-gray-400 hover:text-[#a2a4ff] transition-colors">
            <MailIcon className="w-5 h-5" />
            <span>aidansherin123@gmail.com</span>
          </a>
          <a 
            href="https://instagram.com/aidansherin" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-[#a2a4ff] transition-colors"
          >
            <Instagram className="w-5 h-5" />
            <span>@aidansherin</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      <Hero />
      <Services />
      <WebsiteSamples />
      <CopySamples />
      <Contact />
      <Footer />
    </div>
  );
}
