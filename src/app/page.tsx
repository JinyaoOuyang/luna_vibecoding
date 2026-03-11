"use client";

import { useState } from "react";

// Welcome Page
function WelcomePage({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6">
      <div className="w-full max-w-md text-center">
        {/* Luna Logo/Icon */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
            <span className="text-4xl">🌙</span>
          </div>
        </div>

        <h1 className="mb-4 text-3xl font-bold text-white">Welcome to Luna</h1>
        <p className="mb-10 text-lg text-gray-400">
          Your personal AI companion that adapts to you
        </p>

        <button
          onClick={onGetStarted}
          className="w-full rounded-full bg-white py-4 text-lg font-semibold text-black transition hover:bg-gray-200"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

// Sign In Page
function SignInPage({ onSignIn, onBack }: { onSignIn: () => void; onBack: () => void }) {
  const [email, setEmail] = useState("");

  return (
    <div className="flex min-h-screen flex-col bg-black px-6">
      {/* Header */}
      <button onClick={onBack} className="mt-8 text-gray-400 hover:text-white">
        ← Back
      </button>

      <div className="flex flex-1 flex-col justify-center">
        <h1 className="mb-2 text-3xl font-bold text-white">Sign In</h1>
        <p className="mb-8 text-gray-400">Welcome back! Enter your email to continue.</p>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-6 w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-4 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
        />

        <button
          onClick={onSignIn}
          className="w-full rounded-full bg-white py-4 text-lg font-semibold text-black transition hover:bg-gray-200"
        >
          Continue
        </button>

        <p className="mt-6 text-center text-gray-500">
          Don&apos;t have an account?{" "}
          <span className="text-purple-400">Sign up</span>
        </p>
      </div>
    </div>
  );
}

// Daily Tips / Permissions Page
function DailyTipsPage({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6">
      <div className="w-full max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-500/20">
            <span className="text-4xl">🔔</span>
          </div>
        </div>

        <h1 className="mb-4 text-2xl font-bold text-white">Daily Tips</h1>
        <p className="mb-10 text-gray-400">
          Enable notifications to receive daily tips and stay updated with your AI companion.
        </p>

        <button
          onClick={onContinue}
          className="mb-4 w-full rounded-full bg-purple-500 py-4 text-lg font-semibold text-white transition hover:bg-purple-600"
        >
          Enable Notifications
        </button>

        <button className="text-gray-500 hover:text-gray-400">
          Not now
        </button>
      </div>
    </div>
  );
}

// Chat Message Types
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Chat Page
function ChatPage({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm Luna, your personal AI companion. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput("");

    // Simulate response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Thanks for sharing! Tell me more about what you're thinking.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-black">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-800 px-4 py-4">
        <button onClick={onBack} className="text-gray-400">
          ←
        </button>
        <div className="flex items-center gap-3">
          <span className="text-xl font-semibold text-white">Luna</span>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500" />
        </div>
        <button className="text-gray-400">⋯</button>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-md space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-purple-500 text-white"
                    : "bg-gray-800 text-gray-100"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-800 p-4">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <input
            type="text"
            placeholder="Message Luna..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 rounded-full border border-gray-800 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 text-white"
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}

// Profile/Settings Page
function ProfilePage({ onBack }: { onBack: () => void }) {
  const menuItems = [
    { icon: "👤", label: "Edit Profile" },
    { icon: "🔔", label: "Notifications" },
    { icon: "🎨", label: "Appearance" },
    { icon: "🔒", label: "Privacy & Security" },
    { icon: "❓", label: "Help & Support" },
    { icon: "📤", label: "Log Out" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-black">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-800 px-4 py-4">
        <button onClick={onBack} className="text-gray-400">
          ←
        </button>
        <span className="text-lg font-semibold text-white">Settings</span>
        <div className="w-8" />
      </header>

      {/* Profile */}
      <div className="flex flex-col items-center py-10">
        <div className="mb-4 h-20 w-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500" />
        <h2 className="text-xl font-semibold text-white">User</h2>
        <p className="text-gray-500">user@luna.ai</p>
      </div>

      {/* Menu */}
      <div className="flex-1 px-4">
        <div className="mx-auto max-w-md space-y-2">
          {menuItems.map((item, i) => (
            <button
              key={i}
              className="flex w-full items-center gap-4 rounded-xl bg-gray-900 px-4 py-4 text-left text-gray-200 hover:bg-gray-800"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              <span className="text-gray-500">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main App
export default function Home() {
  const [page, setPage] = useState<
    "welcome" | "signin" | "dailytips" | "chat" | "profile"
  >("welcome");

  switch (page) {
    case "welcome":
      return <WelcomePage onGetStarted={() => setPage("signin")} />;
    case "signin":
      return <SignInPage onSignIn={() => setPage("dailytips")} onBack={() => setPage("welcome")} />;
    case "dailytips":
      return <DailyTipsPage onContinue={() => setPage("chat")} />;
    case "chat":
      return <ChatPage onBack={() => setPage("profile")} />;
    case "profile":
      return <ProfilePage onBack={() => setPage("chat")} />;
    default:
      return null;
  }
}
