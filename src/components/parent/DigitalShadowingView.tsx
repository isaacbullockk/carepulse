import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DigitalShadowVideo } from '../../types';
import {
  Video,
  Play,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Award,
  Clock,
  ShieldCheck,
  ChevronRight,
  X,
  AlertCircle,
  Eye
} from 'lucide-react';

export const DigitalShadowingView: React.FC = () => {
  const { t, digitalShadowVideos, verifyDigitalShadowVideoQuiz, childProfile } = useApp();
  const [selectedVideo, setSelectedVideo] = useState<DigitalShadowVideo | null>(null);
  const [quizVideo, setQuizVideo] = useState<DigitalShadowVideo | null>(null);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizError, setQuizError] = useState<boolean>(false);

  const p = t.parent;

  const handleStartQuiz = (v: DigitalShadowVideo) => {
    setQuizVideo(v);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    setQuizError(false);
  };

  const handleSubmitQuiz = () => {
    if (!quizVideo || selectedQuizOption === null) return;
    if (selectedQuizOption === quizVideo.tacitQuiz.correctIndex) {
      setQuizSubmitted(true);
      setQuizError(false);
      verifyDigitalShadowVideoQuiz(quizVideo.id);
    } else {
      setQuizError(true);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 p-5 sm:p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Sensory Twin & Tacit Knowledge Transfer</span>
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1.5">{p.digitalShadowHeader}</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            {p.digitalShadowSub}
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-800/80 px-4 py-3 rounded-xl border border-slate-700">
          <ShieldCheck className="w-6 h-6 text-indigo-400 shrink-0" />
          <div className="text-xs">
            <p className="font-semibold text-white">Tacit Verification SLA</p>
            <p className="text-slate-400">100% replacement pass-rate required</p>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {digitalShadowVideos.map((video) => (
          <div
            key={video.id}
            className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Thumbnail with overlay */}
              <div className="relative h-48 bg-slate-950 overflow-hidden group cursor-pointer" onClick={() => setSelectedVideo(video)}>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Duration & Category */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-900/90 text-white border border-slate-700 flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-indigo-400" />
                    <span>{video.duration}</span>
                  </span>

                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-950/80 text-indigo-300 border border-indigo-500/40">
                    {video.category.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <h3 className="text-base font-bold text-white leading-snug">{video.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{video.description}</p>

                {/* Key Instructions bullet points */}
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 space-y-1.5">
                  <p className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">Parent Clinical Notes:</p>
                  {video.keyInstructions.map((instruction, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                      <span>{instruction}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer verification & quiz CTA */}
            <div className="p-5 pt-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-800/60 mt-2">
              <div className="flex items-center space-x-1.5 text-xs text-slate-400">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>
                  <strong className="text-white">{video.verifiedByNursesCount}</strong> {p.verifiedByNursesLabel}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  id={`btn-watch-${video.id}`}
                  onClick={() => setSelectedVideo(video)}
                  className="flex-1 sm:flex-none px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors flex items-center justify-center space-x-1"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span>{p.watchMicroGuideBtn}</span>
                </button>

                <button
                  id={`btn-quiz-${video.id}`}
                  onClick={() => handleStartQuiz(video)}
                  className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow flex items-center justify-center space-x-1.5"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{p.takeTacitQuizBtn}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-scaleUp">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Video className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-white">{selectedVideo.title}</h3>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Container */}
            <div className="relative bg-black aspect-video flex items-center justify-center">
              <img
                src={selectedVideo.thumbnail}
                alt={selectedVideo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-radial from-transparent to-black/80 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-2xl mb-3 animate-pulse">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <p className="text-sm font-bold text-white">Simulated Parent Micro-Handover Stream</p>
                <p className="text-xs text-slate-300 max-w-md mt-1">
                  Recorded directly by Sanne (Mom) for Lars ({childProfile.age} yo) • Duration: {selectedVideo.duration}
                </p>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Protocol Guidance Checklist</h4>
              <ul className="space-y-2">
                {selectedVideo.keyInstructions.map((inst, i) => (
                  <li key={i} className="flex items-start space-x-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{inst}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  onClick={() => {
                    const v = selectedVideo;
                    setSelectedVideo(null);
                    handleStartQuiz(v);
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
                >
                  Proceed to Tacit Knowledge Check
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tacit Knowledge Quiz Modal */}
      {quizVideo && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 shadow-2xl animate-scaleUp space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                  {p.quizModalTitle}
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">{quizVideo.title}</h3>
              </div>
              <button
                onClick={() => setQuizVideo(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 bg-indigo-950/40 border border-indigo-500/30 p-3 rounded-xl">
              {p.quizPassScoreNotice}
            </p>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white">{quizVideo.tacitQuiz.question}</h4>

              <div className="space-y-2">
                {quizVideo.tacitQuiz.options.map((option, index) => {
                  const isSelected = selectedQuizOption === index;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (!quizSubmitted) {
                          setSelectedQuizOption(index);
                          setQuizError(false);
                        }
                      }}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-indigo-600/20 border-indigo-500 text-white font-medium'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span>{option}</span>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-indigo-400 bg-indigo-500' : 'border-slate-600'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Error message */}
            {quizError && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{p.quizIncorrectAlert}</span>
              </div>
            )}

            {/* Success message */}
            {quizSubmitted && (
              <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <p className="font-bold">{p.quizCorrectAlert}</p>
                  <p className="text-[11px] text-emerald-300 mt-0.5">{quizVideo.tacitQuiz.explanation}</p>
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => setQuizVideo(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                {quizSubmitted ? 'Close' : 'Cancel'}
              </button>

              {!quizSubmitted && (
                <button
                  id="btn-submit-quiz-answer"
                  onClick={handleSubmitQuiz}
                  disabled={selectedQuizOption === null}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedQuizOption !== null
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {p.submitQuizAnswer}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
