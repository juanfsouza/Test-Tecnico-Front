"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Shirt, Truck, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Address {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

const productData = {
  title: 'Premium T-Shirt',
  prices: {
    Small: 149.99,
    Medium: 199.99,
    Large: 249.99,
  },
  colorImages: {
    White: '/camisa_branca.jpg',
    Black: '/camisa_preta.jpg',
    Red: '/camisa_vermelha.jpg',
    Blue: '/camisa_azul.jpg',
  },
  sizes: ['Small', 'Medium', 'Large'] as const,
  colors: ['White', 'Black', 'Red', 'Blue'],
};

type Size = typeof productData.sizes[number];

export default function ProductPage() {
  const getInitialState = <T,>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue;
    const saved = localStorage.getItem(key);
    if (saved) {
      const { value, timestamp } = JSON.parse(saved);
      if (Date.now() - timestamp < 15 * 60 * 1000) {
        return value;
      }
    }
    return defaultValue;
  };

  const [mainImage, setMainImage] = useState(getInitialState('mainImage', productData.colorImages.White));
  const [selectedSize, setSelectedSize] = useState<Size>(getInitialState('selectedSize', productData.sizes[0]));
  const [selectedColor, setSelectedColor] = useState(getInitialState('selectedColor', productData.colors[0]));
  const [cep, setCep] = useState(getInitialState('cep', ''));
  const [address, setAddress] = useState<Address | null>(getInitialState('address', null));
  const [error, setError] = useState<string | null>(null);
  const [price, setPrice] = useState(productData.prices[selectedSize]);

  const saveToLocalStorage = (key: string, value: any) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify({
      value,
      timestamp: Date.now(),
    }));
  };

  useEffect(() => {
    saveToLocalStorage('mainImage', mainImage);
  }, [mainImage]);

  useEffect(() => {
    saveToLocalStorage('selectedSize', selectedSize);
    setPrice(productData.prices[selectedSize]);
  }, [selectedSize]);

  useEffect(() => {
    saveToLocalStorage('selectedColor', selectedColor);
  }, [selectedColor]);

  useEffect(() => {
    saveToLocalStorage('cep', cep);
    saveToLocalStorage('address', address);
  }, [cep, address]);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setMainImage(productData.colorImages[color as keyof typeof productData.colorImages]);
  };

  const handleSizeChange = (size: Size) => {
    setSelectedSize(size);
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCep = e.target.value.replace(/\D/g, '');
    setCep(newCep);
    if (newCep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${newCep}/json/`);
        if (response.data.erro) {
          setError('CEP not found');
          setAddress(null);
        } else {
          setAddress(response.data);
          setError(null);
        }
      } catch {
        setError('Error fetching address');
        setAddress(null);
      }
    } else {
      setAddress(null);
      setError(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
        <div className="space-y-6">
          <div className="relative w-full max-w-[500px] h-[500px] flex items-center justify-center bg-white rounded-xl shadow-md overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.div
                key={mainImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex items-center justify-center"
              >
                <Image
                  src={mainImage}
                  alt="Main product"
                  width={400}
                  height={400}
                  className="object-contain rounded-xl transition-transform duration-300 group-hover:scale-105"
                  priority
                  onError={(e) => { e.currentTarget.src = '/placeholder.jpg'; }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex justify-start gap-2">
            {productData.colors.map((color) => (
              <div key={color} className="relative w-20 h-20 flex items-center justify-center group">
                <Image
                  src={productData.colorImages[color as keyof typeof productData.colorImages]}
                  alt={`Thumbnail ${color}`}
                  width={70}
                  height={70}
                  className={`object-contain rounded-lg cursor-pointer border-2 transition-all duration-200 ${
                    selectedColor === color ? 'border-blue-600 shadow-lg' : 'border-gray-200'
                  } group-hover:scale-110`}
                  onClick={() => handleColorChange(color)}
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.jpg';
                    e.currentTarget.style.display = 'block';
                  }}
                />
                <span className="absolute top-0 left-0 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  {color}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">{productData.title}</h1>
          <motion.p
            key={price}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-semibold text-gray-700"
          >
            ${price.toFixed(2)}
          </motion.p>
          <div>
            <h3 className="text-xl font-medium text-gray-900 flex items-center gap-2">
              <Shirt className="w-5 h-5 text-blue-600" /> Size
            </h3>
            <div className="flex flex-wrap gap-3 mt-3">
              {productData.sizes.map((size) => (
                <button
                  key={size}
                  className={`px-5 py-2 rounded-md border-2 font-medium transition-all duration-200 ${
                    selectedSize === size
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                  }`}
                  onClick={() => handleSizeChange(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-medium text-gray-900 flex items-center gap-2">
              Color
            </h3>
            <div className="flex flex-wrap gap-3 mt-3">
              {productData.colors.map((color) => (
                <button
                  key={color}
                  className={`px-5 py-2 rounded-md border-2 font-medium transition-all duration-200 ${
                    selectedColor === color
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                  }`}
                  onClick={() => handleColorChange(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-medium text-gray-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-600" /> Check Delivery Availability
            </h3>
            <div className="relative mt-3">
              <input
                type="text"
                value={cep}
                onChange={handleCepChange}
                placeholder="Enter CEP (8 digits)"
                className="w-full px-4 py-3 border-2 rounded-lg bg-white text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                maxLength={8}
              />
            </div>
            {error && <p className="mt-2 text-red-500 flex items-center gap-2"><span>⚠️</span> {error}</p>}
            {address && (
              <div className="mt-3 text-gray-700 bg-gray-50 p-4 rounded-lg">
                <p>{address.logradouro}, {address.bairro}</p>
                <p>{address.localidade} - {address.uf}, {address.cep}</p>
              </div>
            )}
          </div>
          <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg">
            <ShoppingCart className="w-5 h-5" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}