import React from 'react';
import { User, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#FAF8F5] border-t border-neutral-200/80 pt-16 pb-12 px-6 text-xs text-neutral-600 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Column */}
        <div className="space-y-3 md:col-span-1">
          <h3 className="text-2xl font-extrabold tracking-tight text-neutral-900">
            Shopio<span className="text-amber-500 font-black">.</span>
          </h3>
          <p className="text-neutral-500 text-xs leading-relaxed">
            Curated marketplace for trending electronics, apparel, sneakers, modern furniture &amp; accessories.
          </p>
          <p className="text-[11px] text-neutral-400">
            Spring Boot 3 &amp; H2 In-Memory/File Database
          </p>
        </div>

        {/* Collections */}
        <div className="space-y-2">
          <h4 className="font-bold text-neutral-900 uppercase tracking-widest text-[11px]">Collections</h4>
          <ul className="space-y-1.5 text-neutral-500">
            <li><a href="#categories-section" className="hover:text-amber-600 transition">Electronics &amp; Audio</a></li>
            <li><a href="#categories-section" className="hover:text-amber-600 transition">Fashion &amp; Streetwear</a></li>
            <li><a href="#categories-section" className="hover:text-amber-600 transition">Shoes &amp; Footwear</a></li>
            <li><a href="#categories-section" className="hover:text-amber-600 transition">Furniture &amp; Home Decor</a></li>
          </ul>
        </div>

        {/* Developer Details Column */}
        <div className="space-y-2.5">
          <h4 className="font-bold text-neutral-900 uppercase tracking-widest text-[11px]">Developer Details</h4>
          <ul className="space-y-2 text-xs text-neutral-600">
            <li className="flex items-center space-x-2">
              <User size={14} className="text-amber-600 shrink-0" />
              <span>Name: <strong className="text-neutral-900 font-semibold">Muhammadh</strong></span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail size={14} className="text-amber-600 shrink-0" />
              <a href="mailto:mhmdmunas92@gmail.com" className="hover:text-amber-600 transition truncate">
                mhmdmunas92@gmail.com
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <Phone size={14} className="text-amber-600 shrink-0" />
              <a href="tel:0774271258" className="hover:text-amber-600 transition font-medium">
                0774271258
              </a>
            </li>
          </ul>
        </div>

        {/* Studio Newsletter */}
        <div className="space-y-3">
          <h4 className="font-bold text-neutral-900 uppercase tracking-widest text-[11px]">Newsletter</h4>
          <p className="text-neutral-500 text-xs">
            Receive private notifications for limited edition drops and flash deals.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white border border-neutral-200 rounded-l-full px-3 py-2 text-xs outline-none w-full focus:border-neutral-900"
            />
            <button className="bg-neutral-900 hover:bg-neutral-800 text-white px-4 rounded-r-full text-xs uppercase tracking-wider font-semibold transition cursor-pointer">
              Join
            </button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-neutral-200/80 flex flex-col sm:flex-row justify-between items-center text-[11px] text-neutral-400">
        <p>© 2026 Shopio. All rights reserved.</p>
      </div>
    </footer>
  );
}
