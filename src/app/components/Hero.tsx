"use client";

import React from "react";
import { ArrowRight, Printer, Sparkles, Shirt } from "lucide-react";

interface HeroProps {
  onCTASelect: (sectionId: string) => void;
}

export default function Hero({ onCTASelect }: HeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-blue-50/40 via-slate-50 to-slate-50 py-20 lg:py-24">
      {/* Decorative background paper-like glow */}
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-200/10 to-cyan-100/10 opacity-70 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border-2 border-dashed border-blue-600/35 text-blue-600 text-xs font-bold rounded-lg stitch-stamp">
              <Sparkles className="w-3.5 h-3.5" />
              Sabadell Copistería Garcia Cano — Sello de Confianza
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none font-serif-friendly">
              Impresión <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Profesional</span> y Regalos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 font-extrabold">Hechos con Cariño</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-medium">
              ¿Necesitas imprimir tus apuntes, encuadernar tus proyectos o una taza personalizada para un regalo único? En <strong>Copistería García Cano</strong> te atendemos con la eficiencia del color azul predominante de Google Stitch y la calidez del barrio de toda la vida.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <button
                onClick={() => onCTASelect("calculadoras")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/25 hover:bg-blue-700 hover:shadow-blue-700/35 active:scale-[0.98] transition-all stitch-border-white"
              >
                Calculadora & Pedidos
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onCTASelect("servicios")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-50 border-2 border-dashed border-blue-600/30 text-blue-600 font-semibold hover:bg-blue-50 active:scale-[0.98] transition-all"
              >
                Nuestros Servicios
              </button>
            </div>

            {/* Micro stats / Trust indicators */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200 max-w-md mx-auto lg:mx-0">
              <div>
                <span className="block text-2xl font-extrabold text-blue-600">100%</span>
                <span className="text-xs text-slate-500 font-medium">Atención familiar</span>
              </div>
              <div className="border-l border-slate-200 pl-4">
                <span className="block text-2xl font-extrabold text-blue-600">Al momento</span>
                <span className="text-xs text-slate-500 font-medium">Copias rápidas</span>
              </div>
              <div className="border-l border-slate-200 pl-4">
                <span className="block text-2xl font-extrabold text-blue-600">Sabadell</span>
                <span className="text-xs text-slate-500 font-medium">Sol i Padrís, 95</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Component Cards (Interactive look-alike) */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Background glowing circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-200 rounded-full blur-[80px] opacity-20"></div>

            <div className="relative w-full max-w-sm grid grid-cols-2 gap-4">
              {/* Card 1: Document Printing Mock */}
              <div className="p-5 rounded-2xl bg-white border border-blue-100 shadow-sm hover:translate-y-[-4px] transition-transform duration-300 flex flex-col justify-between h-48 bento-card stitch-border">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm leading-tight font-serif-friendly">Impresión Documentos</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-normal">Apuntes, dossiers y encuadernaciones.</p>
                </div>
                <div className="text-xs font-bold text-blue-600">Desde 0,05 € / pág</div>
              </div>

              {/* Card 2: Apparel Customizing Mock */}
              <div className="p-5 rounded-2xl bg-blue-600 text-white shadow-sm hover:translate-y-[-4px] transition-transform duration-300 flex flex-col justify-between h-48 mt-6 bento-card stitch-border-white">
                <div className="w-10 h-10 rounded-xl bg-white/15 text-cyan-200 flex items-center justify-center font-bold">
                  <Shirt className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm leading-tight font-serif-friendly">Camisetas Custom</h3>
                  <p className="text-xs text-blue-100/80 mt-1 leading-normal">Estampación de ropa y textil para grupos.</p>
                </div>
                <div className="text-xs font-bold text-cyan-200">Desde 12,50 €</div>
              </div>

              {/* Card 3: Personalized Mugs */}
              <div className="p-5 rounded-2xl bg-cyan-50 border border-cyan-100 shadow-sm hover:translate-y-[-4px] transition-transform duration-300 flex flex-col justify-between h-48 sticky-note-cyan stitch-border-cyan">
                <div className="w-10 h-10 rounded-xl bg-cyan-100/40 text-cyan-800 flex items-center justify-center font-bold">
                  <span className="text-base font-extrabold">☕</span>
                </div>
                <div>
                  <h3 className="font-bold text-cyan-950 text-sm leading-tight font-serif-friendly">Tazas de Regalo</h3>
                  <p className="text-xs text-cyan-900/70 mt-1 leading-normal">Tazas con fotos y diseños a color.</p>
                </div>
                <div className="text-xs font-bold text-cyan-700">Desde 8,90 €</div>
              </div>

              {/* Card 4: Photo Printing */}
              <div className="p-5 rounded-2xl bg-white border border-blue-100 shadow-sm hover:translate-y-[-4px] transition-transform duration-300 flex flex-col justify-between h-48 mt-6 bento-card stitch-border">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <span className="text-base font-extrabold">📸</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm leading-tight font-serif-friendly">Fotos Carnet</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-normal">Revelado e impresión al instante.</p>
                </div>
                <div className="text-xs font-bold text-blue-600">Al momento</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
