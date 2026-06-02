import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Sparkles, MinusCircle, MessageCircle, AlertCircle } from "lucide-react";
import { ChatMessage } from "../types";

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hello! I am **NexoraAI**, your elite digital marketing growth strategist at **AimNexora Marketing Suite**. Tell me about your business goals: Are you attempting to scale organic SEO traffic, optimize paid ad performance, or generate high-ticket B2B sales meetings?"
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom of chats
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setUnreadCount(0);
  };

  const handlePresetTrigger = (promptText: string) => {
    submitQuery(promptText);
  };

  const submitQuery = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInputVal("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages.map(m => ({ role: m.role, content: m.content })) })
      });

      if (!response.ok) {
        throw new Error("Failed to contact NexoraAI server.");
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.content }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ **Attribution Error**: I had trouble connecting to the AimNexora growth nodes. Please check if your system's `GEMINI_API_KEY` is loaded in your Secrets layout, or try again shortly!"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitQuery(inputVal);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" id="aim_ai_bot_ecosystem">
      {/* Floating launcher icon */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="relative bg-gradient-to-tr from-[#18092a] to-[#4c1d95] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group border border-[#D946EF]/40 cursor-pointer flex items-center justify-center"
          id="aim_ai_bot_launcher"
          aria-label="Toggle NexoraAI Consultant"
        >
          <Sparkles className="w-6 h-6 text-[#D946EF] group-hover:rotate-12 transition-transform duration-300" />
          <MessageCircle className="w-5 h-5 absolute -top-1 -right-1 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center p-1 border-2 border-black" />
          {unreadCount > 0 && (
            <span className="absolute -left-3 -top-2 bg-[#D946EF] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shadow-md animate-bounce border border-white/20">
              ASK AI
            </span>
          )}
        </button>
      )}

      {/* Main chat window in glassmorphism */}
      {isOpen && (
        <div
          className="w-96 max-w-[calc(100vw-2rem)] h-[540px] max-h-[calc(100vh-8rem)] rounded-2xl flex flex-col shadow-2xl overflow-hidden glass border border-white/10"
          style={{
            background: "linear-gradient(135deg, rgba(3,1,7,0.94) 0%, rgba(20,5,30,0.96) 100%)",
            backdropFilter: "blur(20px)"
          }}
          id="aim_ai_chat_window"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#030107] to-[#25143a] p-4 flex items-center justify-between border-b border-purple-500/10" id="aim_ai_chat_header">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#18092a] border border-[#D946EF] flex items-center justify-center" id="aim_ai_avatar_node">
                <Sparkles className="w-4 h-4 text-[#D946EF] animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-white tracking-tight">NexoraAI</h4>
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                </div>
                <p className="text-[10px] text-gray-400 font-mono">CHIEF GROWTH STRATEGIST</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleChat}
                className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-white/5 transition-all cursor-pointer"
                id="aim_ai_minimize"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Stats banner */}
          <div className="bg-[#D946EF]/10 px-4 py-2 border-b border-[#D946EF]/5 flex items-center justify-between text-[11px]" id="aim_ai_chat_ticker">
            <span className="text-gray-300 font-medium">✨ Ask me about SEO roadmaps, PPC reduction, or Lead pipelines</span>
            <span className="text-[#D946EF] font-mono">v4.0 Active</span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4" id="aim_ai_messages_box">
            {messages.map((m, index) => (
              <div
                key={index}
                className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                id={`aim_ai_message_${index}`}
              >
                {m.role !== "user" && (
                  <div className="w-7 h-7 rounded-full bg-[#18092a] flex-shrink-0 flex items-center justify-center text-[10px] text-white border border-[#D946EF]/50">
                    NX
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl text-xs max-w-[80%] leading-relaxed ${
                    m.role === "user"
                      ? "bg-[#6c21a8] text-white rounded-tr-none"
                      : "bg-[#0c0515]/80 text-gray-200 border border-white/5 rounded-tl-none select-text"
                  }`}
                >
                  {/* Dynamic simple Markdown highlighting render */}
                  {parseSimpleMarkdown(m.content)}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start" id="aim_ai_loading_avatar">
                <div className="w-7 h-7 rounded-full bg-[#18092a] flex-shrink-0 flex items-center justify-center text-[10px] text-white border border-[#D946EF]/50 animate-bounce">
                  ⚡
                </div>
                <div className="bg-[#0c0515]/80 text-gray-400 p-3 rounded-2xl rounded-tl-none text-xs flex items-center gap-2 border border-white/5">
                  <span className="w-1.5 h-1.5 bg-[#D946EF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-[#D946EF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-[#D946EF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  <span className="font-mono text-[10px]">Attributing growth metrics...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick presets queries */}
          <div className="px-4 py-2 bg-black/40 border-t border-white/5 flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none" id="aim_ai_preset_dock">
            <button
              onClick={() => handlePresetTrigger("How do I improve my Local SEO rankings?")}
              className="text-[10px] bg-[#18092a] hover:bg-[#3b0764] text-gray-300 px-2.5 py-1.5 rounded-full border border-purple-500/10 cursor-pointer transition-all hover:text-white"
            >
              📈 Local SEO Strategy
            </button>
            <button
              onClick={() => handlePresetTrigger("What is an efficient CPA target for B2B Google Ads?")}
              className="text-[10px] bg-[#18092a] hover:bg-[#3b0764] text-gray-300 px-2.5 py-1.5 rounded-full border border-purple-500/10 cursor-pointer transition-all hover:text-white"
            >
              💰 PPC Cost targets
            </button>
            <button
              onClick={() => handlePresetTrigger("Tell me about AimNexora's 5-Step Growth Framework.")}
              className="text-[10px] bg-[#18092a] hover:bg-[#3b0764] text-gray-300 px-2.5 py-1.5 rounded-full border border-purple-500/10 cursor-pointer transition-all hover:text-white"
            >
              🚀 5-Step Framework
            </button>
          </div>

          {/* Chat Form */}
          <form onSubmit={handleSubmit} className="p-4 bg-[#050308] border-t border-white/10 flex gap-2" id="aim_ai_form">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask NexoraAI a strategic question..."
              className="flex-1 bg-black/60 border border-purple-500/20 text-white placeholder-gray-500 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#D946EF]"
              id="aim_ai_input_text"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputVal.trim()}
              className="bg-[#D946EF] text-white px-3 py-2 rounded-xl hover:bg-[#D946EF]/80 active:scale-95 disabled:opacity-40 transition-all cursor-pointer flex items-center justify-center justify-items-center"
              id="aim_ai_submit_btn"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

// Helper function to turn simple markdown style tags into react elements
function parseSimpleMarkdown(content: string) {
  const lines = content.split("\n");
  return lines.map((line, lIdx) => {
    let renderedLine = line;
    // Replace markdown bold **text**
    const boldRegex = /\*\*(.*?)\*\*/g;
    const bulletRegex = /^-\s(.*)/;
    const isBullet = bulletRegex.test(line);

    let parts: React.ReactNode[] = [];
    let currentIdx = 0;
    let match;

    const parseLineText = (text: string) => {
      let tParts: React.ReactNode[] = [];
      let lastIndex = 0;
      boldRegex.lastIndex = 0;
      while ((match = boldRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          tParts.push(text.substring(lastIndex, match.index));
        }
        tParts.push(
          <span key={`bold-${match.index}`} className="font-bold text-[#D946EF]">
            {match[1]}
          </span>
        );
        lastIndex = boldRegex.lastIndex;
      }
      if (lastIndex < text.length) {
        tParts.push(text.substring(lastIndex));
      }
      return tParts.length > 0 ? tParts : [text];
    };

    if (isBullet) {
      const bulletContent = line.replace(/^-\s/, "");
      return (
        <div key={lIdx} className="flex gap-1.5 ml-1 my-1">
          <span className="text-[#D946EF]">Paragraph Bullet •</span>
          <span>{parseLineText(bulletContent)}</span>
        </div>
      );
    }

    if (line.trim().startsWith("###")) {
      return (
        <h5 key={lIdx} className="text-sm font-bold text-white mt-3 mb-1 tracking-tight">
          {parseLineText(line.replace(/^###\s*/, ""))}
        </h5>
      );
    }
    if (line.trim().startsWith("##")) {
      return (
        <h4 key={lIdx} className="text-base font-bold text-white mt-4 mb-2 tracking-tight">
          {parseLineText(line.replace(/^##\s*/, ""))}
        </h4>
      );
    }

    return (
      <p key={lIdx} className="mb-2">
        {parseLineText(line)}
      </p>
    );
  });
}
