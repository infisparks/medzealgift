"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Head from "next/head";
import ScratchCard from "@/components/ScratchCard";
import ParticleEffect from "@/components/ParticleEffect";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("number");

  const handleReveal = async () => {
    setIsRevealed(true);
    setShowAnimation(true);

    toast({
      title: "Congratulations!",
      description: "Your coupon has been revealed!",
      duration: 3000,
    });

    // Send WhatsApp message
    if (phoneNumber) {
      try {
        const response = await fetch("https://wa.medblisss.com/send-image-url", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: "99583991572",
            number: `91${phoneNumber.replace(/\s/g, "")}`,
            imageUrl: "https://raw.githubusercontent.com/infisparks/images/refs/heads/main/medzeal.jpg",
            caption: `🎉 *Congratulations!*

> You’ve unlocked an exclusive Medzeal offer.

> 🛍️ *Special Offer*
> Use coupon code *MEDZEAL20* to enjoy *40%* off on *Hair PRP* and *Face PRP* treatments.

> 📅 *Book Your Appointment*
> https://www.medzeal.in/appoinment

> 📍 *Find Us Here*
> https://maps.app.goo.gl/oj9vfKbMxM1Tf7hW7

> ⏳ *Offer Expires: 2 June 2025*

> We look forward to helping you look and feel your best!`,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to send WhatsApp message");
        }
      } catch (error) {
        console.error("Error sending WhatsApp message:", error);
        toast({
          title: "Error",
          description: "Failed to send WhatsApp message. Please try again later.",
          variant: "destructive",
          duration: 3000,
        });
      }
    } else {
      console.warn("No phone number provided in URL");
      toast({
        title: "Warning",
        description: "No phone number provided. Please include a number in the URL.",
        variant: "default",
        duration: 3000,
      });
    }
  };

  const handleUseButton = () => {
    // Navigate to the booking page
    window.location.href = "https://www.medzeal.in/appoinment/index.html?package=Hydrafacial%20Therapy";
  };

  return (
    <main className="min-h-screen bg-gradient-radial from-[#0e8db2] via-[#4cb2cf] to-[#9fdfef] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-soft-light pointer-events-none"></div>
      
      <div className="max-w-md w-full text-center z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-pulse-slow">
          Scratch to Reveal Your Coupon!
        </h1>
        
        <div className="relative mb-8">
          <ScratchCard 
            overlayImage="https://raw.githubusercontent.com/infisparks/images/refs/heads/main/gift.png"
            couponImage="https://raw.githubusercontent.com/infisparks/images/refs/heads/main/medzeal.jpg"
            onRevealed={handleReveal}
            revealThreshold={0.15} // Reveal at 15% scratched
          />
          
          {showAnimation && <ParticleEffect />}
        </div>
        
        <p 
          className={`text-white text-lg mt-4 animate-bounce-slow transition-opacity duration-500 ${isRevealed ? 'opacity-0' : 'opacity-100'}`}
        >
          Scratch the card to reveal your exclusive offer!
        </p>
        
        <div className={`transition-all duration-500 ease-out transform ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {isRevealed && (
            <Button
              onClick={handleUseButton}
              size="lg"
              className="mt-6 bg-gradient-to-br from-[#ffffff] to-[#e6f7fd] text-[#0e8db2] hover:from-[#ffffff] hover:to-[#c9f0fc] font-bold px-6 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Use Coupon Code & Book Service Online
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}