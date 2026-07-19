"use client";

import React from "react";
import { useCart } from "../context/CartContext";
import { X, Trash2, ShoppingCart, Plus, Minus, FileText } from "lucide-react";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCheckout: () => void;
}

export default function CartModal({ isOpen, onClose, onOpenCheckout }: CartModalProps) {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 bg-slate-50 border-b border-slate-150 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
              Tu Carrito de Pedido
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3">
                <div className="p-4 bg-slate-50 rounded-full text-slate-400">
                  <ShoppingCart className="w-10 h-10" />
                </div>
                <div>
                  <p className="font-bold text-slate-700">El carrito está vacío</p>
                  <p className="text-xs text-slate-400 mt-1">Configura un producto y añádelo para empezar.</p>
                </div>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between gap-3 shadow-sm hover:border-slate-200 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 leading-tight">{item.name}</h3>
                      {/* Configuration description text */}
                      <div className="text-[11px] text-slate-500 mt-1 space-y-0.5">
                        {item.type === "documento" && item.config.print && (
                          <>
                            <p>📑 {item.config.print.paperSize} | {item.config.print.colorMode} | {item.config.print.sides}</p>
                            <p>🌀 Encuadernación: {item.config.print.binding}</p>
                            <p>📖 Páginas por dossier: {item.config.print.pages}</p>
                          </>
                        )}
                        {item.type === "camiseta" && item.config.apparel && (
                          <>
                            <p>👕 Talla: {item.config.apparel.size} | Color: {item.config.apparel.color}</p>
                            {item.config.apparel.customText && (
                              <p className="italic font-medium">💬 Text: &quot;{item.config.apparel.customText}&quot;</p>
                            )}
                            {item.config.apparel.imageFile && (
                              <p>🖼️ Logo: {item.config.apparel.imageFile}</p>
                            )}
                          </>
                        )}
                        {item.type === "taza" && item.config.mug && (
                          <>
                            <p>☕ Taza Personalizada | Color Interior: {item.config.mug.innerColor}</p>
                            {item.config.mug.customText && (
                              <p className="italic font-medium">💬 Frase: &quot;{item.config.mug.customText}&quot;</p>
                            )}
                            {item.config.mug.imageFile && (
                              <p>🖼️ Foto: {item.config.mug.imageFile}</p>
                            )}
                          </>
                        )}
                        {item.type === "foto" && item.config.photo && (
                          <>
                            <p>📸 Formato: {item.config.photo.photoSize} | Acabado: {item.config.photo.finish}</p>
                          </>
                        )}
                        {item.type === "articulo" && item.config.article && (
                          <>
                            <p>🎁 Categoría: {item.config.article.category}</p>
                            {item.config.article.variant && (
                              <p>✨ Modelo/Opción: {item.config.article.variant}</p>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 rounded text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                      title="Eliminar producto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quantity and Price row */}
                  <div className="flex items-center justify-between border-t border-slate-100 pt-2.5">
                    <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-slate-500 hover:bg-slate-50 font-extrabold text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 py-0.5 text-xs font-bold text-slate-800">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-slate-500 hover:bg-slate-50 font-extrabold text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-slate-400 block font-medium">({item.unitPrice.toFixed(2)} €/ud)</span>
                      <span className="font-bold text-slate-900 text-sm">
                        {(item.unitPrice * item.quantity).toFixed(2)} €
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer panel */}
          {cart.length > 0 && (
            <div className="border-t border-slate-100 px-6 py-5 bg-slate-50 space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-xs uppercase tracking-wider font-extrabold text-slate-400">Total Pedido</span>
                <span className="text-2xl font-black text-slate-900">{cartTotal.toFixed(2)} €</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={clearCart}
                  className="w-full py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-all active:scale-[0.98]"
                >
                  Vaciar Carrito
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onOpenCheckout();
                  }}
                  className="w-full py-3 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-500/10 hover:bg-blue-700 transition-all active:scale-[0.98] flex items-center justify-center gap-1"
                >
                  <FileText className="w-4 h-4" />
                  Realizar Pedido
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
