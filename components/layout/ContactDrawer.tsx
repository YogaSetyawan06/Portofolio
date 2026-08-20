"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Loader2,
  Github,
  Linkedin,
  Instagram,
  Twitter,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/data/socials";

const contactSchema = z.object({
  name: z.string().min(2, "Required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Min 10 characters"),
  website: z.string().optional(), // Honeypot field
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactDrawer({ isOpen, onClose }: ContactDrawerProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  // Body scroll lock mechanism
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const onSubmit = async (data: ContactFormValues) => {
    // 1. Honeypot check (Bots often fill hidden fields)
    if (data.website) {
      console.warn("Spam detected!");
      toast.success("Thank you! Your message has been sent."); // Fake success
      reset();
      onClose();
      return;
    }

    // 2. Cooldown check (Anti-spam rate limit)
    const lastSentTime = localStorage.getItem("lastContactSent");
    if (lastSentTime) {
      const timePassed = Date.now() - parseInt(lastSentTime, 10);
      const cooldownPeriod = 5 * 60 * 1000; // 5 minutes
      if (timePassed < cooldownPeriod) {
        const minutesLeft = Math.ceil((cooldownPeriod - timePassed) / 60000);
        toast.error(
          `Please wait ${minutesLeft} minute(s) before sending another message.`,
        );
        return;
      }
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    try {
      // Fallback mode if credentials are empty
      if (!serviceId || !templateId || !publicKey) {
        console.warn("EmailJS credentials missing, using fallback mode.");
        await new Promise((resolve) => setTimeout(resolve, 1500));
        toast.success("Message sent successfully! (Fallback mode)");
        reset();
        onClose();
        return;
      }

      // Real EmailJS execution
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: data.name,
          email: data.email,
          message: data.message,
          title: "Pesan Baru dari Portfolio",
          time: new Date().toLocaleString("id-ID"),
        },
        publicKey,
      );

      toast.success("Thank you! Your message has been sent.");
      localStorage.setItem("lastContactSent", Date.now().toString()); // Set cooldown timer
      reset();
      onClose();
    } catch (error) {
      console.error("Failed to send email:", error);
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-[500px] bg-white shadow-2xl flex flex-col overflow-y-auto"
          >
            {/* Header Area */}
            <div className="relative p-8 pb-6">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close Contact Form"
              >
                <X size={20} className="text-gray-900" />
              </button>

              <h2 className="text-[32px] leading-tight font-bold text-black mb-1">
                Request a quote
              </h2>
              <p className="text-gray-600 text-sm">
                Fill out the form below for{" "}
                <span className="font-semibold text-black">
                  sending a message.
                </span>
              </p>

              {/* Profile Card */}
              <div className="flex items-center gap-3 mt-6">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200">
                  <Image
                    src="/images/profile.png"
                    alt="Yoga Setyawan"
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    Yoga Setyawan
                  </h3>
                  <p className="text-gray-600 text-sm">
                    setiawanyoga212@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="px-8 pb-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Honeypot field (hidden from users) */}
                <input
                  type="text"
                  {...register("website")}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* 2-Column Name & Email */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register("name")}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 bg-white border rounded-xl text-sm focus:outline-none focus:ring-1 transition-all disabled:opacity-50 ${
                        errors.name
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-200 focus:border-black focus:ring-black"
                      }`}
                      placeholder="Name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 bg-white border rounded-xl text-sm focus:outline-none focus:ring-1 transition-all disabled:opacity-50 ${
                        errors.email
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-200 focus:border-black focus:ring-black"
                      }`}
                      placeholder="Email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Send a message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register("message")}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 bg-white border rounded-xl text-sm focus:outline-none focus:ring-1 transition-all resize-none disabled:opacity-50 ${
                      errors.message
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-200 focus:border-black focus:ring-black"
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Social Media Links */}
                <div>
                  <p className="block text-sm font-semibold text-gray-900 mb-3">
                    My Social Media
                  </p>
                  <div className="flex items-center gap-4">
                   {SOCIAL_LINKS.map((social) => {
                      const getIcon = () => {
                        switch (social.icon.toLowerCase()) {
                          case "linkedin": return <Linkedin size={18} />;
                          case "github": return <Github size={18} />;
                          case "instagram": return <Instagram size={18} />;
                          case "twitter": return <Twitter size={18} />;
                          default: return null;
                        }
                      };
                      return (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 bg-gray-50 text-gray-600 rounded-full hover:bg-black hover:text-white transition-colors flex items-center justify-center"
                          aria-label={social.name}
                        >
                          {getIcon()}
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)]"
                  >
                    {isSubmitting ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
