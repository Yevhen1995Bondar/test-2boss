import React, { useState } from 'react';
import { BookOpen, ChevronUp, ChevronDown, CheckCircle2, DollarSign, Sparkles, Layers, Rocket, ExternalLink } from 'lucide-react';

export const ClientCoachingBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'sales' | 'architecture' | 'shopify'>('sales');

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-lg w-[calc(100vw-2rem)] sm:w-[480px]">
      <div className="bg-zinc-950 text-white rounded-2xl shadow-2xl border border-zinc-800 overflow-hidden transition-all duration-300">
        
        {/* Toggle Bar */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-3.5 px-4 flex items-center justify-between bg-zinc-900/90 hover:bg-zinc-900 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <span>Гайд: Как продавать такие сайты клиентам</span>
                <span className="text-[10px] bg-amber-500/30 text-amber-300 px-1.5 py-0.2 rounded font-mono">
                  PRO
                </span>
              </div>
              <div className="text-[11px] text-zinc-400">
                {isOpen ? 'Нажми, чтобы свернуть' : 'Разбор кейса Milky Boss & стратегия продаж'}
              </div>
            </div>
          </div>

          <div className="text-zinc-400 hover:text-white p-1">
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </div>
        </button>

        {/* Expanded Educational Content */}
        {isOpen && (
          <div className="p-4 sm:p-5 max-h-[70vh] overflow-y-auto space-y-4 text-xs text-zinc-300">
            
            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-zinc-900 rounded-lg">
              <button
                onClick={() => setActiveTab('sales')}
                className={`flex-1 py-1.5 px-2 rounded-md font-semibold transition-all ${
                  activeTab === 'sales' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
                }`}
              >
                1. Как продавать
              </button>
              <button
                onClick={() => setActiveTab('architecture')}
                className={`flex-1 py-1.5 px-2 rounded-md font-semibold transition-all ${
                  activeTab === 'architecture' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
                }`}
              >
                2. Фишки конверсии
              </button>
              <button
                onClick={() => setActiveTab('shopify')}
                className={`flex-1 py-1.5 px-2 rounded-md font-semibold transition-all ${
                  activeTab === 'shopify' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
                }`}
              >
                3. Связка с Shopify
              </button>
            </div>

            {/* Tab 1: How to sell */}
            {activeTab === 'sales' && (
              <div className="space-y-3">
                <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-2">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                    <DollarSign className="w-4 h-4" />
                    <span>Сколько стоит такая работа на рынке:</span>
                  </div>
                  <p className="text-zinc-300 leading-relaxed">
                    Полноценный кастомный промо-лендинг с интерактивным калькулятором размеров,
                    корзиной и анимациями в Европе (Германия, Австрия) продается за <strong className="text-white">€1.500 — €3.500</strong>.
                    В русскоязычном сегменте: <strong className="text-white">90.000 — 220.000 ₽</strong>.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Что говорить клиенту (Твой продающий оффер):</span>
                  </h4>
                  <ul className="space-y-1.5 text-zinc-400">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>«Обычные шаблоны Shopify имеют конверсию 1.2–2%. Мы разрабатываем лендинг под ключ с интерактивным подбором, который поднимает конверсию до 3.8–5%.»</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>«Мы решаем главную боль e-commerce одежды: страх неправильного размера. Интерактивный калькулятор снижает возвраты на 35–45%.»</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>«Скорость загрузки 99/100 Google PageSpeed благодаря чистому React & Vite без тормозящих плагинов.»</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 2: Why this works */}
            {activeTab === 'architecture' && (
              <div className="space-y-3">
                <h4 className="font-bold text-white flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ключевые элементы, которые мы внедрили:</span>
                </h4>
                <div className="space-y-2 text-zinc-300">
                  <div className="p-2.5 bg-zinc-900 rounded-lg border border-zinc-800">
                    <strong className="text-white block mb-0.5">1. Интерактивный подборщик размеров</strong>
                    Калькулятор по породам (Французский бульдог, Даксель и др.) сразу рекомендует точный размер и позволяет в 1 клик положить товар в корзину.
                  </div>
                  <div className="p-2.5 bg-zinc-900 rounded-lg border border-zinc-800">
                    <strong className="text-white block mb-0.5">2. Прогресс-бар бесплатной доставки</strong>
                    В корзине шкала наглядно показывает, сколько евро не хватает до бесплатной доставки (€50), что увеличивает средний чек (AOV).
                  </div>
                  <div className="p-2.5 bg-zinc-900 rounded-lg border border-zinc-800">
                    <strong className="text-white block mb-0.5">3. Социальное доказательство с привязкой</strong>
                    Отзывы содержат фото реальных собак, породу и купленный размер — клиент сразу узнает свою породу.
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Shopify Connection */}
            {activeTab === 'shopify' && (
              <div className="space-y-3">
                <h4 className="font-bold text-white flex items-center gap-1.5">
                  <Rocket className="w-3.5 h-3.5 text-amber-400" />
                  <span>Как этот лендинг связать с твоим Shopify milkyboss.de:</span>
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-zinc-300">
                  <li>
                    <strong className="text-white">Shopify Buy Button / Прямой чекаут:</strong> Кнопка «Zur Kasse» может перенаправлять напрямую на чекаут Shopify через URL вида <code className="text-amber-400 bg-zinc-900 px-1 py-0.5 rounded">milkyboss.de/cart/VARIANT_ID:1</code>.
                  </li>
                  <li>
                    <strong className="text-white">Shopify Storefront API:</strong> В реальном времени считывать остатки со склада Shopify и отправлять заказ прямо в панель заказов.
                  </li>
                  <li>
                    <strong className="text-white">Отдельный субдомен:</strong> Разместить этот лендинг на <code className="text-amber-400 bg-zinc-900 px-1 py-0.5 rounded">collection.milkyboss.de</code> или запустить таргетированную рекламу прямо на него!
                  </li>
                </ol>

                <div className="pt-2">
                  <a
                    href="https://milkyboss.de/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold"
                  >
                    <span>Открыть твой основной магазин milkyboss.de</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
