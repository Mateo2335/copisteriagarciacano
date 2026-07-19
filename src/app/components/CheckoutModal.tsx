"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { X, CheckCircle2, MessageSquare, CreditCard, ShoppingBag, Truck } from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart, cartTotal, clearCart } = useCart();

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [delivery, setDelivery] = useState<"pickup" | "shipping">("pickup");
  const [address, setAddress] = useState("");

  // Status state
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const totalWithShipping = cartTotal + (delivery === "shipping" ? 4.90 : 0);

  // Function to build WhatsApp link
  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Por favor completa tu nombre y teléfono.");
      return;
    }

    // Format text
    let message = `*NUEVO PEDIDO - Copistería García Cano*\n`;
    message += `====================================\n`;
    message += `👤 *Cliente:* ${name}\n`;
    message += `📞 *Teléfono:* ${phone}\n`;
    if (email) message += `📧 *Email:* ${email}\n`;
    message += `🚚 *Método:* ${delivery === "pickup" ? "Recogida en Tienda (Sabadell)" : "Envío a domicilio"}\n`;
    if (delivery === "shipping" && address) {
      message += `📍 *Dirección:* ${address}\n`;
    }
    message += `====================================\n\n`;
    message += `🛒 *Artículos:* \n`;

    cart.forEach((item, index) => {
      message += `*${index + 1}. ${item.name}* (x${item.quantity})\n`;
      message += `   💰 Precio: ${(item.unitPrice * item.quantity).toFixed(2)} € (${item.unitPrice.toFixed(2)} €/ud)\n`;

      if (item.config.print) {
        const p = item.config.print;
        message += `   📑 Formato: ${p.paperSize} | ${p.colorMode} | ${p.sides}\n`;
        message += `   🌀 Encuadernación: ${p.binding}\n`;
        message += `   📖 Páginas: ${p.pages}\n`;
      } else if (item.config.apparel) {
        const a = item.config.apparel;
        message += `   👕 Talla: ${a.size} | Color: ${a.color}\n`;
        if (a.customText) message += `   💬 Texto personalizado: "${a.customText}"\n`;
        if (a.imageFile) message += `   🖼️ Archivo subido: ${a.imageFile}\n`;
      } else if (item.config.mug) {
        const m = item.config.mug;
        message += `   ☕ Interior: ${m.innerColor}\n`;
        if (m.customText) message += `   💬 Mensaje: "${m.customText}"\n`;
        if (m.imageFile) message += `   🖼️ Foto subida: ${m.imageFile}\n`;
      } else if (item.config.photo) {
        const ph = item.config.photo;
        message += `   📸 Formato: ${ph.photoSize} | Acabado: ${ph.finish}\n`;
      } else if (item.config.article) {
        const art = item.config.article;
        message += `   🎁 Categoría: ${art.category}\n`;
        if (art.variant) message += `   ✨ Modelo/Opción: ${art.variant}\n`;
      }
      message += `\n`;
    });

    message += `------------------------------------\n`;
    if (delivery === "shipping") {
      message += `📦 Envío: 4.90 €\n`;
    }
    message += `⭐ *TOTAL DEL PEDIDO:* ${totalWithShipping.toFixed(2)} €\n`;
    message += `====================================\n\n`;
    message += `¡Hola! Acabo de configurar mi pedido en vuestra web de Sabadell. Me gustaría enviaros los archivos y coordinar el pago/entrega. ¿Me confirmáis los detalles?`;

    // Encode URL
    const encodedMessage = encodeURIComponent(message);
    const waNumber = "34649225275"; // From their actual website WhatsApp: 649 22 52 75
    const waUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(waUrl, "_blank");

    // Simulate completion
    setIsCompleted(true);
    setTimeout(() => {
      clearCart();
    }, 500);
  };

  const handleSimulatedPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || (delivery === "shipping" && !address)) {
      alert("Por favor rellena todos los campos obligatorios para la simulación.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsCompleted(true);
      setTimeout(() => {
        clearCart();
      }, 500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-600" />
            Tramitar mi Pedido
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isCompleted ? (
          /* Success Screen */
          <div className="flex-1 p-8 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <div>
              <h4 className="text-2xl font-extrabold text-slate-900">¡Pedido Enviado!</h4>
              <p className="text-slate-500 text-sm mt-2 max-w-sm mx-auto leading-relaxed">
                Hemos recibido tu configuración. Si seleccionaste WhatsApp, se habrá abierto una pestaña para enviar tu mensaje de inmediato.
              </p>
              <p className="text-xs text-blue-600 font-semibold mt-4">
                ¡Gracias por confiar en Copistería García Cano!
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
            >
              Cerrar Ventana
            </button>
          </div>
        ) : (
          /* Form Content */
          <form className="flex-1 overflow-y-auto p-6 space-y-5" onSubmit={handleWhatsAppCheckout}>
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
                Datos de Contacto
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Mateo Pérez"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Teléfono Móvil *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ej. 649225275"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Correo Electrónico (opcional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ej. mateo@ejemplo.com"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-medium"
                />
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
                Método de Entrega
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDelivery("pickup")}
                  className={`p-4 rounded-xl border text-left transition-all relative ${
                    delivery === "pickup"
                      ? "border-blue-600 bg-blue-50/20 text-blue-900 shadow-sm"
                      : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <span className="block font-bold text-xs uppercase tracking-wider text-blue-600">Recogida</span>
                  <span className="block font-black text-sm mt-1">En Tienda</span>
                  <span className="block text-[10px] text-slate-400 mt-0.5 font-medium">Sol i Padrís 95, Sabadell</span>
                  <span className="block text-[10px] text-emerald-600 mt-2 font-bold">¡Gratuito!</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDelivery("shipping")}
                  className={`p-4 rounded-xl border text-left transition-all relative ${
                    delivery === "shipping"
                      ? "border-blue-600 bg-blue-50/20 text-blue-900 shadow-sm"
                      : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <span className="block font-bold text-xs uppercase tracking-wider text-blue-600">Entrega</span>
                  <span className="block font-black text-sm mt-1">A Domicilio</span>
                  <span className="block text-[10px] text-slate-400 mt-0.5 font-medium">Envío exprés 24-48h</span>
                  <span className="block text-[10px] text-blue-600 mt-2 font-bold">+ 4,90 €</span>
                </button>
              </div>

              {delivery === "shipping" && (
                <div className="space-y-1.5 animate-fadeIn">
                  <label className="text-xs font-semibold text-slate-700">Dirección de Envío Completa *</label>
                  <textarea
                    required={delivery === "shipping"}
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Calle, Número, Piso, Código Postal, Ciudad..."
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-medium"
                  />
                </div>
              )}
            </div>

            {/* Price review */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 text-xs pt-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Suma de productos</span>
                <span className="font-semibold">{cartTotal.toFixed(2)} €</span>
              </div>
              {delivery === "shipping" && (
                <div className="flex justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" /> Envío a domicilio
                  </span>
                  <span className="font-semibold text-sky-400">+ 4,90 €</span>
                </div>
              )}
              <div className="border-t border-slate-800 pt-2 flex justify-between items-end">
                <span className="font-bold text-slate-200 text-sm">TOTAL ESTIMADO</span>
                <span className="font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">
                  {totalWithShipping.toFixed(2)} €
                </span>
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-xs font-black shadow-md shadow-emerald-500/10 transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                Pedir por WhatsApp
              </button>

              <button
                type="button"
                onClick={handleSimulatedPayment}
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-slate-900 text-white text-xs font-black hover:bg-slate-800 transition-all flex items-center justify-center gap-2 active:scale-[0.98] border border-slate-800 cursor-pointer"
              >
                {loading ? (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 shrink-0" />
                    Simular Pedido Web
                  </>
                )}
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-400 font-medium">
              Al hacer clic en WhatsApp se abrirá un chat directo precompletado con tu pedido de Sabadell.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
