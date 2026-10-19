"use client";

import { useEffect, useRef } from "react";
import { EVENT_CONFIG } from "@/config/event";

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RsvpModal({ isOpen, onClose }: RsvpModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hasConfiguredUrl = Boolean(EVENT_CONFIG.rsvpUrl && EVENT_CONFIG.rsvpUrl.trim().length > 0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rsvp-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="w-full max-w-lg bg-[#0E1116] border border-[#2D3644] text-[#EDE8DF] shadow-2xl relative overflow-hidden"
      >
        {/* Accent top border */}
        <div className="h-1 bg-gradient-to-r from-[#F37021] via-[#F59E0B] to-[#F37021]" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#212732] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 bg-[#F37021]" />
            <h3
              id="rsvp-modal-title"
              className="text-base sm:text-lg font-bold uppercase tracking-wider font-oswald text-white"
            >
              MISSION BRIEFING // RSVP PROTOCOL
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-[#8D9AA8] hover:text-white hover:bg-[#1A202A] transition-colors focus:outline-none focus:ring-1 focus:ring-[#F37021]"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 space-y-4 text-sm text-[#B2BFCB] font-space leading-relaxed">
          <div className="bg-[#141820] border-l-2 border-[#F37021] p-3 text-xs font-mono">
            <div className="text-[#F37021] font-bold">OFFICIAL DEADLINE:</div>
            <div className="text-white text-sm font-bold mt-0.5">
              {EVENT_CONFIG.rsvpDeadline} · 23:59 IST
            </div>
            <div className="text-[#8B98A6] mt-1">
              Venue: {EVENT_CONFIG.venue}
            </div>
          </div>

          {hasConfiguredUrl ? (
            <div className="space-y-3">
              <p>
                The official RSVP confirmation portal is ready. Please click below
                to proceed to the registered form and confirm your squad attendance.
              </p>
              <a
                href={EVENT_CONFIG.rsvpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#F37021] hover:bg-[#FF8400] text-black font-mono font-bold tracking-wider uppercase transition-colors"
              >
                <span>OPEN OFFICIAL RSVP PORTAL</span>
                <span>↗</span>
              </a>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-wider text-[#A2AEBD] font-mono font-bold">
                RSVP STATUS & INSTRUCTIONS:
              </div>
              <ol className="space-y-2 list-decimal list-inside text-xs sm:text-sm">
                <li>
                  <strong className="text-white">Verify Team Status:</strong> Confirm
                  your squad is listed in the shortlisted directory below.
                </li>
                <li>
                  <strong className="text-white">Leader Verification:</strong> Only the
                  designated Team Leader is required to complete final attendance
                  confirmation.
                </li>
                <li>
                  <strong className="text-white">Form Activation:</strong> Direct RSVP
                  submission link will be dispatched to registered leader emails and
                  published on the official event channel.
                </li>
              </ol>

              <div className="p-3 bg-[#11141A] border border-[#232A35] text-[11px] font-mono text-[#818E9E]">
                Note for organizers: Configure the live destination URL in{" "}
                <code className="text-[#F59E0B]">src/config/event.ts</code> or via{" "}
                <code className="text-[#F59E0B]">NEXT_PUBLIC_RSVP_URL</code>.
              </div>
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#212732]">
            <a
              href={EVENT_CONFIG.officialWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#8E9CAE] hover:text-[#F37021] transition-colors underline underline-offset-4"
            >
              VISIT OFFICIAL EVENT PORTAL ↗
            </a>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 bg-[#1B212B] hover:bg-[#252E3B] text-xs font-mono uppercase tracking-wider text-white border border-[#303A48] transition-colors"
            >
              RETURN TO SHORTLIST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
