"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactInfo() {
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setFormName("");
      setFormEmail("");
      setFormMsg("");
      setIsSent(false);
      alert("¡Tu mensaje ha sido enviado! Nos pondremos en contacto contigo lo antes posible.");
    }, 1500);
  };

  return (
    <section id="contacto" className="py-20 bg-slate-50 border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ¿Dónde estamos? Ven a visitarnos
          </h2>
          <p className="text-slate-500 font-medium text-base">
            Estamos ubicados en Sabadell, listos para atenderte personalmente. También puedes resolver tus dudas rellenando el formulario.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Info & Map Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card Address */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/60 shadow-sm space-y-3">
                <div className="p-2.5 w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Nuestra Dirección</h4>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    Sol i Padrís, 95<br />
                    08203 Sabadell, Barcelona
                  </p>
                </div>
              </div>

              {/* Card Contact */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/60 shadow-sm space-y-3">
                <div className="p-2.5 w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Contacto Directo</h4>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    Teléfono: 93 711 31 68<br />
                    WhatsApp: 649 22 52 75
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map Mockup */}
            <div className="relative h-72 rounded-3xl overflow-hidden border border-slate-200 bg-slate-200 shadow-sm group">
              {/* Map background grid simulation */}
              <div className="absolute inset-0 bg-sky-100 bg-[radial-gradient(#e2e8f0_2px,transparent_2px)] [background-size:16px_16px] flex items-center justify-center">
                {/* Styled fake Map lines */}
                <div className="absolute top-1/4 left-0 right-0 h-4 bg-white/60 -rotate-12"></div>
                <div className="absolute top-2/3 left-0 right-0 h-6 bg-white/60 rotate-6"></div>
                <div className="absolute top-0 bottom-0 left-1/3 w-5 bg-white/60 rotate-45"></div>
                <div className="absolute top-0 bottom-0 left-2/3 w-8 bg-white/60 -rotate-12"></div>

                {/* Nearby landmarks mock */}
                <span className="absolute top-8 left-12 text-[10px] font-bold text-slate-400 bg-white/60 px-1.5 py-0.5 rounded uppercase tracking-wider">Av. de Barberà</span>
                <span className="absolute bottom-12 right-20 text-[10px] font-bold text-slate-400 bg-white/60 px-1.5 py-0.5 rounded uppercase tracking-wider">Sol i Padrís</span>

                {/* Sabadell pinpoint marker */}
                <a
                  href="https://maps.google.com/?q=Sol+i+Padrís,+95,+08203+Sabadell"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 flex flex-col items-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                >
                  <div className="relative">
                    <div className="absolute -inset-2 bg-blue-500/20 rounded-full animate-ping"></div>
                    <div className="p-3 bg-blue-600 text-white rounded-full shadow-lg">
                      <MapPin className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-2 bg-slate-900/90 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-xl shadow-md border border-slate-800 backdrop-blur-sm whitespace-nowrap">
                    Copistería García Cano
                    <span className="block text-[8px] text-sky-400 font-semibold mt-0.5 text-center">Haz clic para abrir Mapa</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Opening hours & form column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Opening hours list */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/60 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                Horarios de Apertura
              </h3>
              <div className="text-xs space-y-2.5 font-medium text-slate-600">
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-500">Lunes a Viernes</span>
                  <span className="font-bold text-slate-800">9:00 - 13:30 | 16:30 - 20:00</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-500">Sábado</span>
                  <span className="font-bold text-slate-800">10:00 - 13:30</span>
                </div>
                <div className="flex justify-between text-rose-600 font-semibold">
                  <span>Domingo</span>
                  <span>Cerrado</span>
                </div>
              </div>
            </div>

            {/* Email form */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-850 shadow-xl space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-sky-400" />
                  Escríbenos una Consulta
                </h3>
                <p className="text-slate-400 text-[11px] mt-1">Responderemos a tus dudas directamente a tu email.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Nombre</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Ej. Mateo Pérez"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-1 focus:ring-sky-400 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Tu Email</label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="Ej. mateo@ejemplo.com"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-1 focus:ring-sky-400 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Mensaje o duda</label>
                  <textarea
                    required
                    rows={2}
                    value={formMsg}
                    onChange={(e) => setFormMsg(e.target.value)}
                    placeholder="Escribe tu consulta aquí..."
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-1 focus:ring-sky-400 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSent}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
                >
                  {isSent ? (
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 animate-bounce text-emerald-400" />
                      Enviando...
                    </span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Enviar Consulta
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
