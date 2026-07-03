import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: 'Pranam! 🙏 Welcome to Gokul Mishthan Bhandar. I am Gokul Bot, your traditional guide to the finest Desi Ghee confectioneries. How may I assist your celebration today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    { label: '📅 Track My Order', response: 'To track your sweets, please input your order number (e.g. GMB-xxxxxx) in your account panel, or check your email receipt. Most orders are prepared fresh and dispatched within 24 hours of baking!' },
    { label: '🍬 Recommend Diwali Sweets', response: 'For premium celebrations, our master Halwais highly recommend our signature "Royal Gokul Golden Gift Box" (assorted Kaju Katli, Laddus & Dry Fruit barfis) or our melt-in-mouth "Saffron Motichoor Laddus" made with 100% pure Ghee!' },
    { label: '🌾 Are sweets Eggless & Organic?', response: 'Absolutely! Every sweet crafted at Gokul Mishthan Bhandar is 100% vegetarian (eggless) and prepared under high sanitary standards. We use pure organic reduced milk (Khoya), premium nuts, and absolutely zero artificial preservatives.' },
    { label: '📦 Bulk / Wedding Inquiries', response: 'We offer custom printed boxes, coin embossings, and attractive volume discounts (up to 20% OFF) for wedding hampers and corporate bulk bookings. Please call our central bulk desk at +91 98765 43210 or email bulk@gokulsweets.com.' }
  ];

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: 'u_' + Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      // Find matching response or default
      const foundPrompt = quickPrompts.find(p => p.label === textToSend);
      const botResponseText = foundPrompt 
        ? foundPrompt.response
        : "Thank you for writing to us. Your query is very important. To assist you with customized bookings, bulk rates, or custom sugar-free orders, our sweet master Halwai will connect with you shortly on your registered email/phone! Pranam!";

      const botMsg: ChatMessage = {
        id: 'b_' + Date.now(),
        sender: 'bot',
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start no-print">
      
      {/* 1. FLOATING CHAT BALLOON ICON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-maroon-700 hover:bg-maroon-800 dark:bg-gold-500 dark:hover:bg-gold-600 text-gold-100 dark:text-maroon-900 rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 relative group border border-gold-500/30 cursor-pointer animate-pulse"
          title="Chat with Gokul Bot"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute top-0 right-0 h-3.5 w-3.5 bg-green-500 border-2 border-cream-100 rounded-full" />
          
          {/* Tooltip bubble on hover */}
          <div className="absolute left-16 bg-neutral-900 text-white text-[10px] font-bold py-1 px-2.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Pranam! Ask Gokul Bot 🙏
          </div>
        </button>
      )}

      {/* 2. CHAT WIDGET PANEL CONTAINER */}
      {isOpen && (
        <div className="w-[330px] sm:w-[360px] h-[480px] bg-cream-50 dark:bg-neutral-900 border border-cream-300 dark:border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scale-up">
          
          {/* Panel Header */}
          <div className="p-3.5 bg-maroon-700 dark:bg-neutral-950 text-gold-200 border-b border-gold-500 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cream-100 dark:bg-neutral-900 border border-gold-500/40 flex items-center justify-center font-bold text-sm">
                🍬
              </div>
              <div className="leading-tight">
                <span className="font-serif text-sm font-bold tracking-wide block text-white flex items-center gap-1">
                  Gokul Bot <Sparkles className="h-3 w-3 text-gold-400 animate-spin" style={{ animationDuration: '4s' }} />
                </span>
                <span className="text-[10px] text-green-400 font-semibold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-ping" />
                  Halwai Assistant Online
                </span>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-maroon-800 dark:hover:bg-neutral-900 rounded-full transition-colors text-gold-300 hover:text-white cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Panel Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col scrollbar-thin scrollbar-thumb-maroon-200">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[85%] text-xs p-3 rounded-2xl space-y-1 ${
                  msg.sender === 'bot'
                    ? 'bg-white dark:bg-neutral-950 border border-cream-300 dark:border-neutral-850 self-start rounded-tl-none text-neutral-800 dark:text-cream-100'
                    : 'bg-maroon-700 dark:bg-gold-500 text-gold-100 dark:text-maroon-950 self-end rounded-tr-none font-medium'
                }`}
              >
                <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                <span className={`text-[9px] block text-right font-medium opacity-60 ${msg.sender === 'bot' ? 'text-neutral-400' : 'text-cream-200 dark:text-maroon-900'}`}>
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="bg-white dark:bg-neutral-950 border border-cream-300 dark:border-neutral-850 p-3 rounded-2xl rounded-tl-none self-start flex items-center gap-1.5 text-xs text-neutral-400">
                <Loader className="h-3.5 w-3.5 animate-spin" />
                <span>Mascot typing...</span>
              </div>
            )}
          </div>

          {/* Panel Quick suggestions list */}
          <div className="p-2.5 bg-cream-100 dark:bg-neutral-950/50 border-t border-cream-300 dark:border-neutral-850 space-y-1">
            <span className="text-[9px] text-neutral-400 uppercase font-black block">Quick Traditional Inquiries</span>
            <div className="flex flex-wrap gap-1">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p.label)}
                  disabled={isTyping}
                  className="text-[10px] px-2 py-1 bg-white dark:bg-neutral-900 hover:bg-maroon-50 hover:border-maroon-700 dark:hover:bg-neutral-850 border border-cream-300 dark:border-neutral-800 text-neutral-700 dark:text-cream-100 rounded-full transition-all cursor-pointer font-medium"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Panel Input text bar */}
          <div className="p-3 border-t border-cream-300 dark:border-neutral-850 bg-white dark:bg-neutral-900 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
              disabled={isTyping}
              placeholder="Ask about sweets, orders, bulk..."
              className="flex-1 text-xs px-3 py-2 border border-cream-300 dark:border-neutral-800 bg-cream-50 dark:bg-neutral-950 text-neutral-800 dark:text-cream-100 rounded-lg focus:outline-none"
            />
            <button
              onClick={() => handleSendMessage(inputText)}
              disabled={isTyping || !inputText.trim()}
              className="p-2 bg-maroon-700 hover:bg-maroon-800 dark:bg-gold-500 dark:hover:bg-gold-600 text-gold-100 dark:text-maroon-900 rounded-lg transition-colors cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
