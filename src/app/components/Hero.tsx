"use client";

import React from "react";
import { ArrowRight, Printer, Sparkles, Shirt } from "lucide-react";

interface HeroProps {
  onCTASelect: (sectionId: string) => void;
}

export default function Hero({ onCTASelect }: HeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-amber-50/40 via-[#faf6ef] to-[#faf6ef] py-20 lg:py-24">
      {/* Decorative background paper-like glow */}
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-200/10 to-orange-100/10 opacity-70 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#fcf9f2] border-2 border-dashed border-[#8d6e63]/45 text-[#8d6e63] text-xs font-bold rounded-lg stitch-stamp">
              <Sparkles className="w-3.5 h-3.5" />
              Copistería familiar en Sabadell desde hace años
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#2d241e] tracking-tight leading-none font-serif-friendly">
              Impresión <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8d6e63] to-amber-700">Artesana</span> y Regalos <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8d6e63] to-amber-700 font-extrabold">Hechos con Cariño</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-medium">
              ¿Necesitas imprimir tus apuntes, encuadernar tus proyectos o una taza personalizada para un regalo único? En <strong>Copistería García Cano</strong> te atendemos con la paciencia, el detalle y la cercanía de la tienda de barrio de toda la vida.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <button
                onClick={() => onCTASelect("calculadoras")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#8d6e63] text-white font-semibold shadow-lg shadow-[#8d6e63]/25 hover:bg-[#795548] hover:shadow-[#795548]/35 active:scale-[0.98] transition-all stitch-border-white"
              >
                Calculadora & Pedidos
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onCTASelect("servicios")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#fbf7f0] border-2 border-dashed border-[#8d6e63]/30 text-[#8d6e63] font-semibold hover:bg-[#f5ede1] active:scale-[0.98] transition-all"
              >
                Nuestros Servicios
              </button>
            </div>

            {/* Micro stats / Trust indicators */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#8d6e63]/10 max-w-md mx-auto lg:mx-0">
              <div>
                <span className="block text-2xl font-extrabold text-[#8d6e63]">100%</span>
                <span className="text-xs text-slate-500 font-medium">Atención familiar</span>
              </div>
              <div className="border-l border-[#8d6e63]/15 pl-4">
                <span className="block text-2xl font-extrabold text-[#8d6e63]">Al momento</span>
                <span className="text-xs text-slate-500 font-medium">Copias rápidas</span>
              </div>
              <div className="border-l border-[#8d6e63]/15 pl-4">
                <span className="block text-2xl font-extrabold text-[#8d6e63]">Sabadell</span>
                <span className="text-xs text-slate-500 font-medium">Sol i Padrís, 95</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Component Cards (Interactive look-alike) */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Background glowing circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-200 rounded-full blur-[80px] opacity-20"></div>

            <div className="relative w-full max-w-sm grid grid-cols-2 gap-4">
              {/* Card 1: Document Printing Mock */}
              <div className="p-5 rounded-3xl bg-white border border-[#8d6e63]/15 shadow-md shadow-slate-100/50 hover:translate-y-[-4px] transition-transform duration-300 flex flex-col justify-between h-48 stitch-border">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#8d6e63] flex items-center justify-center font-bold">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#2d241e] text-sm leading-tight">Impresión Documentos</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-normal">Apuntes, dossiers y encuadernaciones.</p>
                </div>
                <div className="text-xs font-bold text-[#8d6e63]">Desde 0,05 € / pág</div>
              </div>

              {/* Card 2: Apparel Customizing Mock */}
              <div className="p-5 rounded-3xl bg-[#8d6e63] text-white shadow-md hover:translate-y-[-4px] transition-transform duration-300 flex flex-col justify-between h-48 mt-6 stitch-border-white">
                <div className="w-10 h-10 rounded-2xl bg-white/15 text-amber-200 flex items-center justify-center font-bold">
                  <Shirt className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm leading-tight">Camisetas Custom</h3>
                  <p className="text-xs text-amber-100/80 mt-1 leading-normal">Estampación de ropa y textil para grupos.</p>
                </div>
                <div className="text-xs font-bold text-amber-200">Desde 12,50 €</div>
              </div>

              {/* Card 3: Personalized Mugs */}
              <div className="p-5 rounded-3xl bg-[#fffef4] border border-[#8d6e63]/15 shadow-md hover:translate-y-[-4px] transition-transform duration-300 flex flex-col justify-between h-48 sticky-note stitch-border">
                <div className="w-10 h-10 rounded-2xl bg-amber-100/40 text-amber-800 flex items-center justify-center font-bold">
                  <span className="text-base font-extrabold">☕</span>
                </div>
                <div>
                  <h3 className="font-bold text-amber-950 text-sm leading-tight">Tazas de Regalo</h3>
                  <p className="text-xs text-amber-900/70 mt-1 leading-normal">Tazas con fotos y diseños a color.</p>
                </div>
                <div className="text-xs font-bold text-amber-800">Desde 8,90 €</div>
              </div>

              {/* Card 4: Photo Printing */}
              <div className="p-5 rounded-3xl bg-white border border-[#8d6e63]/15 shadow-md shadow-slate-100/50 hover:translate-y-[-4px] transition-transform duration-300 flex flex-col justify-between h-48 mt-6 stitch-border">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <span className="text-base font-extrabold">📸</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#2d241e] text-sm leading-tight">Fotos Carnet</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-normal">Revelado e impresión al instante.</p>
                </div>
                <div className="text-xs font-bold text-amber-700 font-extrabold">Al momento</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
