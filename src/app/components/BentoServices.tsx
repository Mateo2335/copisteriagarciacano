"use client";

import React from "react";
import { Printer, Shirt, Flame, Camera, Monitor, FileText, CheckCircle2 } from "lucide-react";

interface BentoServicesProps {
  onSelectCalculator: (calculatorType: string) => void;
}

export default function BentoServices({ onSelectCalculator }: BentoServicesProps) {
  const services = [
    {
      id: "impresion",
      title: "Copias e Impresión",
      description: "Impresión láser de alta velocidad para apuntes, dossiers, facturas o proyectos en formatos A4 y A3. B/N o color con acabados impecables.",
      icon: <Printer className="w-6 h-6" />,
      colorClass: "from-blue-500/10 to-blue-600/10 text-blue-600 border-blue-100",
      pillText: "Básico e indispensable",
      bulletPoints: ["Precios decrecientes por volumen", "Papel de 80g, 100g y cartulina de 250g", "Subida directa de PDFs y fotos"],
      actionLabel: "Abrir calculadora de folios",
      onClick: () => onSelectCalculator("documento"),
    },
    {
      id: "textil",
      title: "Personalización Textil",
      description: "Creamos camisetas, sudaderas y ropa personalizada mediante vinilo textil de alta calidad o serigrafía para eventos, peñas, empresas o regalos.",
      icon: <Shirt className="w-6 h-6" />,
      colorClass: "from-purple-500/10 to-purple-600/10 text-purple-600 border-purple-100",
      pillText: "Más vendido",
      bulletPoints: ["Estampación duradera sin límite de color", "Variedad de tallas (S a XL) y colores", "Carga tu diseño y mira una simulación"],
      actionLabel: "Diseñar mi camiseta",
      onClick: () => onSelectCalculator("camiseta"),
    },
    {
      id: "tazas",
      title: "Tazas Personalizadas",
      description: "Tazas personalizadas con tus fotos favoritas, textos ingeniosos o logos. Apta para lavavajillas y microondas.",
      icon: <Flame className="w-6 h-6" />, // Sublimation heat process
      colorClass: "from-amber-500/10 to-amber-600/10 text-amber-600 border-amber-100",
      pillText: "Regalo perfecto",
      bulletPoints: ["Interior de colores seleccionables", "Cerámica blanca AAA ultrabrillante", "Impresión 360 grados de alta definición"],
      actionLabel: "Diseñar mi taza",
      onClick: () => onSelectCalculator("taza"),
    },
    {
      id: "fotocarnet",
      title: "Fotos de Carnet y Revelado",
      description: "Servicio rápido de fotografía para DNI, Pasaporte o carnet de conducir con iluminación profesional. También revelado digital de fotos.",
      icon: <Camera className="w-6 h-6" />,
      colorClass: "from-rose-500/10 to-rose-600/10 text-rose-600 border-rose-100",
      pillText: "Al instante",
      bulletPoints: ["Cumple la normativa oficial del DNI", "Impresión en papel fotográfico premium", "Entrega física inmediata"],
      actionLabel: "Pedir copias fotográficas",
      onClick: () => onSelectCalculator("foto"),
    },
    {
      id: "computadores",
      title: "Puestos de Auto-Servicio",
      description: "Disponemos de ordenadores conectados a internet e impresoras listas para que accedas a tu correo, busques tus documentos e imprimas directamente.",
      icon: <Monitor className="w-6 h-6" />,
      colorClass: "from-emerald-500/10 to-emerald-600/10 text-emerald-600 border-emerald-100",
      pillText: "En tienda física",
      bulletPoints: ["Ordenadores modernos con suite ofimática", "Impresión directa desde la pantalla", "Asistencia de nuestro personal"],
      actionLabel: "Visítanos en Sabadell",
      onClick: () => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: "encuadernacion",
      title: "Encuadernación y Acabados",
      description: "Encuaderna tus apuntes con espirales metálicas de paso americano y tapas duras transparentes/negras. Plastificación de documentos para protección.",
      icon: <FileText className="w-6 h-6" />,
      colorClass: "from-cyan-500/10 to-cyan-600/10 text-cyan-600 border-cyan-100",
      pillText: "Calidad profesional",
      bulletPoints: ["Espiral metálica ultrarresistente", "Plastificados rígidos de alta protección", "Diferentes tamaños de tapas y grosores"],
      actionLabel: "Ver opciones de encuadernado",
      onClick: () => onSelectCalculator("documento"),
    },
  ];

  return (
    <section id="servicios" className="py-20 bg-slate-50 border-y border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Nuestros Servicios Profesionales
          </h2>
          <p className="text-slate-500 font-medium text-base sm:text-lg">
            Te ofrecemos soluciones de impresión rápidas y personalización premium. Puedes pedir presupuesto interactivo y añadir directamente al carrito.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-blue-200/50 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded-2xl bg-gradient-to-tr border ${svc.colorClass}`}>
                    {svc.icon}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                    {svc.pillText}
                  </span>
                </div>

                {/* Title & description */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                    {svc.description}
                  </p>
                </div>

                {/* Bullets */}
                <ul className="space-y-2 pt-2 border-t border-slate-100">
                  {svc.bulletPoints.map((bp, index) => (
                    <li key={index} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={svc.onClick}
                className="mt-6 w-full py-2.5 px-4 rounded-xl text-center text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white transition-all active:scale-[0.98]"
              >
                {svc.actionLabel}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
