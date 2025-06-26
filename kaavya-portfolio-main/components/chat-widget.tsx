"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { MessageCircle, X, Maximize2, RotateCcw, Send, Wifi, WifiOff, GripVertical } from "lucide-react"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  isFallback?: boolean
}

interface Position {
  x: number
  y: number
}

const SUGGESTION_CHIPS = [
  "🎓 Education & achievements",
  "💼 Current work experience",
  "🚀 Impressive projects",
  "💻 Technical skills",
  "💜 Hobbies & interests",
  "🎨 Design opinions",
  "📞 Contact info",
  "🤝 Collaboration",
]

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [isFallbackMode, setIsFallbackMode] = useState(false)
  const [position, setPosition] = useState<Position>({ x: 24, y: 24 }) // 24px from bottom-right
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const chatWidgetRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Show welcome message when first opened
      const welcomeMessage: Message = {
        id: "welcome",
        text: "👋 Hi! I'm an AI assistant who can tell you about **Kaavya Radhakrishnan**.\n\nI can share information about her:\n🎓 **Education & Achievements**\n💼 **Professional Experience**\n💻 **Technical Skills & Strong Opinions**\n🚀 **Projects & Research**\n🎨 **Design Philosophy & Quirks**\n💜 **Personal Interests & Hobbies**\n🏠 **Background & Location**\n📞 **Contact Information**\n\nAsk me anything - from her technical expertise to her favorite dessert, or why everything she builds is purple! 🎉",
        isUser: false,
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen])

  // Dragging functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isFullscreen) return

    const rect = chatWidgetRef.current?.getBoundingClientRect()
    if (rect) {
      setIsDragging(true)
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || isFullscreen) return

      const newX = window.innerWidth - (e.clientX - dragOffset.x) - 500 // 420px is widget width
      const newY = window.innerHeight - (e.clientY - dragOffset.y) - (isOpen ? 600 : 56) // 600px open height, 56px closed

      // Keep widget within viewport bounds
      const boundedX = Math.max(24, Math.min(newX, window.innerWidth - 420 - 24))
      const boundedY = Math.max(24, Math.min(newY, window.innerHeight - (isOpen ? 600 : 56) - 24))

      setPosition({ x: boundedX, y: boundedY })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragOffset, isOpen, isFullscreen])

  const sendMessage = async (text?: string) => {
    const messageText = text || inputValue.trim()
    if (!messageText || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)
    setShowSuggestions(false)

    try {
      // Send conversation history for context (last 8 messages to save tokens)
      const conversationHistory = messages.slice(-8)

      console.log("Sending request to /api/chat with message:", messageText)

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          conversationHistory: conversationHistory,
        }),
      })

      console.log("Response status:", response.status)
      const data = await response.json()
      console.log("Response data:", data)

      if (!response.ok && !data.fallback) {
        throw new Error(data.error || "Failed to get response")
      }

      // Update fallback mode status
      setIsFallbackMode(data.fallback || false)

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isUser: false,
        timestamp: new Date(),
        isFallback: data.fallback,
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error: any) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now, but I can still answer basic questions about Kaavya! Try asking about her background, projects, or skills.",
        isUser: false,
        timestamp: new Date(),
        isFallback: true,
      }
      setMessages((prev) => [...prev, errorMessage])
      setIsFallbackMode(true)
    } finally {
      setIsLoading(false)
    }
  }

  const resetChat = () => {
    setMessages([])
    setShowSuggestions(true)
    setIsFallbackMode(false)
    setIsOpen(true)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatMessage = (text: string) => {
    // Enhanced markdown-like formatting with proper line breaks
    return text
      .split("\n")
      .map((line, index) => {
        // Handle bold text
        line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        // Handle code formatting
        line = line.replace(
          /`(.*?)`/g,
          "<code style='background: rgba(255,255,255,0.1); padding: 2px 4px; border-radius: 3px; font-family: monospace;'>$1</code>",
        )
        // Handle bullet points
        if (line.trim().startsWith("•") || line.trim().startsWith("-")) {
          return `<div style="margin-left: 16px; margin-bottom: 4px;">${line}</div>`
        }
        // Handle numbered lists
        if (line.trim().match(/^\d+\./)) {
          return `<div style="margin-left: 16px; margin-bottom: 4px;">${line}</div>`
        }
        // Handle empty lines
        if (line.trim() === "") {
          return "<br/>"
        }
        return `<div style="margin-bottom: 4px;">${line}</div>`
      })
      .join("")
  }

  if (!isOpen) {
    return (
      <Button
        ref={chatWidgetRef}
        onClick={() => setIsOpen(true)}
        onMouseDown={handleMouseDown}
        className={`fixed h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg z-50 transition-all duration-200 ${
          isDragging ? "cursor-grabbing scale-105" : "cursor-grab"
        }`}
        style={{
          right: `${position.x}px`,
          bottom: `${position.y}px`,
        }}
        size="icon"
      >
        <MessageCircle size={24} />
      </Button>
    )
  }

  return (
    <Card
      ref={chatWidgetRef}
      className={`fixed z-50 bg-gray-900 border-gray-700 text-white transition-all duration-300 overflow-hidden ${
        isFullscreen ? "inset-0 rounded-none" : `w-[420px] h-[600px] ${isDragging ? "cursor-grabbing shadow-2xl" : ""}`
      }`}
      style={
        isFullscreen
          ? {}
          : {
              right: `${position.x}px`,
              bottom: `${position.y}px`,
            }
      }
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between p-4 border-b border-gray-700 bg-gradient-to-r from-purple-800 to-blue-800 ${
          !isFullscreen ? "cursor-grab active:cursor-grabbing" : ""
        }`}
        onMouseDown={!isFullscreen ? handleMouseDown : undefined}
      >
        <div className="flex items-center gap-2">
          {!isFullscreen && <GripVertical size={16} className="text-gray-300" />}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="h-8 w-8 text-gray-200 hover:text-white hover:bg-white/10"
          >
            <Maximize2 size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={resetChat}
            className="h-8 w-8 text-gray-200 hover:text-white hover:bg-white/10"
          >
            <RotateCcw size={16} />
          </Button>
          {/* Connection status indicator */}
          <div className="flex items-center">
            {isFallbackMode ? (
              <WifiOff size={14} className="text-yellow-400" title="Using offline mode" />
            ) : (
              <Wifi size={14} className="text-green-400" title="Connected to AI" />
            )}
          </div>
        </div>
        <h3 className="font-semibold text-center flex-1">💬 Ask About Kaavya</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="h-8 w-8 text-gray-200 hover:text-white hover:bg-white/10"
        >
          <X size={16} />
        </Button>
      </div>

      {/* Fallback mode notice */}
      {isFallbackMode && (
        <div className="px-4 py-2 bg-yellow-900/50 border-b border-yellow-700 text-yellow-200 text-sm">
          <div className="flex items-center gap-2">
            <WifiOff size={14} />
            <span>Running in offline mode - I can still answer questions about Kaavya!</span>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 max-h-full">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] p-3 rounded-lg break-words ${
                message.isUser
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : message.isFallback
                    ? "bg-yellow-900/50 text-yellow-100 border border-yellow-700"
                    : "bg-gray-700 text-gray-100 border border-gray-600"
              }`}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: formatMessage(message.text),
                }}
              />
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-700 text-gray-100 p-3 rounded-lg border border-gray-600">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips */}
      {showSuggestions && (
        <div className="p-4 border-t border-gray-700 bg-gray-800 flex-shrink-0">
          <div className="flex flex-wrap gap-2 max-h-16 overflow-y-auto">
            {SUGGESTION_CHIPS.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => sendMessage(suggestion.replace(/^[🎓💼🚀💻🏆🎨🐛💜🍰🏖️📞🤝📚🎉🏠]\s/u, ""))}
                className="text-xs bg-gray-700 border-gray-600 text-gray-200 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:border-transparent transition-all"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-700 bg-gray-800 flex-shrink-0">
        <div className="flex gap-2 items-end">
          <Textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about Kaavya's experience, hobbies, favorite things..."
            className="flex-1 min-h-[40px] max-h-[120px] bg-gray-700 border-gray-600 text-white placeholder-gray-400 resize-none focus:border-purple-500"
            disabled={isLoading}
            rows={1}
          />
          <Button
            onClick={() => sendMessage()}
            disabled={isLoading || !inputValue.trim()}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 flex-shrink-0"
            size="icon"
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </Card>
  )
}
