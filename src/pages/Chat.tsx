import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '../components/Header';
import { useHealth } from '../contexts/HealthContext';
import { 
  Send, 
  Paperclip, 
  MessageCircle, 
  Plus, 
  FileText, 
  Bot, 
  User,
  Loader2
} from 'lucide-react';
import { fetchChatResponse } from '@/lib/openrouter'; // ✅ NEW IMPORT

interface ChatPageProps {
  onNavigate: (page: string) => void;
}

const ChatPage: React.FC<ChatPageProps> = ({ onNavigate }) => {
  const { chatConversations, addChatConversation, updateChatConversation } = useHealth();
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentConversation = chatConversations.find(c => c.id === currentConversationId);

  useEffect(() => {
    if (chatConversations.length > 0 && !currentConversationId) {
      setCurrentConversationId(chatConversations[0].id);
    }
  }, [chatConversations, currentConversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const startNewChat = () => {
    const newConversation = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    addChatConversation(newConversation);
    setCurrentConversationId(newConversation.id);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || !currentConversationId) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: input,
      timestamp: new Date().toISOString()
    };

    const updatedConversation = {
      ...currentConversation!,
      messages: [...(currentConversation?.messages || []), userMessage],
      updatedAt: new Date().toISOString()
    };
    
    updateChatConversation(updatedConversation);
    setInput('');
    setIsTyping(true);

    try {
      const aiContent = await fetchChatResponse(input);

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai' as const,
        content: aiContent,
        timestamp: new Date().toISOString()
      };

      const finalConversation = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, aiMessage],
        updatedAt: new Date().toISOString(),
        title: updatedConversation.messages.length === 1 ? 
          input.substring(0, 30) + (input.length > 30 ? '...' : '') : 
          updatedConversation.title
      };

      updateChatConversation(finalConversation);
    } catch (error: any) {
      const errorMessage = {
        id: (Date.now() + 2).toString(),
        type: 'ai' as const,
        content: `❌ Failed to fetch response: ${error.message}`,
        timestamp: new Date().toISOString()
      };

      updateChatConversation({
        ...updatedConversation,
        messages: [...updatedConversation.messages, errorMessage],
        updatedAt: new Date().toISOString()
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !currentConversationId) return;

    const fileMessage = {
      id: Date.now().toString(),
      type: 'file' as const,
      content: `Uploaded file: ${file.name}`,
      timestamp: new Date().toISOString(),
      fileData: {
        name: file.name,
        type: file.type,
        size: file.size,
        status: 'processing' as const
      }
    };

    const updatedConversation = {
      ...currentConversation!,
      messages: [...(currentConversation?.messages || []), fileMessage],
      updatedAt: new Date().toISOString()
    };

    updateChatConversation(updatedConversation);
    setIsTyping(true);

    // Simulate file processing
    setTimeout(() => {
      const completedFileMessage = {
        ...fileMessage,
        fileData: {
          ...fileMessage.fileData,
          status: 'completed' as const
        }
      };

      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: 'ai' as const,
        content: `✅ I've analyzed the file **${file.name}**. Would you like to discuss its contents?`,
        timestamp: new Date().toISOString()
      };

      const finalConversation = {
        ...updatedConversation,
        messages: [
          ...updatedConversation.messages.slice(0, -1),
          completedFileMessage,
          aiResponse
        ],
        updatedAt: new Date().toISOString()
      };

      updateChatConversation(finalConversation);
      setIsTyping(false);
    }, 3000);
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={onNavigate} />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-full p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Chats</h2>
                <Button size="sm" onClick={startNewChat}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {chatConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      currentConversationId === conversation.id
                        ? 'bg-blue-100 border-blue-200'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setCurrentConversationId(conversation.id)}
                  >
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="h-4 w-4 text-gray-500" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {conversation.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(conversation.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {chatConversations.length === 0 && (
                  <div className="text-center py-8">
                    <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">No chats yet</p>
                    <Button size="sm" className="mt-2" onClick={startNewChat}>
                      Start your first chat
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Chat */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col">
              {currentConversation ? (
                <>
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {currentConversation.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      AI Health Assistant - Ask me anything about your health
                    </p>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {currentConversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex items-start space-x-3 ${
                          message.type === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {message.type !== 'user' && (
                          <div className="p-2 bg-blue-100 rounded-full">
                            <Bot className="h-4 w-4 text-blue-600" />
                          </div>
                        )}
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-blue-600 text-white'
                              : message.type === 'file'
                              ? 'bg-gray-100 border border-gray-200'
                              : 'bg-gray-100'
                          }`}
                        >
                          {message.type === 'file' && message.fileData && (
                            <div className="flex items-center space-x-2 mb-2">
                              <FileText className="h-4 w-4" />
                              <span className="text-sm font-medium">
                                {message.fileData.name}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded ${
                                message.fileData.status === 'completed'
                                  ? 'bg-green-100 text-green-800'
                                  : message.fileData.status === 'processing'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>{message.fileData.status}</span>
                            </div>
                          )}
                          <div className="whitespace-pre-wrap text-sm">
                            {message.content}
                          </div>
                          <div className={`text-xs mt-2 ${
                            message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {formatTimestamp(message.timestamp)}
                          </div>
                        </div>
                        {message.type === 'user' && (
                          <div className="p-2 bg-blue-100 rounded-full">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                        )}
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <Bot className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-sm text-gray-600">AI is thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isTyping}
                      >
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me about your health, upload a report, or start a conversation..."
                        className="flex-1 min-h-[60px] max-h-32 resize-none"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        disabled={isTyping}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!input.trim() || isTyping}
                        size="sm"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Welcome to AI Health Chat
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Start a conversation to get personalized health insights
                    </p>
                    <Button onClick={startNewChat}>
                      <Plus className="h-4 w-4 mr-2" />
                      Start New Chat
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
