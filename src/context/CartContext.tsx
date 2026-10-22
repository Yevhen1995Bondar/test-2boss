import React, { createContext, useContext, useState } from 'react';
import { Product, PRODUCTS } from '../data/products';

export type LegalTab = 'terms' | 'privacy' | 'refund' | 'impressum' | 'shipping';

export interface CartItem {
  id: string; // unique item key: `${productId}-${size}-${colorName}`
  product: Product;
  size: string;
  color: { name: string; hex: string };
  quantity: number;
  shopifyVariantId?: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    product: Product,
    size: string,
    color: { name: string; hex: string },
    quantity?: number,
    shopifyVariantId?: number
  ) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  sizeFinderOpen: boolean;
  setSizeFinderOpen: (open: boolean) => void;
  legalModalOpen: boolean;
  legalModalTab: LegalTab;
  openLegalModal: (tab?: LegalTab) => void;
  closeLegalModal: () => void;
  cartCount: number;
  subtotal: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  promoCode: string;
  setPromoCode: (code: string) => void;
  appliedDiscount: number;
  applyPromoCode: (code: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sizeFinderOpen, setSizeFinderOpen] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<LegalTab>('terms');
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const openLegalModal = (tab: LegalTab = 'terms') => {
    setLegalModalTab(tab);
    setLegalModalOpen(true);
  };

  const closeLegalModal = () => {
    setLegalModalOpen(false);
  };

  const freeShippingThreshold = 50.00;

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const rawSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const subtotal = Math.max(0, rawSubtotal * (1 - appliedDiscount));
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - rawSubtotal);

  const addToCart = (
    product: Product,
    size: string,
    color: { name: string; hex: string },
    quantity = 1,
    shopifyVariantId?: number
  ) => {
    const itemKey = `${product.id}-${size}-${color.name}`;
    setCart(prev => {
      const existing = prev.find(item => item.id === itemKey);
      if (existing) {
        return prev.map(item =>
          item.id === itemKey
            ? { ...item, quantity: item.quantity + quantity, shopifyVariantId: shopifyVariantId || item.shopifyVariantId }
            : item
        );
      }
      return [...prev, { id: itemKey, product, size, color, quantity, shopifyVariantId }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'MILKY10' || clean === 'BOSS10') {
      setAppliedDiscount(0.10); // 10% off
      return true;
    }
    if (clean === 'FREESHIP') {
      setAppliedDiscount(0.05);
      return true;
    }
    return false;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        sizeFinderOpen,
        setSizeFinderOpen,
        legalModalOpen,
        legalModalTab,
        openLegalModal,
        closeLegalModal,
        cartCount,
        subtotal,
        freeShippingThreshold,
        freeShippingRemaining,
        promoCode,
        setPromoCode,
        appliedDiscount,
        applyPromoCode
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
