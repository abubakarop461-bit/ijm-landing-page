"use client";

import { useState, FormEvent, useEffect } from "react";
import Image from "next/image";
import { 
  Phone, 
  Mail, 
  MapPin, 
  User, 
  CheckCircle, 
  Shield, 
  Maximize2, 
  Trees, 
  Building, 
  Award, 
  Compass,
  Menu,
  X,
  Star,
  Check
} from "lucide-react";

import SpotlightCard from "@/components/reactbits/SpotlightCard";
import ShinyText from "@/components/reactbits/ShinyText";
import BlurText from "@/components/reactbits/BlurText";
import DecryptedText from "@/components/reactbits/DecryptedText";

// Form Interface
interface FormData {
  name: string;
  phone: string;
  email: string;
  config: string;
  date?: string;
  message?: string;
}

export default function LandingPage() {
  // Mobile menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Enquire Now");
  
  // Success state
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Floor plan active tab state
  const [activeFloorTab, setActiveFloorTab] = useState<"2bhk" | "2.5bhk" | "3bhk">("2bhk");
  const [heroBg, setHeroBg] = useState<string>("/images/hero-img-d.png");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setHeroBg("/images/hero-img-m.png");
      } else {
        setHeroBg("/images/hero-img-d.png");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Form states
  const [heroForm, setHeroForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    config: "2 BHK"
  });

  const [visitForm, setVisitForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    config: "2.5 BHK",
    date: ""
  });

  const [modalForm, setModalForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    config: "3 BHK",
    message: ""
  });

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (data: FormData): boolean => {
    const tempErrors: Record<string, string> = {};
    if (!data.name.trim()) tempErrors.name = "Name is required";
    
    const phonePattern = /^[6-9]\d{9}$/;
    if (!data.phone.trim()) {
      tempErrors.phone = "Phone is required";
    } else if (!phonePattern.test(data.phone)) {
      tempErrors.phone = "Phone must be a valid 10-digit number";
    }
    
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!data.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!emailPattern.test(data.email)) {
      tempErrors.email = "Invalid email format";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleHeroSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm(heroForm)) {
      // TODO: Wire form to CRM/email backend — currently shows success state only
      console.log("Hero Form Submitted: ", heroForm);
      setShowSuccess(true);
      resetForms();
    }
  };

  const handleVisitSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm(visitForm)) {
      // TODO: Wire form to CRM/email backend — currently shows success state only
      console.log("Visit Form Submitted: ", visitForm);
      setShowSuccess(true);
      resetForms();
    }
  };

  const handleModalSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm(modalForm)) {
      // TODO: Wire form to CRM/email backend — currently shows success state only
      console.log("Modal Form Submitted: ", modalForm);
      setIsModalOpen(false);
      setShowSuccess(true);
      resetForms();
    }
  };

  const resetForms = () => {
    setHeroForm({ name: "", phone: "", email: "", config: "2 BHK" });
    setVisitForm({ name: "", phone: "", email: "", config: "2.5 BHK", date: "" });
    setModalForm({ name: "", phone: "", email: "", config: "3 BHK", message: "" });
    setErrors({});
  };

  const openEnquiryModal = (title: string, defaultBhk: string) => {
    setModalTitle(title);
    setModalForm(prev => ({ ...prev, config: defaultBhk }));
    setIsModalOpen(true);
  };

  // Sticky Header logic for background style changes on scroll
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen font-sans text-gray-900 bg-gray-50 antialiased selection:bg-gold selection:text-navy">
      
      {/* Right side sticky enquire tab (Vertical writing mode, Gold background) */}
      <button 
        onClick={() => openEnquiryModal("Quick Enquiry", "2.5 BHK")}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-[#C9A227] hover:bg-gold-light text-[#1a2744] font-black py-5 px-3 uppercase tracking-widest text-[11px] shadow-2xl transition-all duration-300 rounded-l-lg select-none hidden lg:block"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        Enquire Now
      </button>

      {/* Sticky Navbar (White/transparent Serenity style) */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-[#0f1e3d]/95 backdrop-blur-md shadow-lg border-b border-gold/15 py-3" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <a href="#hero" className="flex items-center">
                <Image 
                  src="/images/footer-logo.png" 
                  alt="IJM First City Logo" 
                  width={80}
                  height={40}
                  className="object-contain"
                  priority
                />
              </a>
            </div>

            {/* Nav Links Center */}
            <nav className="hidden lg:flex items-center space-x-6 text-sm text-white font-semibold">
              <a href="#hero" className="hover:text-gold transition-colors">Home</a>
              <a href="#overview" className="hover:text-gold transition-colors">Overview</a>
              <a href="#why-ijm" className="hover:text-gold transition-colors">Highlights</a>
              <a href="#amenities" className="hover:text-gold transition-colors">Amenities</a>
              <a href="#overview" className="hover:text-gold transition-colors">Gallery</a>
              <a href="#configurations" className="hover:text-gold transition-colors">Price List</a>
              <a href="#floor-plans" className="hover:text-gold transition-colors">Floor Plan</a>
              <a href="#connectivity" className="hover:text-gold transition-colors">Location</a>
            </nav>

            {/* Phone Number Right in Bordered Box */}
            <div className="hidden md:flex items-center">
              <a 
                href="tel:+919920511119" 
                className="flex items-center gap-2 text-white border border-white/30 hover:border-gold hover:text-gold transition-all duration-300 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-lg"
              >
                <Phone size={14} className="text-gold" />
                <span>+91 99205 11119</span>
              </a>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex items-center lg:hidden space-x-3">
              <a 
                href="tel:+919920511119" 
                className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center"
                aria-label="Call Sales"
              >
                <Phone size={16} className="text-gold" />
              </a>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-gold p-1"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#0f1e3d] border-b border-gold/15 py-6 px-4 shadow-xl flex flex-col space-y-4 lg:hidden">
            <nav className="flex flex-col space-y-3 text-gray-300 text-base font-semibold">
              <a href="#hero" onClick={() => setIsMenuOpen(false)} className="hover:text-gold py-1">Home</a>
              <a href="#overview" onClick={() => setIsMenuOpen(false)} className="hover:text-gold py-1">Overview</a>
              <a href="#why-ijm" onClick={() => setIsMenuOpen(false)} className="hover:text-gold py-1">Highlights</a>
              <a href="#amenities" onClick={() => setIsMenuOpen(false)} className="hover:text-gold py-1">Amenities</a>
              <a href="#overview" onClick={() => setIsMenuOpen(false)} className="hover:text-gold py-1">Gallery</a>
              <a href="#configurations" onClick={() => setIsMenuOpen(false)} className="hover:text-gold py-1">Price List</a>
              <a href="#floor-plans" onClick={() => setIsMenuOpen(false)} className="hover:text-gold py-1">Floor Plan</a>
              <a href="#connectivity" onClick={() => setIsMenuOpen(false)} className="hover:text-gold py-1">Location</a>
            </nav>
            <div className="h-px bg-white/10 my-2"></div>
            <div className="flex flex-col gap-3">
              <a 
                href="tel:+919920511119" 
                className="flex items-center gap-3 text-white py-2 text-sm font-semibold justify-center bg-white/5 border border-white/10 rounded-sm"
              >
                <Phone size={16} className="text-gold" />
                <span>Call Now: +91 99205 11119</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Redesigned Hero: Full Viewport, Full Bleed Building Background with Dark Overlay */}
      <section
      id="hero"
      className="relative min-h-screen pt-24 lg:pt-0 flex items-center justify-center bg-[#1a2744] bg-cover bg-center overflow-hidden z-10"
      style={{ backgroundImage: `url('${heroBg}')`, backgroundPosition: "center", backgroundSize: "cover" }}
      >
      {/* Dark overlay: rgba(15, 20, 40, 0.65) */}
      <div className="absolute inset-0 bg-[#0f1428]/65 z-[2]"></div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

      {/* Left Column: Over the image content (Aligned self-end/bottom-left on desktop) */}
      <div className="lg:col-span-7 text-center lg:text-left space-y-4 lg:space-y-6 z-[3] text-white lg:self-end lg:mb-4 flex flex-col items-center lg:items-start w-full">
        <div className="space-y-1">
          <ShinyText 
            text="MIHAN, Nagpur" 
            className="text-[#C9A227] font-bold text-[10px] sm:text-xs uppercase tracking-widest block"
            color="#C9A227" 
            shineColor="#ffffff" 
            speed={3} 
          />
          <BlurText 
            text="IJM FIRST CITY" 
            className="text-3xl sm:text-5xl lg:text-[52px] font-black tracking-tight leading-none uppercase text-white justify-center lg:justify-start" 
            delay={100} 
            animateBy="words" 
            direction="bottom" 
          />
          <div className="text-lg sm:text-2xl lg:text-[24px] font-bold text-white/95">
            <DecryptedText 
              text="2, 2.5 & 3 BHK Apartments" 
              animateOn="hover" 
              speed={40} 
              className="text-lg sm:text-2xl lg:text-[24px] font-bold text-white/95" 
            />
          </div>
        </div>

        {/* Specifications list: horizontal row on mobile, vertical stack on desktop */}
        <div className="flex flex-wrap lg:flex-col gap-x-4 gap-y-2 pt-1 lg:pt-2 lg:space-y-3 text-xs sm:text-base text-white/90 font-medium justify-center lg:justify-start">
          <div className="flex items-center gap-1.5 sm:gap-3">
            <MapPin size={14} className="text-[#C9A227] shrink-0" />
            <span>MIHAN, Nagpur</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3">
            <Maximize2 size={14} className="text-[#C9A227] shrink-0" />
            <span>Carpet Area: 647 - 1,330 Sq.Ft.*</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3">
            <Building size={14} className="text-[#C9A227] shrink-0" />
            <span>Status: Under Construction</span>
          </div>
        </div>

        {/* Gold CTA button and payment plan */}
        <div className="space-y-2 pt-2 lg:pt-4 flex flex-col items-center lg:items-start w-full">
          <button
            onClick={() => openEnquiryModal("Request Pricing Details", "2.5 BHK")}
            className="inline-block bg-[#C9A227] hover:bg-gold-light text-[#1a2744] font-black px-5 py-2.5 sm:px-8 sm:py-3.5 rounded-full shadow-lg transition-all duration-300 text-[11px] sm:text-sm tracking-wider uppercase"
          >
            Starting Price: ₹73 Lakhs* Onwards
          </button>
          <p className="text-[11px] sm:text-sm text-white/80 font-semibold tracking-wide pl-0 lg:pl-3">
            Payment Plan — Flexi Pay
          </p>
        </div>
      </div>

      {/* Right Column: Dark Form Card (semi-transparent bg rgba(10, 15, 35, 0.85) vertically centered, hidden on mobile/tablet) */}
      <div className="hidden lg:flex lg:col-span-5 w-full justify-center z-[3] lg:self-center">
        <div className="bg-[#0a0f23]/85 backdrop-blur-md border border-white/10 w-full max-w-md rounded-xl shadow-2xl p-4 sm:p-8">

          <div className="text-center mb-3 sm:mb-6">
            <h3 className="text-sm sm:text-lg font-black text-white uppercase tracking-wider">
              BOOK YOUR NEW HOME
            </h3>
            <div className="w-10 h-[2px] bg-gold mx-auto mt-1 sm:mt-2 rounded-full"></div>
          </div>

          <form onSubmit={handleHeroSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-[10px] sm:text-xs font-semibold text-white/80 uppercase tracking-wider mb-1">Full Name*</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white/40">
                  <User size={14} />
                </span>
                <input
                  type="text"
                  required
                  value={heroForm.name}
                  onChange={(e) => setHeroForm({...heroForm, name: e.target.value})}
                  placeholder="John Doe"
                  className={`w-full pl-9 pr-3 py-1.5 sm:py-2 bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-lg focus:outline-none focus:border-gold text-xs sm:text-sm text-white`}
                />
              </div>
              {errors.name && <p className="text-red-500 text-[10px] mt-0.5">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-[10px] sm:text-xs font-semibold text-white/80 uppercase tracking-wider mb-1">Phone Number*</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white/50">
                  <span className="text-[10px] sm:text-xs font-bold font-sans">+91</span>
                </span>
                <input
                  type="tel"
                  required
                  value={heroForm.phone}
                  onChange={(e) => setHeroForm({...heroForm, phone: e.target.value})}
                  placeholder="Mobile Number"
                  className={`w-full pl-11 pr-3 py-1.5 sm:py-2 bg-white/5 border ${errors.phone ? 'border-red-500' : 'border-white/10'} rounded-lg focus:outline-none focus:border-gold text-xs sm:text-sm text-white`}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-[10px] mt-0.5">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-[10px] sm:text-xs font-semibold text-white/80 uppercase tracking-wider mb-1">Email Address*</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white/40">
                  <Mail size={14} />
                </span>
                <input
                  type="email"
                  required
                  value={heroForm.email}
                  onChange={(e) => setHeroForm({...heroForm, email: e.target.value})}
                  placeholder="name@domain.com"
                  className={`w-full pl-9 pr-3 py-1.5 sm:py-2 bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-lg focus:outline-none focus:border-gold text-xs sm:text-sm text-white`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-[10px] mt-0.5">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-[10px] sm:text-xs font-semibold text-white/80 uppercase tracking-wider mb-1">Interested BHK*</label>
              <select
                value={heroForm.config}
                onChange={(e) => setHeroForm({...heroForm, config: e.target.value})}
                className="w-full px-3 py-1.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-gold text-xs sm:text-sm text-white [&>option]:text-navy"
              >
                <option value="2 BHK">2 BHK Apartments</option>
                <option value="2.5 BHK">2.5 BHK Apartments</option>
                <option value="3 BHK">3 BHK Apartments</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-[#C9A227] hover:bg-gold-light text-[#1a2744] font-black py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-300 shadow-md uppercase tracking-wider text-xs sm:text-sm"
            >
              Get Best Price
            </button>

            <p className="text-[9px] sm:text-[10px] text-white/50 text-center leading-normal pt-0.5">
              By submitting you agree to be contacted by our team
            </p>
          </form>
        </div>
      </div>

      </div>

      {/* Barcode / RERA display bottom left of Hero */}
      <div className="absolute bottom-4 left-4 z-10 hidden lg:block">
      <p className="text-white text-[10px] font-semibold bg-black/40 px-3 py-1.5 rounded backdrop-blur-sm border border-white/5">
      MahaRERA Reg No: P50500049468 | P50500080409
      </p>
      </div>
      </section>

      {/* Stats Bar: Navy Gradient, Gold text, Sleek compact ribbon, Dividers */}
      <section className="bg-gradient-to-r from-[#0f1e3d] to-[#1a2744] border-y border-gold/25 py-5 sm:py-6 relative overflow-hidden noise-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 lg:gap-6 text-center lg:divide-x divide-gold/20">
            <div className="py-1 lg:py-0">
              <span className="block text-2xl sm:text-3xl font-black text-gold leading-none">7.5 ACRES</span>
              <span className="block text-[10px] uppercase tracking-wider text-gray-300 mt-1.5 font-bold">Project Size</span>
            </div>
            <div className="py-1 lg:py-0 lg:pl-4">
              <span className="block text-2xl sm:text-3xl font-black text-gold leading-none">690 UNITS</span>
              <span className="block text-[10px] uppercase tracking-wider text-gray-300 mt-1.5 font-bold">Harmony Tower</span>
            </div>
            <div className="py-1 lg:py-0 lg:pl-4">
              <span className="block text-2xl sm:text-3xl font-black text-gold leading-none">DEC 2027</span>
              <span className="block text-[10px] uppercase tracking-wider text-gray-300 mt-1.5 font-bold">RERA Possession</span>
            </div>
            <div className="py-1 lg:py-0 lg:pl-4">
              <span className="block text-2xl sm:text-3xl font-black text-gold leading-none">₹73L - 1.14CR</span>
              <span className="block text-[10px] uppercase tracking-wider text-gray-300 mt-1.5 font-bold">Price Range</span>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section - White bg */}
      <section id="overview" className="py-24 sm:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading Accent */}
          <div className="flex flex-col items-center mb-16">
            <span className="text-[#C9A227] font-bold text-xs uppercase tracking-widest block mb-2">PROJECT OVERVIEW</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-navy text-center tracking-tight leading-tight">Welcome to IJM FCP Harmony</h2>
            <div className="w-12 h-[3px] bg-[#C9A227] mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Visual Render Grid */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4 relative">
              <div className="absolute -inset-4 bg-gold/5 rounded-2xl -z-10 blur-xl"></div>
              
              <div className="space-y-4 pt-4 sm:pt-8">
                <div className="relative h-32 sm:h-64 rounded-lg overflow-hidden shadow-xl border border-gold/10">
                  <Image 
                    src="/images/gallery/gallery1.jpg" 
                    alt="Building Elevation" 
                    fill 
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="relative h-28 sm:h-48 rounded-lg overflow-hidden shadow-xl border border-gold/10">
                  <Image 
                    src="/images/gallery/gallery3.jpg" 
                    alt="Clubhouse Exterior" 
                    fill 
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="relative h-28 sm:h-48 rounded-lg overflow-hidden shadow-xl border border-gold/10">
                  <Image 
                    src="/images/gallery/gallery4.jpg" 
                    alt="Landscaped Gardens" 
                    fill 
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="relative h-32 sm:h-64 rounded-lg overflow-hidden shadow-xl border border-gold/10">
                  <Image 
                    src="/images/gallery/gallery2.jpg" 
                    alt="Apartment Balcony View" 
                    fill 
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Description Text */}
            <div className="lg:col-span-6 space-y-6 lg:pl-4">
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                FCP Harmony is a premium 7.5-acre gated enclave of 690 luxury apartments inside MIHAN&apos;s landmark 31-acre international township. The modern G+Podium+15 towers feature secure double-level parking, 3 open ventilation sides, and resort-style amenities.
              </p>

              <blockquote className="border-l-4 border-gold pl-4 py-3 italic text-navy font-semibold bg-gray-50 text-sm sm:text-base">
                &ldquo;Live in a green paradise with amenities par excellence!&rdquo;
              </blockquote>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 w-full">
                <button 
                  onClick={() => openEnquiryModal("Download Project Brochure", "2 BHK")}
                  className="w-full sm:w-auto bg-[#C9A227] hover:bg-gold-light text-navy font-extrabold px-6 py-3.5 rounded-lg text-xs sm:text-sm tracking-wider uppercase shadow-md transition-all duration-300 text-center"
                >
                  Download Brochure
                </button>
                <a 
                  href="#configurations"
                  className="w-full sm:w-auto border-2 border-[#1a2744] hover:bg-[#1a2744] hover:text-white text-navy font-extrabold px-6 py-3.5 rounded-lg text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center shadow-sm text-center"
                >
                  View Configurations
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why IJM First City - Navy gradient, noise overlay */}
      <section 
        id="why-ijm" 
        className="py-24 sm:py-32 bg-gradient-to-r from-[#0f1e3d] to-[#1a2744] relative overflow-hidden text-white noise-overlay"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          
          <div className="flex flex-col items-center mb-16">
            <span className="text-[#C9A227] font-bold text-xs uppercase tracking-widest block mb-2">WHY US</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-white text-center tracking-tight leading-tight">Why Choose IJM FCP Harmony?</h2>
            <div className="w-12 h-[3px] bg-[#C9A227] mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-white/[0.03] border border-white/10 p-8 sm:p-10 rounded-lg hover:border-gold/30 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-lg bg-gold/10 border border-gold/25 flex items-center justify-center text-gold mb-6">
                <Trees size={28} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">7.5 Acres Gated Paradise</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                7.5 acres of masterplanned layouts inside a secure, fully gated premium integrated township.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/[0.03] border border-white/10 p-8 sm:p-10 rounded-lg hover:border-gold/30 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-lg bg-gold/10 border border-gold/25 flex items-center justify-center text-gold mb-6">
                <Building size={28} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Premium Infrastructure</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                6 grand residential towers built with advanced RCC Shear Wall technology (G + Podium + 15 floors).
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/[0.03] border border-white/10 p-8 sm:p-10 rounded-lg hover:border-gold/30 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-lg bg-gold/10 border border-gold/25 flex items-center justify-center text-gold mb-6">
                <Award size={28} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">100+ World-Class Amenities</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Over 100 indoor & outdoor amenities including a double-height clubhouse, Miyawaki forest, and sports courts.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white/[0.03] border border-white/10 p-8 sm:p-10 rounded-lg hover:border-gold/30 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-lg bg-gold/10 border border-gold/25 flex items-center justify-center text-gold mb-6">
                <Compass size={28} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">3-Side Open Ventilation</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Designed with open space on 3 sides to provide unmatched natural cross-ventilation and sunlight.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white/[0.03] border border-white/10 p-8 sm:p-10 rounded-lg hover:border-gold/30 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-lg bg-gold/10 border border-gold/25 flex items-center justify-center text-gold mb-6">
                <Maximize2 size={28} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Efficient Layout Designs</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Smart layout designs (849 - 1417 Sq.ft.) with zero space wastage for maximum family comfort.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-white/[0.03] border border-white/10 p-8 sm:p-10 rounded-lg hover:border-gold/30 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-lg bg-gold/10 border border-gold/25 flex items-center justify-center text-gold mb-6">
                <Shield size={28} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Investment Value</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Located in the heart of MIHAN SEZ (Nagpur&apos;s primary IT hub) with high rental yields and capital growth.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Configuration Section - Light grey bg */}
      <section id="configurations" className="py-24 sm:py-32 bg-[#f8f9fc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col items-center mb-16">
            <span className="text-[#C9A227] font-bold text-xs uppercase tracking-widest block mb-2">FLOOR CONFIGURATIONS</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-navy text-center tracking-tight leading-tight">Units, Carpet Areas & Pricing</h2>
            <div className="w-12 h-[3px] bg-[#C9A227] mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 2BHK */}
            <SpotlightCard spotlightColor="rgba(201, 162, 39, 0.12)" className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:border-gold/50 flex flex-col justify-between border-t-4 border-t-gold">
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex justify-between items-start">
                  <span className="inline-block bg-[#1a2744]/10 text-navy font-bold text-xs px-3 py-1 rounded-full uppercase">Spacious living</span>
                  <span className="text-gold font-black text-sm">₹73 Lakhs onwards*</span>
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-navy">2 BHK Apartment</h3>
                  <p className="text-gray-500 text-sm mt-1">Perfect for nuclear families</p>
                </div>
                <div className="h-px bg-gray-100 my-2"></div>
                <ul className="space-y-2.5 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-gold" />
                    <span>Carpet Area: <strong className="text-[#1a2744] text-base">849 - 912 Sq.ft.</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-gold" />
                    <span>3 Open Sides</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-gold" />
                    <span>Spacious Master Bedroom</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <button 
                  onClick={() => openEnquiryModal("Enquire: 2 BHK pricing & floor plan", "2 BHK")}
                  className="w-full bg-[#C9A227] hover:bg-gold-light text-navy font-extrabold py-3 rounded-lg text-xs tracking-wider uppercase shadow-md transition-all duration-300"
                >
                  Get Pricing Sheet
                </button>
              </div>
            </SpotlightCard>

            {/* Card 2.5BHK - Highlighted */}
            <SpotlightCard spotlightColor="rgba(201, 162, 39, 0.15)" className="bg-white rounded-lg border-2 border-gold overflow-hidden shadow-2xl relative flex flex-col justify-between transform lg:scale-[1.05] transition-all duration-300 border-t-4 border-t-gold z-10">
              <div className="absolute top-0 right-0 bg-[#C9A227] text-[#1a2744] text-[10px] font-extrabold uppercase px-4 py-1.5 tracking-wider rounded-bl-lg">
                Most Popular
              </div>
              
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex justify-between items-start">
                  <span className="inline-block bg-gold/10 text-gold font-bold text-xs px-3 py-1 rounded-full uppercase">Optimal Utility</span>
                  <span className="text-gold font-black text-sm">₹87 Lakhs onwards*</span>
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-navy">2.5 BHK Apartment</h3>
                  <p className="text-gray-500 text-sm mt-1">Includes additional study/utility room</p>
                </div>
                <div className="h-px bg-gray-100 my-2"></div>
                <ul className="space-y-2.5 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-gold" />
                    <span>Carpet Area: <strong className="text-[#1a2744] text-base">1050 - 1115 Sq.ft.</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-gold" />
                    <span>Dedicated Study/Workroom</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-gold" />
                    <span>2 Spacious Balconies</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <button 
                  onClick={() => openEnquiryModal("Enquire: 2.5 BHK pricing & floor plan", "2.5 BHK")}
                  className="w-full bg-[#C9A227] hover:bg-gold-light text-navy font-extrabold py-3 rounded-lg text-xs tracking-wider uppercase shadow-md transition-all duration-300"
                >
                  Get Pricing Sheet
                </button>
              </div>
            </SpotlightCard>

            {/* Card 3BHK */}
            <SpotlightCard spotlightColor="rgba(201, 162, 39, 0.12)" className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:border-gold/50 flex flex-col justify-between border-t-4 border-t-gold">
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex justify-between items-start">
                  <span className="inline-block bg-[#1a2744]/10 text-navy font-bold text-xs px-3 py-1 rounded-full uppercase">Ultimate Luxury</span>
                  <span className="text-gold font-black text-sm">₹1.14 Crore onwards*</span>
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-navy">3 BHK Apartment</h3>
                  <p className="text-gray-500 text-sm mt-1">Grand designs for large families</p>
                </div>
                <div className="h-px bg-gray-100 my-2"></div>
                <ul className="space-y-2.5 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-gold" />
                    <span>Carpet Area: <strong className="text-[#1a2744] text-base">1250 - 1417 Sq.ft.</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-gold" />
                    <span>3 Grand Bedrooms & Balconies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-gold" />
                    <span>Bare Kitchen Customization</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <button 
                  onClick={() => openEnquiryModal("Enquire: 3 BHK pricing & floor plan", "3 BHK")}
                  className="w-full bg-[#C9A227] hover:bg-gold-light text-navy font-extrabold py-3 rounded-lg text-xs tracking-wider uppercase shadow-md transition-all duration-300"
                >
                  Get Pricing Sheet
                </button>
              </div>
            </SpotlightCard>

          </div>

          <div className="mt-12 text-center">
            <p className="text-xs text-gray-400 italic">
              *Prices shown represent starting BSP (Basic Sale Price) and do not include statutory charges, parking, amenities fees or GST. Area is approximate RERA carpet area.
            </p>
          </div>

        </div>
      </section>

      {/* Amenities Section - White bg */}
      <section id="amenities" className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col items-center mb-16">
            <span className="text-[#C9A227] font-bold text-xs uppercase tracking-widest block mb-2">RESORT LIVING</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-navy text-center tracking-tight leading-tight">100+ Amenities Par Excellence</h2>
            <div className="w-12 h-[3px] bg-[#C9A227] mt-4 rounded-full"></div>
          </div>

          {/* Grid Layout: 2 columns on mobile, 4 columns on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Amenity 1 */}
            <div className="group relative h-40 sm:h-64 rounded-lg overflow-hidden border border-gray-100 shadow-md transition-all duration-300 hover:shadow-xl">
              <Image 
                src="/images/amenities/Swimming-Pool.png" 
                alt="Swimming Pool" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1628] via-[#0e1628]/40 to-transparent z-[2]"></div>
              <span className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 text-white font-extrabold text-xs sm:text-base tracking-wide z-[3]">Swimming Pool</span>
            </div>

            {/* Amenity 2 */}
            <div className="group relative h-40 sm:h-64 rounded-lg overflow-hidden border border-gray-100 shadow-md transition-all duration-300 hover:shadow-xl">
              <Image 
                src="/images/amenities/Multipurpose-Hall.png" 
                alt="Multipurpose Hall" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1628] via-[#0e1628]/40 to-transparent z-[2]"></div>
              <span className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 text-white font-extrabold text-xs sm:text-base tracking-wide z-[3]">Multipurpose Hall</span>
            </div>

            {/* Amenity 3 */}
            <div className="group relative h-40 sm:h-64 rounded-lg overflow-hidden border border-gray-100 shadow-md transition-all duration-300 hover:shadow-xl">
              <Image 
                src="/images/amenities/Cricket-Pitch.png" 
                alt="Cricket Pitch" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1628] via-[#0e1628]/40 to-transparent z-[2]"></div>
              <span className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 text-white font-extrabold text-xs sm:text-base tracking-wide z-[3]">Cricket Pitch</span>
            </div>

            {/* Amenity 4 */}
            <div className="group relative h-40 sm:h-64 rounded-lg overflow-hidden border border-gray-100 shadow-md transition-all duration-300 hover:shadow-xl">
              <Image 
                src="/images/amenities/Gymnasium.png" 
                alt="Gymnasium" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1628] via-[#0e1628]/40 to-transparent z-[2]"></div>
              <span className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 text-white font-extrabold text-xs sm:text-base tracking-wide z-[3]">Gymnasium</span>
            </div>

            {/* Amenity 5 */}
            <div className="group relative h-40 sm:h-64 rounded-lg overflow-hidden border border-gray-100 shadow-md transition-all duration-300 hover:shadow-xl">
              <Image 
                src="/images/amenities/Jacuzzi.png" 
                alt="Jacuzzi" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1628] via-[#0e1628]/40 to-transparent z-[2]"></div>
              <span className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 text-white font-extrabold text-xs sm:text-base tracking-wide z-[3]">Jacuzzi</span>
            </div>

            {/* Amenity 6 */}
            <div className="group relative h-40 sm:h-64 rounded-lg overflow-hidden border border-gray-100 shadow-md transition-all duration-300 hover:shadow-xl">
              <Image 
                src="/images/amenities/Squash-Court.png" 
                alt="Squash Court" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1628] via-[#0e1628]/40 to-transparent z-[2]"></div>
              <span className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 text-white font-extrabold text-xs sm:text-base tracking-wide z-[3]">Squash Court</span>
            </div>

            {/* Amenity 7 */}
            <div className="group relative h-40 sm:h-64 rounded-lg overflow-hidden border border-gray-100 shadow-md transition-all duration-300 hover:shadow-xl">
              <Image 
                src="/images/amenities/Basketball-Court.png" 
                alt="Basketball Court" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1628] via-[#0e1628]/40 to-transparent z-[2]"></div>
              <span className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 text-white font-extrabold text-xs sm:text-base tracking-wide z-[3]">Basketball Court</span>
            </div>

            {/* Amenity 8 */}
            <div className="group relative h-40 sm:h-64 rounded-lg overflow-hidden border border-gray-100 shadow-md transition-all duration-300 hover:shadow-xl">
              <Image 
                src="/images/amenities/Tennis-Court.png" 
                alt="Tennis Court" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1628] via-[#0e1628]/40 to-transparent z-[2]"></div>
              <span className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 text-white font-extrabold text-xs sm:text-base tracking-wide z-[3]">Tennis Court</span>
            </div>

          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={() => openEnquiryModal("Enquire: View full list of 100+ amenities", "2.5 BHK")}
              className="bg-[#C9A227] hover:bg-gold-light text-[#1a2744] font-extrabold px-8 py-3.5 rounded-lg text-xs sm:text-sm tracking-wider uppercase shadow-md transition-all duration-300"
            >
              Request Amenity Brochure
            </button>
          </div>

        </div>
      </section>

      {/* Master Plan - Light grey bg */}
      <section id="master-plan" className="py-24 sm:py-32 bg-[#f8f9fc] border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col items-center mb-16">
            <span className="text-[#C9A227] font-bold text-xs uppercase tracking-widest block mb-2">MASTER LAYOUT</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-navy text-center tracking-tight leading-tight">Project Master Plan</h2>
            <div className="w-12 h-[3px] bg-[#C9A227] mt-4 rounded-full"></div>
          </div>

          <div className="bg-white p-4 sm:p-8 rounded-lg shadow-xl border border-gray-200 max-w-5xl mx-auto">
            <div className="relative w-full h-[350px] sm:h-[500px] md:h-[600px] lg:h-[650px] overflow-hidden rounded-lg bg-gray-50">
              <Image 
                src="/images/master-plan.png" 
                alt="IJM First City Master Plan" 
                fill 
                className="object-contain"
                loading="lazy"
              />
            </div>
            <div className="mt-6 text-center">
              <button 
                onClick={() => openEnquiryModal("Request High-Res Master Plan", "2 BHK")}
                className="bg-[#C9A227] hover:bg-gold-light text-navy font-extrabold px-8 py-3.5 rounded-lg text-xs tracking-wider uppercase transition-all duration-300 shadow-md"
              >
                Download PDF Master Plan
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Floor Plans Section - White bg */}
      <section id="floor-plans" className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col items-center mb-16">
            <span className="text-[#C9A227] font-bold text-xs uppercase tracking-widest block mb-2">INSIDE HARMONY</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-navy text-center tracking-tight leading-tight">Typical Floor Plans</h2>
            <div className="w-12 h-[3px] bg-[#C9A227] mt-4 rounded-full"></div>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Tabs Selector */}
            <div className="flex bg-[#0f1e3d] p-1.5 rounded-lg mb-10 max-w-lg mx-auto shadow-inner border border-white/5 justify-between">
              <button 
                onClick={() => setActiveFloorTab("2bhk")}
                className={`flex-1 py-3 px-3 sm:px-6 text-xs sm:text-sm font-bold tracking-wider uppercase rounded-md transition-all duration-300 ${
                  activeFloorTab === "2bhk" 
                    ? "bg-[#C9A227] text-navy font-black shadow-md" 
                    : "text-gray-300 hover:text-white"
                }`}
              >
                2 BHK<span className="hidden sm:inline"> Plan</span>
              </button>
              <button 
                onClick={() => setActiveFloorTab("2.5bhk")}
                className={`flex-1 py-3 px-3 sm:px-6 text-xs sm:text-sm font-bold tracking-wider uppercase rounded-md transition-all duration-300 ${
                  activeFloorTab === "2.5bhk" 
                    ? "bg-[#C9A227] text-navy font-black shadow-md" 
                    : "text-gray-300 hover:text-white"
                }`}
              >
                2.5 BHK<span className="hidden sm:inline"> Plan</span>
              </button>
              <button 
                onClick={() => setActiveFloorTab("3bhk")}
                className={`flex-1 py-3 px-3 sm:px-6 text-xs sm:text-sm font-bold tracking-wider uppercase rounded-md transition-all duration-300 ${
                  activeFloorTab === "3bhk" 
                    ? "bg-[#C9A227] text-navy font-black shadow-md" 
                    : "text-gray-300 hover:text-white"
                }`}
              >
                3 BHK<span className="hidden sm:inline"> Plan</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="bg-[#f8f9fc] p-6 sm:p-10 border border-gray-200 rounded-lg shadow-lg min-h-[400px] flex flex-col lg:flex-row gap-12 items-center justify-between">
              {activeFloorTab === "2bhk" && (
                <>
                  <div className="lg:w-1/2 space-y-6">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-navy">2 BHK Typical Layout</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      A smart layout featuring a spacious living/dining area, master bedroom with attached bathroom, guest bedroom, and a private balcony.
                    </p>
                    <ul className="space-y-3 text-sm sm:text-base text-gray-600">
                      <li className="flex items-center gap-2.5">
                        <Check size={16} className="text-[#C9A227] stroke-[3]" />
                        <span>RERA Carpet Area: <strong>849 - 912 Sq.ft.</strong></span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Check size={16} className="text-[#C9A227] stroke-[3]" />
                        <span>2 Modern Bathrooms</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Check size={16} className="text-[#C9A227] stroke-[3]" />
                        <span>1 Utility Balcony</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Check size={16} className="text-[#C9A227] stroke-[3]" />
                        <span>Open ventilation on 3 sides</span>
                      </li>
                    </ul>
                    <button 
                      onClick={() => openEnquiryModal("Request 2 BHK Floor Plan details", "2 BHK")}
                      className="bg-[#C9A227] hover:bg-gold-light text-[#1a2744] font-extrabold px-6 py-3.5 rounded-lg text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-md"
                    >
                      Enquire For Cost Sheet
                    </button>
                  </div>
                  <div className="lg:w-1/2 relative w-full h-64 sm:h-[450px] bg-white rounded-lg border border-gray-150 p-4 shadow-md">
                    <Image 
                      src="/images/Typical-Floor-Plan.png" 
                      alt="2 BHK Floor Plan" 
                      fill 
                      className="object-contain"
                      loading="lazy"
                    />
                  </div>
                </>
              )}

              {activeFloorTab === "2.5bhk" && (
                <>
                  <div className="lg:w-1/2 space-y-6">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-navy">2.5 BHK Typical Layout</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      Includes a flexible half-bedroom ideal for a private office, study, or prayer room alongside standard premium living spaces.
                    </p>
                    <ul className="space-y-3 text-sm sm:text-base text-gray-600">
                      <li className="flex items-center gap-2.5">
                        <Check size={16} className="text-[#C9A227] stroke-[3]" />
                        <span>RERA Carpet Area: <strong>1050 - 1115 Sq.ft.</strong></span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Check size={16} className="text-[#C9A227] stroke-[3]" />
                        <span>2 Bathrooms + 1 Study/Workroom</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Check size={16} className="text-[#C9A227] stroke-[3]" />
                        <span>2 Standing Balconies</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Check size={16} className="text-[#C9A227] stroke-[3]" />
                        <span>Modular layout customization option</span>
                      </li>
                    </ul>
                    <button 
                      onClick={() => openEnquiryModal("Request 2.5 BHK Floor Plan details", "2.5 BHK")}
                      className="bg-[#C9A227] hover:bg-gold-light text-[#1a2744] font-extrabold px-6 py-3.5 rounded-lg text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-md"
                    >
                      Enquire For Cost Sheet
                    </button>
                  </div>
                  <div className="lg:w-1/2 relative w-full h-64 sm:h-[450px] bg-white rounded-lg border border-gray-150 p-4 shadow-md">
                    <Image 
                      src="/images/Floor-Plan.png" 
                      alt="2.5 BHK Floor Plan" 
                      fill 
                      className="object-contain"
                      loading="lazy"
                    />
                  </div>
                </>
              )}

              {activeFloorTab === "3bhk" && (
                <>
                  <div className="lg:w-1/2 space-y-6">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-navy">3 BHK Typical Layout</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      Crafted for spacious luxury with a grand foyer entrance, large modular kitchen, utility balconies, and three private bedrooms.
                    </p>
                    <ul className="space-y-3 text-sm sm:text-base text-gray-600">
                      <li className="flex items-center gap-2.5">
                        <Check size={16} className="text-[#C9A227] stroke-[3]" />
                        <span>RERA Carpet Area: <strong>1250 - 1417 Sq.ft.</strong></span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Check size={16} className="text-[#C9A227] stroke-[3]" />
                        <span>3 Grand Bathrooms</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Check size={16} className="text-[#C9A227] stroke-[3]" />
                        <span>3 Large Balconies</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Check size={16} className="text-[#C9A227] stroke-[3]" />
                        <span>Beautiful corner-facing ventilation layout</span>
                      </li>
                    </ul>
                    <button 
                      onClick={() => openEnquiryModal("Request 3 BHK Floor Plan details", "3 BHK")}
                      className="bg-[#C9A227] hover:bg-gold-light text-[#1a2744] font-extrabold px-6 py-3.5 rounded-lg text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-md"
                    >
                      Enquire For Cost Sheet
                    </button>
                  </div>
                  <div className="lg:w-1/2 relative w-full h-64 sm:h-[450px] bg-white rounded-lg border border-gray-150 p-4 shadow-md">
                    <Image 
                      src="/images/Harmony6.png" 
                      alt="3 BHK Floor Plan" 
                      fill 
                      className="object-contain"
                      loading="lazy"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Specifications Section - Light grey bg */}
      <section id="specifications" className="py-24 sm:py-32 bg-[#f8f9fc] border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col items-center mb-16">
            <span className="text-[#C9A227] font-bold text-xs uppercase tracking-widest block mb-2">QUALITY STANDARDS</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-navy text-center tracking-tight leading-tight">Construction & Finish Specifications</h2>
            <div className="w-12 h-[3px] bg-[#C9A227] mt-4 rounded-full"></div>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-lg border border-gray-200 shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-150">
              
              {/* Left Column */}
              <div className="divide-y divide-gray-100">
                <div className="p-6 sm:p-8 space-y-2">
                  <h4 className="text-sm font-bold text-gold uppercase tracking-wider">Structure & Roof</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    RCC footing and shear wall seismic-safe framework design.
                  </p>
                </div>
                <div className="p-6 sm:p-8 space-y-2">
                  <h4 className="text-sm font-bold text-gold uppercase tracking-wider">Windows</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Premium Aluminium / UPVC sliding windows with high-grade glazing.
                  </p>
                </div>
                <div className="p-6 sm:p-8 space-y-2">
                  <h4 className="text-sm font-bold text-gold uppercase tracking-wider">Doors</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    TATA PARVESH external wooden finish security main door.
                  </p>
                </div>
                <div className="p-6 sm:p-8 space-y-2">
                  <h4 className="text-sm font-bold text-gold uppercase tracking-wider">Floor Finishes</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Premium Vitrified tiles in rooms; anti-skid tiles in utility and wet areas.
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="divide-y divide-gray-100">
                <div className="p-6 sm:p-8 space-y-2">
                  <h4 className="text-sm font-bold text-gold uppercase tracking-wider">Wall Finishes</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Emulsion interior paint over wall putty; weatherproof exterior paint.
                  </p>
                </div>
                <div className="p-6 sm:p-8 space-y-2">
                  <h4 className="text-sm font-bold text-gold uppercase tracking-wider">Sanitary & Fittings</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    High-quality EWC and branded bath fittings with geyser provisions.
                  </p>
                </div>
                <div className="p-6 sm:p-8 space-y-2">
                  <h4 className="text-sm font-bold text-gold uppercase tracking-wider">Electrical Systems</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Concealed copper wiring, modular switches, and AC points in all bedrooms.
                  </p>
                </div>
                <div className="p-6 sm:p-8 space-y-2">
                  <h4 className="text-sm font-bold text-gold uppercase tracking-wider">Lifts & Security</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    High-speed passenger lifts and 24x7 gated township security system.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Connectivity Section - White bg */}
      <section id="connectivity" className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col items-center mb-16">
            <span className="text-[#C9A227] font-bold text-xs uppercase tracking-widest block mb-2">LOCATION ADVANTAGE</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-navy text-center tracking-tight leading-tight">Connectivity & Landmarks</h2>
            <div className="w-12 h-[3px] bg-[#C9A227] mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left: Landmarks List with Gold dots */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-2xl font-extrabold text-navy">Distances From First City</h3>
              
              <div className="divide-y divide-gray-150">
                <div className="py-3.5 flex justify-between items-center text-sm sm:text-base">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C9A227] shrink-0"></span>
                    <span className="font-semibold text-navy">Infosys</span>
                  </div>
                  <span className="text-gold font-bold bg-[#1a2744]/10 px-3 py-1 rounded-sm text-xs">3 Mins</span>
                </div>

                <div className="py-3.5 flex justify-between items-center text-sm sm:text-base">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C9A227] shrink-0"></span>
                    <span className="font-semibold text-navy">AIIMS</span>
                  </div>
                  <span className="text-gold font-bold bg-[#1a2744]/10 px-3 py-1 rounded-sm text-xs">5 Mins</span>
                </div>

                <div className="py-3.5 flex justify-between items-center text-sm sm:text-base">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C9A227] shrink-0"></span>
                    <span className="font-semibold text-navy">Hexaware Technologies</span>
                  </div>
                  <span className="text-gold font-bold bg-[#1a2744]/10 px-3 py-1 rounded-sm text-xs">5 Mins</span>
                </div>

                <div className="py-3.5 flex justify-between items-center text-sm sm:text-base">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C9A227] shrink-0"></span>
                    <span className="font-semibold text-navy">TCS</span>
                  </div>
                  <span className="text-gold font-bold bg-[#1a2744]/10 px-3 py-1 rounded-sm text-xs">7 Mins</span>
                </div>

                <div className="py-3.5 flex justify-between items-center text-sm sm:text-base">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C9A227] shrink-0"></span>
                    <span className="font-semibold text-navy">National Cancer Institute</span>
                  </div>
                  <span className="text-gold font-bold bg-[#1a2744]/10 px-3 py-1 rounded-sm text-xs">8 Mins</span>
                </div>

                <div className="py-3.5 flex justify-between items-center text-sm sm:text-base">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C9A227] shrink-0"></span>
                    <span className="font-semibold text-navy">HCL</span>
                  </div>
                  <span className="text-gold font-bold bg-[#1a2744]/10 px-3 py-1 rounded-sm text-xs">8 Mins</span>
                </div>

                <div className="py-3.5 flex justify-between items-center text-sm sm:text-base">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C9A227] shrink-0"></span>
                    <span className="font-semibold text-navy">Tech Mahindra</span>
                  </div>
                  <span className="text-gold font-bold bg-[#1a2744]/10 px-3 py-1 rounded-sm text-xs">10 Mins</span>
                </div>

                <div className="py-3.5 flex justify-between items-center text-sm sm:text-base">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C9A227] shrink-0"></span>
                    <span className="font-semibold text-navy">Govt. Medical College</span>
                  </div>
                  <span className="text-gold font-bold bg-[#1a2744]/10 px-3 py-1 rounded-sm text-xs">20 Mins</span>
                </div>

                <div className="py-3.5 flex justify-between items-center text-sm sm:text-base">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C9A227] shrink-0"></span>
                    <span className="font-semibold text-navy">Nagpur Intl Airport</span>
                  </div>
                  <span className="text-gold font-bold bg-[#1a2744]/10 px-3 py-1 rounded-sm text-xs">12 Mins</span>
                </div>
              </div>
            </div>

            {/* Right: Map image (Larger size) */}
            <div className="lg:col-span-7 bg-white p-4 rounded-lg shadow-xl border border-gray-200">
              <div className="relative w-full h-[350px] sm:h-[500px] overflow-hidden rounded-lg bg-gray-50 border border-gray-100">
                <Image 
                  src="/images/map.png" 
                  alt="IJM First City Location Map" 
                  fill 
                  className="object-contain"
                  loading="lazy"
                />
              </div>
              <div className="p-4 text-center bg-gray-50 rounded-lg border-t border-gray-100 mt-3">
                <a 
                  href="https://maps.app.goo.gl/cf8f6266e9755bf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-navy hover:text-gold font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-colors"
                >
                  <MapPin size={16} className="text-[#C9A227]" />
                  <span>Open In Google Maps</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* About IJM - Navy gradient, noise overlay */}
      <section id="about" className="py-24 sm:py-32 bg-gradient-to-r from-[#0f1e3d] to-[#1a2744] relative text-white noise-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Developer statistics */}
            <div className="lg:col-span-5 space-y-6 lg:pr-8">
              <div className="inline-flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-wider">
                <Award size={16} />
                <span>Developer Credibility</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">About IJM Group</h2>
              <div className="w-12 h-1 bg-gold"></div>
              
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                IJM India Infrastructure Limited (IJMII) is a key subsidiary of the Malaysian multinational conglomerate IJM Corporation Berhad.
              </p>
              
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                With over 25 years of construction expertise in India, IJMII actively shapes sustainable communities and landmark infrastructure.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                <div>
                  <span className="block text-3xl font-extrabold text-gold">25+ YRS</span>
                  <span className="block text-xs uppercase tracking-widest text-gray-400 mt-1">Experience in India</span>
                </div>
                <div>
                  <span className="block text-3xl font-extrabold text-gold">20M+ SQ.FT</span>
                  <span className="block text-xs uppercase tracking-widest text-gray-400 mt-1">Area Delivered</span>
                </div>
              </div>
            </div>

            {/* Logo and Brand copy */}
            <div className="lg:col-span-7 bg-[#151f35] p-8 rounded-lg border border-white/5 space-y-6 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-2xl"></div>
              
              <div className="flex items-center gap-4">
                <div className="w-16 h-12 bg-white p-2 rounded-sm flex items-center justify-center">
                  <Image 
                    src="/images/ijm_logo.png" 
                    alt="IJM Logo" 
                    width={64}
                    height={48}
                    className="object-contain p-2"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Nagpur Integrated Township Pvt. Ltd.</h4>
                  <p className="text-xs text-gray-400">A Special Purpose Vehicle (SPV) of IJM Group</p>
                </div>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed">
                NITPL delivers global engineering standards to Central India, building high-quality, transparently-managed residential spaces.
              </p>

              <div className="p-4 bg-navy-dark/45 border-l-2 border-gold rounded-r-lg text-xs text-gray-300">
                Decades of engineering precision and a zero-delay delivery track record make IJM First City one of the safest properties in Maharashtra.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Second Lead Form - Light grey bg */}
      <section className="py-24 sm:py-32 bg-[#f8f9fc] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="bg-white rounded-lg border border-gray-200 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
            
            {/* Sidebar CTA info */}
            <div className="md:col-span-5 bg-gradient-to-br from-[#0f1e3d] to-[#1a2744] p-8 text-white flex flex-col justify-between relative overflow-hidden noise-overlay">
              <div className="space-y-4 relative z-10">
                <span className="text-gold font-bold text-xs uppercase tracking-widest">Exclusive Access</span>
                <h3 className="text-2xl font-extrabold tracking-tight">Book a Free Site Visit Today</h3>
                <div className="w-12 h-1 bg-gold"></div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Schedule a private tour of the actual location in Mihan, inspect show apartments, and consult with our financial advisors.
                </p>
              </div>
              
              <div className="space-y-3 pt-8 relative z-10 text-xs text-gray-400 border-t border-white/10">
                <p className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-gold" />
                  <span>Free Cab Pick & Drop available</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-gold" />
                  <span>Interactive project model presentation</span>
                </p>
              </div>
            </div>

            {/* Visit Form: Rounded inputs */}
            <div className="md:col-span-7 p-8">
              <form onSubmit={handleVisitSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-navy uppercase mb-1">Full Name*</label>
                    <input 
                      type="text" 
                      required
                      value={visitForm.name}
                      onChange={(e) => setVisitForm({...visitForm, name: e.target.value})}
                      placeholder="Full Name" 
                      className={`w-full px-3 py-2 bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:border-gold text-sm text-navy`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy uppercase mb-1">Phone Number*</label>
                    <input 
                      type="tel" 
                      required
                      value={visitForm.phone}
                      onChange={(e) => setVisitForm({...visitForm, phone: e.target.value})}
                      placeholder="10-digit Mobile" 
                      className={`w-full px-3 py-2 bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:border-gold text-sm text-navy`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-navy uppercase mb-1">Email Address*</label>
                    <input 
                      type="email" 
                      required
                      value={visitForm.email}
                      onChange={(e) => setVisitForm({...visitForm, email: e.target.value})}
                      placeholder="name@domain.com" 
                      className={`w-full px-3 py-2 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:border-gold text-sm text-navy`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy uppercase mb-1">Preferred Date</label>
                    <input 
                      type="date" 
                      value={visitForm.date || ""}
                      onChange={(e) => setVisitForm({...visitForm, date: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gold text-sm text-navy"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy uppercase mb-1">BHK Selection</label>
                  <select 
                    value={visitForm.config}
                    onChange={(e) => setVisitForm({...visitForm, config: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gold text-sm text-navy"
                  >
                    <option value="2 BHK">2 BHK Apartments</option>
                    <option value="2.5 BHK">2.5 BHK Apartments</option>
                    <option value="3 BHK">3 BHK Apartments</option>
                    <option value="3.5 BHK">3.5 BHK Premium</option>
                  </select>
                </div>

                <div className="flex items-start text-[10px] sm:text-xs text-gray-500 leading-normal gap-2 pt-1">
                  <input type="checkbox" defaultChecked className="mt-0.5 border-gray-300 rounded text-gold focus:ring-gold" required />
                  <span>I authorize Nagpur Integrated Township Private Limited to call, text or whatsapp overrides DNC/NDNC.</span>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-[#C9A227] hover:bg-gold-light text-[#1a2744] font-extrabold py-3.5 rounded-lg transition-all duration-300 shadow-md uppercase tracking-wider text-xs sm:text-sm"
                >
                  Book Free Site Visit
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials Section - White bg */}
      <section className="py-24 sm:py-32 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col items-center mb-16">
            <span className="text-[#C9A227] font-bold text-xs uppercase tracking-widest block mb-2">HAPPY FAMILIES</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-navy text-center tracking-tight leading-tight">What Our Buyers Say</h2>
            <div className="w-12 h-[3px] bg-[#C9A227] mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Review 1 */}
            <div className="bg-[#f8f9fc] p-8 sm:p-10 rounded-lg border border-gray-150 relative shadow-sm">
              <div className="flex gap-1 text-[#C9A227] mb-4">
                <Star size={16} fill="#C9A227" />
                <Star size={16} fill="#C9A227" />
                <Star size={16} fill="#C9A227" />
                <Star size={16} fill="#C9A227" />
                <Star size={16} fill="#C9A227" />
              </div>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 italic">
                &ldquo;The construction quality is absolutely top-notch, and the spacing between towers offers real privacy. The gated security makes it feel extremely safe.&rdquo;
              </p>
              <div>
                <h4 className="font-bold text-navy text-sm sm:text-base">Anil Deshmukh</h4>
                <p className="text-xs text-gray-400">IT Consultant, Infosys Mihan</p>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-[#f8f9fc] p-8 sm:p-10 rounded-lg border border-gray-150 relative shadow-sm">
              <div className="flex gap-1 text-[#C9A227] mb-4">
                <Star size={16} fill="#C9A227" />
                <Star size={16} fill="#C9A227" />
                <Star size={16} fill="#C9A227" />
                <Star size={16} fill="#C9A227" />
                <Star size={16} fill="#C9A227" />
              </div>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 italic">
                &ldquo;Excellent ventilation as the flats are open on 3 sides. Being just 5 minutes from AIIMS and close to the airport is a huge advantage.&rdquo;
              </p>
              <div>
                <h4 className="font-bold text-navy text-sm sm:text-base">Priya Kulkarni</h4>
                <p className="text-xs text-gray-400">Doctor, AIIMS Nagpur</p>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-[#f8f9fc] p-8 sm:p-10 rounded-lg border border-gray-150 relative shadow-sm">
              <div className="flex gap-1 text-[#C9A227] mb-4">
                <Star size={16} fill="#C9A227" />
                <Star size={16} fill="#C9A227" />
                <Star size={16} fill="#C9A227" />
                <Star size={16} fill="#C9A227" />
                <Star size={16} fill="#C9A227" />
              </div>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 italic">
                &ldquo;IJM&apos;s corporate reputation is why we invested. The payment schemes are transparent, and possession timelines are strictly followed.&rdquo;
              </p>
              <div>
                <h4 className="font-bold text-navy text-sm sm:text-base">Ramesh Jha</h4>
                <p className="text-xs text-gray-400">Investor, Mumbai</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact + Footer Section - Navy gradient, noise overlay */}
      <footer id="contact" className="bg-gradient-to-r from-[#0c162b] to-[#12213e] text-white pt-16 pb-24 border-t border-gold/10 relative noise-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-white/10">
            
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="w-16 h-12 bg-white/10 p-2 rounded-sm flex items-center justify-center">
                <Image 
                  src="/images/footer-logo.png" 
                  alt="IJM Logo" 
                  width={64}
                  height={48}
                  className="object-contain p-2"
                />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                First City Harmony is an premium development project located in the heart of Mihan, Nagpur, designed for standard living.
              </p>
              
              <div className="space-y-4 text-sm text-gray-300">
                <div className="flex items-start gap-3">
                  <MapPin className="text-gold shrink-0 mt-1" size={18} />
                  <span>IJM First City, Sector-20, MIHAN, Nagpur, Maharashtra - 441108</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-gold shrink-0" size={18} />
                  <a href="tel:+91-9920511119" className="hover:text-gold transition-colors">+91-9920511119</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-gold shrink-0" size={18} />
                  <a href="mailto:sales@firstcitynagpur.in" className="hover:text-gold transition-colors">sales@firstcitynagpur.in</a>
                </div>
              </div>
            </div>

            {/* Center: RERA barcodes */}
            <div className="lg:col-span-3 space-y-4 text-center lg:text-left">
              <h4 className="text-sm font-bold text-gold uppercase tracking-wider">MahaRERA Registration</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Project registered under Maharashtra Real Estate Regulatory Authority. Scan codes to verify.
              </p>
              <div className="flex justify-center lg:justify-start gap-4">
                <div className="w-20 h-20 bg-white p-1 rounded-sm flex items-center justify-center">
                  <Image 
                    src="/images/barcode1.png" 
                    alt="RERA QR 1" 
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <div className="w-20 h-20 bg-white p-1 rounded-sm flex items-center justify-center">
                  <Image 
                    src="/images/barcode2.png" 
                    alt="RERA QR 2" 
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="text-xs font-bold text-gray-300">MahaRERA Reg No: P50500049468 | P50500080409</p>
            </div>

            {/* Right: Map embed */}
            <div className="lg:col-span-4 rounded-lg overflow-hidden border border-white/10 shadow-lg h-56 bg-gray-900">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.690397621467!2d79.03568347503189!3d21.04507048060831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4bf55d2d8642b%3A0xcf8f6266e9755bf!2sFirst%20City!5e0!3m2!1sen!2sin!4v1761571621443!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-80 hover:opacity-100 transition-opacity duration-300"
              ></iframe>
            </div>

          </div>

          <div className="pt-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <p>
              © Copyright 2026 <span className="text-white font-semibold">Nagpur Integrated Township Pvt. Ltd. A SPV of IJM Group of Companies.</span> All Rights Reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-gold transition-colors">Terms of Use</a>
            </div>
          </div>

          {/* Legal Disclaimer text */}
          <div className="mt-8 pt-4 border-t border-white/5 text-[10px] text-gray-500 leading-normal text-center sm:text-left">
            <p>
              Disclaimer: All information, images, pricing structure, layouts and specifications shown on this single-project landing page are sourced from reference materials and live websites of IJM First City. They are for marketing and lead generation representation purposes only. The official sales contract, developer cost sheets and verified MahaRERA files constitute the legal commitment. Standard terms and conditions apply.
            </p>
          </div>

        </div>
      </footer>

      {/* Sticky Bottom Navigation Bar for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0f1e3d] border-t border-gold/20 flex md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
        <a 
          href="tel:+919920511119"
          className="flex-1 py-3.5 flex items-center justify-center gap-2 bg-[#0f1e3d] hover:bg-[#1a2744] text-white font-extrabold text-xs uppercase tracking-wider transition-colors"
        >
          <Phone size={14} className="text-gold" />
          <span>Call Sales</span>
        </a>
        <a 
          href="https://wa.me/919920511119"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3.5 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-xs uppercase tracking-wider transition-colors"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span>WhatsApp Chat</span>
        </a>
      </div>

      {/* Large screen Floating Widgets */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex flex-col space-y-3">
        <a 
          href="https://wa.me/919920511119"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-5 py-3 rounded-full shadow-2xl transition-all duration-300 text-sm hover:scale-105 animate-pulse-green"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span>WhatsApp Chat</span>
        </a>
        <a 
          href="tel:+91-9920511119"
          className="flex items-center gap-2 bg-[#0f1e3d] hover:bg-navy text-[#C9A227] font-bold px-5 py-3 rounded-full shadow-2xl border border-gold/20 transition-all duration-300 text-sm hover:scale-105 animate-pulse-blue"
        >
          <Phone size={16} className="text-gold" />
          <span>Call Sales Agent</span>
        </a>
      </div>

      {/* Enquiry Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/80 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative bg-white w-full max-w-md rounded-lg shadow-2xl p-6 sm:p-8 border-t-4 border-gold animate-in fade-in zoom-in-95 duration-150">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-navy hover:text-gold transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-navy">{modalTitle}</h3>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">Leave your details and our relationship manager will call back in 15 mins.</p>
            </div>

            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-navy uppercase mb-1">Full Name*</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <User size={16} />
                  </span>
                  <input 
                    type="text" 
                    required
                    value={modalForm.name}
                    onChange={(e) => setModalForm({...modalForm, name: e.target.value})}
                    placeholder="John Doe" 
                    className={`w-full pl-9 pr-3 py-2 bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:border-gold text-sm text-navy`}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy uppercase mb-1">Phone Number*</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <span className="text-xs font-bold font-sans">+91</span>
                  </span>
                  <input 
                    type="tel" 
                    required
                    value={modalForm.phone}
                    onChange={(e) => setModalForm({...modalForm, phone: e.target.value})}
                    placeholder="10-digit Mobile" 
                    className={`w-full pl-12 pr-3 py-2 bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:border-gold text-sm text-navy`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy uppercase mb-1">Email Address*</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Mail size={16} />
                  </span>
                  <input 
                    type="email" 
                    required
                    value={modalForm.email}
                    onChange={(e) => setModalForm({...modalForm, email: e.target.value})}
                    placeholder="name@domain.com" 
                    className={`w-full pl-9 pr-3 py-2 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:border-gold text-sm text-navy`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy uppercase mb-1">Interested BHK</label>
                <select 
                  value={modalForm.config}
                  onChange={(e) => setModalForm({...modalForm, config: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gold text-sm text-navy"
                >
                  <option value="2 BHK">2 BHK Apartments</option>
                  <option value="2.5 BHK">2.5 BHK Apartments</option>
                  <option value="3 BHK">3 BHK Apartments</option>
                  <option value="3.5 BHK">3.5 BHK Premium</option>
                </select>
              </div>

              <div className="flex items-start text-[10px] sm:text-xs text-gray-500 leading-normal gap-2 pt-1">
                <input type="checkbox" defaultChecked className="mt-0.5 border-gray-300 rounded text-gold focus:ring-gold" required />
                <span>I authorize Nagpur Integrated Township Private Limited to contact me, overriding DNC/NDNC registration.</span>
              </div>

              <div className="flex gap-4">
                <button 
                  type="submit" 
                  className="w-full bg-[#C9A227] hover:bg-gold-light text-[#1a2744] font-extrabold py-3.5 px-4 rounded-lg transition-all duration-300 shadow-md uppercase tracking-wider text-xs sm:text-sm"
                >
                  Submit Enquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal Popup */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/85 backdrop-blur-md">
          <div className="bg-white w-full max-w-sm rounded-lg shadow-2xl p-6 sm:p-8 border-t-4 border-green-500 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-500 mx-auto mb-4">
              <CheckCircle size={36} />
            </div>
            <h3 className="text-2xl font-extrabold text-navy mb-2">Thank You!</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Our team has received your enquiry. One of our dedicated property relationship managers will contact you shortly with the customized pricing sheet and details.
            </p>
            <button 
              onClick={() => setShowSuccess(false)}
              className="w-full bg-[#1a2744] hover:bg-[#151f35] text-white font-bold py-2.5 rounded-lg transition-all duration-300 text-xs sm:text-sm tracking-widest uppercase"
            >
              Back to site
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
