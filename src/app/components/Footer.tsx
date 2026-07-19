"use client";

import React from "react";
import { Phone, Clock, MapPin, Heart } from "lucide-react";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate("hero")}>
              <div className="bg-gradient-to-tr from-blue-600 to-cyan-500 p-2 rounded-xl shadow-md text-white font-black text-xl flex items-center justify-center w-10 h-10">
                G
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase leading-none">Copistería</span>
                <span className="text-base font-bold text-slate-100 leading-none">García Cano</span>
              </div>
            </div>
            <p className="text-xs leading-relaxed max-w-sm">
              Somos un negocio familiar en Sabadell comprometidos con la máxima calidad de impresión y personalización. Cuidamos cada detalle para ofrecerte tazas, prendas y folios perfectos.
            </p>
          </div>

          {/* Quick links Col */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold text-slate-200 uppercase tracking-widest text-xs">Enlaces Rápidos</h4>
            <ul className="text-xs space-y-2 font-semibold">
              <li>
                <button onClick={() => onNavigate("servicios")} className="hover:text-white transition-colors">Nuestros Servicios</button>
              </li>
              <li>
                <button onClick={() => onNavigate("calculadoras")} className="hover:text-white transition-colors">Calculadoras e Impresión</button>
              </li>
              <li>
                <button onClick={() => onNavigate("nosotros")} className="hover:text-white transition-colors">Sobre Nosotros</button>
              </li>
              <li>
                <button onClick={() => onNavigate("contacto")} className="hover:text-white transition-colors">Contacto y Horarios</button>
              </li>
            </ul>
          </div>

          {/* Contact info Col */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-extrabold text-slate-200 uppercase tracking-widest text-xs">Ubicación y Contacto</h4>
            <ul className="text-xs space-y-2.5">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>Sol i Padrís, 95 - 08203 Sabadell, Barcelona</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>93 711 31 68 | Whatsapp: 649 22 52 75</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                <span>L-V: 9-13:30, 16:30-20 | Sab: 10-13:30</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Micro Copyright Bar */}
        <div className="border-t border-slate-900 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 gap-4">
          <span>&copy; {new Date().getFullYear()} Copistería García Cano. Todos los derechos reservados.</span>
          <span className="flex items-center gap-1">
            Creado con <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> en Sabadell
          </span>
        </div>
      </div>
    </footer>
  );
}
