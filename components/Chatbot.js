import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Mic, MicOff, Send, Loader, Volume2 } from "lucide-react";

const VoiceChatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastBotResponse, setLastBotResponse] = useState("");

  const recognitionRef = useRef(null);
  const speechSynthesisRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);
  const chatBodyRef = useRef(null);

  // Toggle chat window
  const toggleChat = () => setIsChatOpen(!isChatOpen);

  // Initialize voice recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      recognitionRef.current = new webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
      };
    }
  }, []);

  // Start listening for voice input
  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  // Fetch response from Gemini API
  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessages = [...messages, { sender: "user", text: inputText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputText }),
      });

      const data = await response.json();
      const botResponse = data.reply || "Sorry, I couldn't understand that.";

      setLastBotResponse(botResponse);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: botResponse },
      ]);

      speak(botResponse);
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
    setInputText("");
  };

  // Text-to-speech function
  const speak = (text) => {
    if (speechSynthesisRef.current.speaking) {
      speechSynthesisRef.current.cancel();
    }
    utteranceRef.current = new SpeechSynthesisUtterance(text);
    utteranceRef.current.onend = () => setIsSpeaking(false);
    speechSynthesisRef.current.speak(utteranceRef.current);
    setIsSpeaking(true);
  };

  // Pause speech
  const pauseSpeech = () => {
    if (speechSynthesisRef.current.speaking) {
      speechSynthesisRef.current.pause();
      setIsSpeaking(false);
    }
  };

  // Resume speech
  const resumeSpeech = () => {
    if (speechSynthesisRef.current.paused) {
      speechSynthesisRef.current.resume();
      setIsSpeaking(true);
    }
  };

  // Replay last bot response
  const replayResponse = () => {
    if (lastBotResponse) {
      speak(lastBotResponse);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Icon */}
      <button
        onClick={toggleChat}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-yellow-500 text-white shadow-lg hover:bg-blue-700 transition"
        aria-label="Open chat"
      >
        {isChatOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-4 w-80 bg-green-800 shadow-xl rounded-lg p-4 flex flex-col border">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-semibold text-lg text-gray-800">Chatbot</span>
            <button onClick={toggleChat} className="text-gray-600 hover:text-gray-900">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={chatBodyRef} className="flex flex-col space-y-2 mt-2 overflow-y-auto h-64 p-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-200 text-gray-800 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-2 text-gray-500">
                <Loader className="animate-spin" size={18} />
                <span>Thinking...</span>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex justify-between mt-2 border-t pt-2">
            {/* Voice Input */}
            <button onClick={startListening} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              <Mic size={20} />
            </button>

            {/* Pause/Unpause */}
            {isSpeaking ? (
              <button onClick={pauseSpeech} className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                <MicOff size={20} />
              </button>
            ) : (
              <button onClick={resumeSpeech} className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                <Mic size={20} />
              </button>
            )}

            {/* Replay */}
            <button onClick={replayResponse} className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
              <Volume2 size={20} />
            </button>
          </div>

          {/* Input Box */}
          <div className="flex items-center mt-2">
          <textarea
            className="flex-1 p-2 border rounded-md text-sm focus:outline-none resize-none"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows="1"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            />
            {/* <button onClick={sendMessage} className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <Send size={20} />
            </button> */}
            {/* <textarea
            className="flex-1 p-2 border rounded-md text-sm focus:outline-none resize-none"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows="1"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceChatbot;
