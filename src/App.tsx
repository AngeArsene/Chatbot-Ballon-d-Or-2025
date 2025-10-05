import { useState, useRef, useEffect } from 'react';
import { Send, Trophy, Sparkles } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const knowledgeBase: Record<string, string> = {
  'ballon d\'or masculin': 'Ousmane Dembélé a remporté le Ballon d\'Or masculin 2025.',
  'ballon d\'or': 'Ousmane Dembélé a remporté le Ballon d\'Or masculin 2025.',
  'gagnant ballon d\'or': 'Ousmane Dembélé a remporté le Ballon d\'Or masculin 2025.',
  'vainqueur ballon d\'or': 'Ousmane Dembélé a remporté le Ballon d\'Or masculin 2025.',
  'qui a gagné': 'Ousmane Dembélé a remporté le Ballon d\'Or masculin 2025.',
  'winner': 'Ousmane Dembélé a remporté le Ballon d\'Or masculin 2025.',

  'ballon d\'or féminin': 'Aitana Bonmatí a remporté le Ballon d\'Or féminin 2025, son troisième consécutif.',
  'feminin': 'Aitana Bonmatí a remporté le Ballon d\'Or féminin 2025, son troisième consécutif.',
  'feminine': 'Aitana Bonmatí a remporté le Ballon d\'Or féminin 2025, son troisième consécutif.',
  'femme': 'Aitana Bonmatí a remporté le Ballon d\'Or féminin 2025, son troisième consécutif.',

  'lieu': 'La cérémonie s\'est déroulée au Théâtre du Châtelet à Paris, France.',
  'où': 'La cérémonie s\'est déroulée au Théâtre du Châtelet à Paris, France.',
  'endroit': 'La cérémonie s\'est déroulée au Théâtre du Châtelet à Paris, France.',
  'location': 'La cérémonie s\'est déroulée au Théâtre du Châtelet à Paris, France.',
  'paris': 'La cérémonie s\'est déroulée au Théâtre du Châtelet à Paris, France.',
  'châtelet': 'La cérémonie s\'est déroulée au Théâtre du Châtelet à Paris, France.',

  'date': 'La cérémonie a eu lieu le lundi 22 septembre 2025 à 21h00 CET.',
  'quand': 'La cérémonie a eu lieu le lundi 22 septembre 2025 à 21h00 CET.',
  'septembre': 'La cérémonie a eu lieu le lundi 22 septembre 2025 à 21h00 CET.',
  '22 septembre': 'La cérémonie a eu lieu le lundi 22 septembre 2025 à 21h00 CET.',

  'trophée kopa': 'Lamine Yamal a remporté le Trophée Kopa 2025, devenant le premier joueur à gagner ce trophée deux fois consécutivement.',
  'kopa': 'Lamine Yamal a remporté le Trophée Kopa 2025, devenant le premier joueur à gagner ce trophée deux fois consécutivement.',
  'yamal': 'Lamine Yamal a remporté le Trophée Kopa 2025, devenant le premier joueur à gagner ce trophée deux fois consécutivement.',
  'jeune joueur': 'Lamine Yamal a remporté le Trophée Kopa 2025, devenant le premier joueur à gagner ce trophée deux fois consécutivement.',
};

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: 'Bonjour ! 🏆 Je suis votre assistant pour la cérémonie du Ballon d\'Or 2025. Posez-moi vos questions !',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findAnswer = (question: string): string => {
    const normalizedQuestion = question.toLowerCase().trim();

    for (const [key, answer] of Object.entries(knowledgeBase)) {
      if (normalizedQuestion.includes(key)) {
        return answer;
      }
    }

    return 'Je suis désolé, je ne peux répondre qu\'aux questions concernant la cérémonie du Ballon d\'Or 2025. Voici les sujets que je maîtrise :\n\n• Qui a remporté le Ballon d\'Or masculin ?\n• Qui a remporté le Ballon d\'Or féminin ?\n• Où s\'est déroulée la cérémonie ?\n• Quelle est la date de la cérémonie ?\n• Qui a remporté le Trophée Kopa ?';
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 1,
        text: findAnswer(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    'Qui a remporté le Ballon d\'Or ?',
    'Qui a remporté le Ballon d\'Or féminin ?',
    'Où s\'est déroulée la cérémonie ?',
    'Quelle est la date de la cérémonie ?',
    'Qui a remporté le Trophée Kopa ?',
  ];

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Chatbot Ballon d'Or 2025</h1>
          </div>
          <p className="text-amber-50 text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Toutes les informations sur la cérémonie du 22 septembre 2025
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-md ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                    : 'bg-white text-slate-800 border border-slate-200'
                }`}
              >
                <p className="whitespace-pre-line leading-relaxed">{message.text}</p>
                <span className="text-xs opacity-70 mt-2 block">
                  {message.timestamp.toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-slate-800 rounded-2xl px-5 py-3 shadow-md border border-slate-200">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-white border-t border-slate-200">
          <div className="mb-3 flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-800 px-3 py-2 rounded-full transition-all duration-200 border border-amber-200 hover:border-amber-300"
              >
                {question}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Posez votre question..."
              className="flex-1 px-5 py-3 rounded-xl border-2 border-slate-300 focus:border-blue-500 focus:outline-none transition-colors bg-slate-50"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              <span className="font-medium">Envoyer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
