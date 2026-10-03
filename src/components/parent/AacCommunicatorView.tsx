import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Volume2,
  Sparkles,
  CheckCircle2,
  Circle,
  Clock,
  Heart,
  Smile,
  ShieldCheck,
  MessageSquare,
  RefreshCw,
  Send,
} from 'lucide-react';
import { AacPictoSymbol } from '../../types';

export const AacCommunicatorView: React.FC = () => {
  const {
    language,
    aacPictoSymbols,
    childDayTimeline,
    toggleTimelineItem,
    playPictoVoice,
    childProfile,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [sentenceBuilder, setSentenceBuilder] = useState<AacPictoSymbol[]>([]);

  const isNl = language === 'nl';

  const categories = [
    { key: 'ALL', labelNl: 'Alle Pictogrammen', labelEn: 'All Symbols' },
    { key: 'BASISBEHOEFTEN', labelNl: 'Basisbehoeften', labelEn: 'Basic Needs' },
    { key: 'PIJN_MEDISCH', labelNl: 'Pijn & Medisch', labelEn: 'Pain & Medical' },
    { key: 'ACTIVITEITEN', labelNl: 'Activiteiten', labelEn: 'Activities' },
    { key: 'EMOTIES', labelNl: 'Emoties & Gevoel', labelEn: 'Emotions & Mood' },
    { key: 'SONDE_EPILEPSIE', labelNl: 'Sonde & Zorg', labelEn: 'G-Tube & Care' },
  ];

  const filteredSymbols = selectedCategory === 'ALL'
    ? aacPictoSymbols
    : aacPictoSymbols.filter((s) => s.category === selectedCategory);

  const handlePictoClick = (picto: AacPictoSymbol) => {
    playPictoVoice(picto);
    setSentenceBuilder((prev) => [...prev, picto]);
  };

  const handleSpeakSentence = () => {
    if (sentenceBuilder.length === 0) return;
    const fullText = sentenceBuilder
      .map((p) => (isNl ? p.audioSpokenTextNl : p.audioSpokenTextEn))
      .join(' ');

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.lang = isNl ? 'nl-NL' : 'en-US';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const clearSentence = () => {
    setSentenceBuilder([]);
  };

  return (
    <div className="space-y-6" id="aac-communicator-view">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300">
                AAC Sclera / Tobii Dynavox Bridge
              </span>
              <span className="flex items-center space-x-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>Stem van het Kind</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
              {isNl ? 'Interactief AAC Pictogrammenbord & "Mijn Dag in Beeld"' : 'Interactive AAC Pictogram Board & "My Day in Pictures"'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1 leading-relaxed">
              {isNl
                ? `Lars (7 jr) communiceert via dit bord direct zijn behoeften, pijnklachten en emoties aan invallende verpleegkundigen en ouders met gesproken stem.`
                : `Lars (7 yrs) directly communicates his needs, pain points, and emotions to substitute caregivers and parents with natural voice output.`}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl px-3.5 py-2 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Eye-Gaze / Touch</div>
              <div className="text-xs font-black text-emerald-400 flex items-center justify-center space-x-1 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>Gekalibreerd</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sentence Builder Box */}
      <div className="bg-slate-900/90 border-2 border-indigo-500/40 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-black uppercase tracking-wider text-indigo-300">
              {isNl ? 'Zinbouwer (Lars Spreekt)' : 'Sentence Builder (Lars Speaks)'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {sentenceBuilder.length > 0 && (
              <button
                id="btn-clear-sentence"
                onClick={clearSentence}
                className="px-2.5 py-1 text-[11px] font-bold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-all flex items-center space-x-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{isNl ? 'Wissen' : 'Clear'}</span>
              </button>
            )}
            <button
              id="btn-speak-sentence"
              onClick={handleSpeakSentence}
              disabled={sentenceBuilder.length === 0}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center space-x-2 shadow-md transition-all ${
                sentenceBuilder.length > 0
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:brightness-110'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>{isNl ? 'Spreek Hardop Uit' : 'Speak Out Loud'}</span>
            </button>
          </div>
        </div>

        <div className="min-h-[52px] bg-slate-950/80 rounded-xl p-2.5 flex flex-wrap items-center gap-2 border border-slate-800/80">
          {sentenceBuilder.length === 0 ? (
            <p className="text-xs text-slate-500 italic">
              {isNl
                ? 'Klik op een pictogram hieronder om Lars te laten spreken...'
                : 'Click any pictogram below to build Lars’s message...'}
            </p>
          ) : (
            sentenceBuilder.map((sym, idx) => (
              <span
                key={`${sym.id}_${idx}`}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/20 border border-indigo-500/40 text-indigo-200 text-xs font-bold shadow-xs animate-in fade-in zoom-in-90 duration-150"
              >
                <span className="text-base">{sym.iconEmoji}</span>
                <span>{isNl ? sym.labelNl : sym.labelEn}</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* Pictogram Categories Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat.key}
            id={`picto-tab-${cat.key.toLowerCase()}`}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === cat.key
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {isNl ? cat.labelNl : cat.labelEn}
          </button>
        ))}
      </div>

      {/* Pictogram Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        {filteredSymbols.map((symbol) => (
          <button
            key={symbol.id}
            id={`btn-picto-${symbol.id}`}
            onClick={() => handlePictoClick(symbol)}
            className="group relative bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-4 text-left transition-all duration-200 shadow-md hover:shadow-amber-500/10 hover:-translate-y-0.5 active:scale-95 flex flex-col justify-between min-h-[140px]"
          >
            <div className="flex items-start justify-between">
              <span className="text-3xl sm:text-4xl filter drop-shadow-sm group-hover:scale-110 transition-transform">
                {symbol.iconEmoji}
              </span>
              <span className="p-1.5 rounded-lg bg-slate-800/80 group-hover:bg-amber-500 text-slate-400 group-hover:text-slate-950 transition-colors">
                <Volume2 className="w-3.5 h-3.5" />
              </span>
            </div>

            <div>
              <div className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition-colors">
                {isNl ? symbol.labelNl : symbol.labelEn}
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 italic">
                "{isNl ? symbol.audioSpokenTextNl : symbol.audioSpokenTextEn}"
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* "Mijn Dag in Beeld" (Visual Daily Timeline) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-teal-400" />
            <div>
              <h3 className="text-base font-black text-white">
                {isNl ? 'Mijn Dag in Beeld — Vandaag' : 'My Day in Pictures — Today'}
              </h3>
              <p className="text-xs text-slate-400">
                {isNl
                  ? 'Visueel dagschema voor de kinderverpleegkundige met verplichte handelingen en rustmomenten.'
                  : 'Visual schedule for the pediatric nurse with compulsory care steps and sensory breaks.'}
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-teal-500/10 text-teal-300 border border-teal-500/30">
            {childDayTimeline.filter((t) => t.completed).length} / {childDayTimeline.length} {isNl ? 'voltooid' : 'completed'}
          </span>
        </div>

        <div className="space-y-2.5">
          {childDayTimeline.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleTimelineItem(item.id)}
              className={`flex items-start justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                item.completed
                  ? 'bg-slate-950/60 border-emerald-500/30 opacity-90'
                  : 'bg-slate-950/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start space-x-3">
                <button className="mt-0.5 text-slate-400 hover:text-emerald-400 transition-colors">
                  {item.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-600" />
                  )}
                </button>

                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{item.pictoIcon}</span>
                    <span className="text-xs font-black text-amber-400 font-mono">{item.time}</span>
                    <span className={`text-xs sm:text-sm font-bold ${item.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                      {item.title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 pl-7">{item.notes}</p>
                </div>
              </div>

              <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-wider shrink-0 ${
                item.type === 'MEDICATIE'
                  ? 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                  : item.type === 'SONDEVOEDING'
                  ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                  : item.type === 'RUST'
                  ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/30'
                  : 'bg-teal-500/10 text-teal-300 border border-teal-500/30'
              }`}>
                {item.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
