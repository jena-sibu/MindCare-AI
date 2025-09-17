import React, { useState, useRef, useEffect } from 'react';
import { Send, Heart, Shield, Clock, Users, MessageCircle, Brain, Sparkles } from 'lucide-react';

const MindCareAI = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Hi there! I'm MindCare AI, your confidential mental wellness companion. I'm here to listen, support, and help you navigate whatever you're feeling. How are you doing today? 💙",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentMood, setCurrentMood] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const mentalHealthResponses = {
    // Anxiety responses
    anxiety: [
      "I understand that anxiety can feel overwhelming. Remember that what you're experiencing is valid, and you're not alone. Let's try a quick breathing exercise: breathe in for 4 counts, hold for 4, and out for 4. Would you like to talk about what's causing these anxious feelings?",
      "Anxiety is your mind's way of trying to protect you, but sometimes it gets a bit overactive. It's completely normal to feel this way. Have you noticed any specific triggers that make your anxiety worse? I'm here to help you work through this.",
      "Those anxious feelings are real and valid. Many young people experience anxiety, and it doesn't mean anything is wrong with you. Would it help to talk about some grounding techniques that might bring you some relief right now?"
    ],
    
    // Depression responses
    depression: [
      "I hear the pain in your words, and I want you to know that what you're feeling matters. Depression can make everything feel heavy and hopeless, but please remember that these feelings, while real, are temporary. You're stronger than you know. Have you been able to talk to anyone about how you're feeling?",
      "Thank you for trusting me with these difficult feelings. Depression can make you feel isolated, but you're not alone in this. Even small steps count - have you been able to do anything today that brought even a tiny moment of comfort?",
      "Your feelings are completely valid, and it takes courage to acknowledge them. Depression affects so many people your age, and seeking support is actually a sign of strength. Is there anything specific that's been weighing on your mind lately?"
    ],
    
    // Stress responses
    stress: [
      "Stress can feel like carrying a heavy backpack that just keeps getting heavier. It sounds like you're dealing with a lot right now. Let's break this down - what's the biggest source of stress for you today? Sometimes talking through it can help lighten the load.",
      "I can sense you're feeling overwhelmed. Stress is our body's response to challenging situations, and it's completely normal to feel this way. Would it help to talk about what's on your plate right now? We can work together to find some ways to manage it.",
      "Feeling stressed is your mind and body's way of telling you that you care about what's happening in your life. That shows how much you want to do well. Let's explore some healthy ways to channel that energy. What's been the most stressful part of your day?"
    ],
    
    // Self-esteem responses
    selfesteem: [
      "The voice in your head that's being critical isn't telling you the truth about who you are. You have inherent worth that isn't based on achievements or others' opinions. What would you tell a good friend who was feeling the same way about themselves?",
      "Those harsh thoughts about yourself aren't facts - they're just thoughts, and thoughts can be changed. You deserve the same kindness you'd show a friend. What's one thing, even something small, that you're proud of about yourself?",
      "Self-doubt is something almost everyone experiences, especially during challenging times. The fact that you're here, seeking support and being honest about your feelings, shows real strength and self-awareness. What would it look like to speak to yourself with more compassion?"
    ],
    
    // Crisis responses
    crisis: [
      "I'm really concerned about what you've shared with me. Your life has value, and there are people who want to help you through this difficult time. Please reach out to a crisis hotline right away - they have trained counselors available 24/7. In the US, you can call 988 for the Suicide & Crisis Lifeline, or text 'HELLO' to 741741 for the Crisis Text Line. Can you tell me if you have a trusted adult you can talk to right now?",
      "What you're going through sounds incredibly painful, and I'm glad you felt safe enough to share it with me. However, I want to make sure you get the immediate, professional support you deserve. Please contact emergency services (911) or a crisis hotline immediately. The Crisis Text Line (text HOME to 741741) is available 24/7. You don't have to go through this alone."
    ],
    
    // School/academic responses
    school: [
      "School stress is incredibly common - you're definitely not alone in feeling overwhelmed by academic pressures. Your worth isn't determined by your grades or performance. What specific aspect of school is causing you the most worry right now?",
      "Academic pressure can feel intense, especially when it seems like everyone else has it figured out (spoiler: they don't!). It's okay to struggle and ask for help. Have you been able to talk to a teacher, counselor, or parent about what you're experiencing?",
      "School can feel overwhelming, but remember that you're more than your academic performance. You're learning and growing, and that includes making mistakes. What would make school feel more manageable for you right now?"
    ],
    
    // Social issues responses
    social: [
      "Social situations can feel really challenging, especially when you're worried about fitting in or being judged. The truth is, most people are too worried about themselves to judge you as harshly as you might think. What social situations tend to make you feel most anxious?",
      "Relationships and social dynamics can be complicated, especially during your teens and early twenties. It's normal to feel uncertain about where you fit in. Remember that the right people will appreciate you for who you are. What kind of social support would feel most helpful to you right now?",
      "Social anxiety is more common than you might think. Many people feel nervous about being judged or not being liked. The important thing is finding people who accept you as you are. Have you found any spaces or activities where you feel more comfortable being yourself?"
    ],
    
    // Family issues responses
    family: [
      "Family relationships can be complicated and emotionally challenging. It's normal to have conflicts or feel misunderstood by family members sometimes. Your feelings about your family situation are valid. Would it help to talk about what's been most difficult in your family relationships?",
      "Family dynamics can be really tough to navigate, especially when you're growing and changing. It's okay to feel frustrated or hurt by family situations. Have you been able to communicate your feelings to your family, or does that feel too difficult right now?",
      "Family issues can affect us deeply because these are the people closest to us. It makes sense that you'd feel strongly about what's happening. Sometimes family members don't know how to show support in ways that feel helpful. What kind of family relationship would feel most supportive to you?"
    ],
    
    // General support responses
    general: [
      "Thank you for sharing that with me. It takes courage to open up about what you're going through. I'm here to listen and support you. What feels most important for you to talk about right now?",
      "I can hear that you're going through a challenging time. Your feelings are completely valid, and it's okay not to have all the answers right now. What would feel most helpful - talking through what's on your mind, learning some coping strategies, or exploring resources for additional support?",
      "It sounds like you're dealing with a lot. Remember that seeking support is a sign of strength, not weakness. You don't have to handle everything on your own. What kind of support would feel most helpful to you today?"
    ]
  };

  const resources = {
    crisis: {
      title: "Crisis Resources - Available 24/7",
      items: [
        "🆘 National Suicide Prevention Lifeline: 988",
        "📱 Crisis Text Line: Text HOME to 741741", 
        "🌐 International: befrienders.org",
        "🔗 Online chat: suicidepreventionlifeline.org"
      ]
    },
    general: {
      title: "Mental Health Resources",
      items: [
        "🧠 National Alliance on Mental Illness (NAMI): nami.org",
        "💚 Mental Health America: mhanational.org",
        "🎓 Student counseling services at your school",
        "👨‍⚕️ Psychology Today therapist finder: psychologytoday.com"
      ]
    },
    teen: {
      title: "Teen-Specific Resources",
      items: [
        "💙 Teen Line: teenline.org (310-855-4673)",
        "📚 JED Campus mental health resources",
        "🏳️‍🌈 Trevor Project (LGBTQ+ support): thetrevorproject.org",
        "💪 National Child Traumatic Stress Network: nctsn.org"
      ]
    }
  };

  const detectIntentAndMood = (text) => {
    const lowerText = text.toLowerCase();
    
    // Crisis detection
    const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'want to die', 'hurt myself', 'self harm', 'cutting', 'overdose'];
    if (crisisKeywords.some(keyword => lowerText.includes(keyword))) {
      return { intent: 'crisis', mood: 'crisis', urgency: 'high' };
    }
    
    // Depression keywords
    const depressionKeywords = ['depressed', 'sad', 'hopeless', 'empty', 'worthless', 'tired all the time', 'can\'t sleep', 'no energy', 'nothing matters'];
    if (depressionKeywords.some(keyword => lowerText.includes(keyword))) {
      return { intent: 'depression', mood: 'low', urgency: 'medium' };
    }
    
    // Anxiety keywords
    const anxietyKeywords = ['anxious', 'worried', 'panic', 'nervous', 'overwhelmed', 'scared', 'can\'t breathe', 'heart racing', 'stress'];
    if (anxietyKeywords.some(keyword => lowerText.includes(keyword))) {
      return { intent: 'anxiety', mood: 'anxious', urgency: 'medium' };
    }
    
    // Self-esteem keywords
    const selfEsteemKeywords = ['not good enough', 'hate myself', 'ugly', 'stupid', 'failure', 'disappointed in myself', 'everyone hates me'];
    if (selfEsteemKeywords.some(keyword => lowerText.includes(keyword))) {
      return { intent: 'selfesteem', mood: 'low', urgency: 'medium' };
    }
    
    // School-related keywords
    const schoolKeywords = ['school', 'grades', 'exam', 'test', 'homework', 'college', 'pressure', 'academic', 'studying', 'failing'];
    if (schoolKeywords.some(keyword => lowerText.includes(keyword))) {
      return { intent: 'school', mood: 'stressed', urgency: 'low' };
    }
    
    // Social keywords
    const socialKeywords = ['friends', 'lonely', 'social', 'bullied', 'left out', 'rejected', 'relationships', 'dating', 'breakup'];
    if (socialKeywords.some(keyword => lowerText.includes(keyword))) {
      return { intent: 'social', mood: 'lonely', urgency: 'low' };
    }
    
    // Family keywords
    const familyKeywords = ['family', 'parents', 'mom', 'dad', 'siblings', 'home', 'fight', 'argue', 'family issues'];
    if (familyKeywords.some(keyword => lowerText.includes(keyword))) {
      return { intent: 'family', mood: 'frustrated', urgency: 'low' };
    }
    
    return { intent: 'general', mood: 'neutral', urgency: 'low' };
  };

  const generateResponse = (userMessage) => {
    const analysis = detectIntentAndMood(userMessage);
    setCurrentMood(analysis.mood);
    
    const responses = mentalHealthResponses[analysis.intent] || mentalHealthResponses.general;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    return {
      response: randomResponse,
      showResources: analysis.urgency !== 'low',
      resourceType: analysis.intent,
      analysis
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      type: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const { response, showResources, resourceType, analysis } = generateResponse(inputValue);
      
      const botResponse = {
        type: 'bot',
        content: response,
        timestamp: new Date().toLocaleTimeString(),
        showResources,
        resourceType,
        mood: analysis.mood,
        urgency: analysis.urgency
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const ResourceCard = ({ resourceType = 'general' }) => {
    const resource = resources[resourceType] || resources.general;
    
    return (
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-3 rounded-r-lg">
        <h4 className="font-semibold text-blue-800 mb-2">{resource.title}</h4>
        <ul className="text-sm text-blue-700">
          {resource.items.map((item, index) => (
            <li key={index} className="mb-1">{item}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-full">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  MindCare AI
                </h1>
                <p className="text-gray-600 text-sm">Your confidential mental wellness companion</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center"><Shield className="w-4 h-4 mr-1" /> Private & Secure</div>
              <div className="flex items-center"><Clock className="w-4 h-4 mr-1" /> 24/7 Available</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Chat Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[600px] flex flex-col">
              
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">Chat with MindCare AI</span>
                  </div>
                  {currentMood && (
                    <div className="text-sm bg-white/20 px-3 py-1 rounded-full">
                      Mood: {currentMood}
                    </div>
                  )}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div key={index}>
                    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p className="text-xs mt-2 opacity-70">{message.timestamp}</p>
                      </div>
                    </div>
                    
                    {message.showResources && message.type === 'bot' && (
                      <div className="mt-3">
                        <ResourceCard resourceType={message.resourceType} />
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t p-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Share what's on your mind... I'm here to listen 💙"
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-2 rounded-full hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Welcome Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Heart className="w-6 h-6 text-red-400" />
                <h3 className="text-lg font-semibold text-gray-800">You're Not Alone</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                This is a safe, judgment-free space where you can share your feelings and get support. 
                Everything you share here is completely confidential.
              </p>
            </div>

            {/* Quick Support */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Sparkles className="w-6 h-6 text-yellow-400" />
                <h3 className="text-lg font-semibold text-gray-800">Quick Support</h3>
              </div>
              <div className="space-y-2">
                <button 
                  onClick={() => setInputValue("I'm feeling anxious")}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm transition-colors"
                >
                  💙 I'm feeling anxious
                </button>
                <button 
                  onClick={() => setInputValue("I'm having trouble with school stress")}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm transition-colors"
                >
                  📚 School is stressing me out
                </button>
                <button 
                  onClick={() => setInputValue("I'm feeling lonely")}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm transition-colors"
                >
                  🤝 I'm feeling lonely
                </button>
                <button 
                  onClick={() => setInputValue("I need coping strategies")}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm transition-colors"
                >
                  💪 I need coping strategies
                </button>
              </div>
            </div>

            {/* Emergency Resources */}
            <div className="bg-red-50 rounded-xl border-2 border-red-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <h3 className="text-lg font-semibold text-red-800">Crisis Support</h3>
              </div>
              <p className="text-red-700 text-sm mb-3">
                If you're having thoughts of self-harm, please reach out immediately:
              </p>
              <div className="space-y-2 text-sm text-red-600">
                <p><strong>Call 988</strong> - Suicide & Crisis Lifeline</p>
                <p><strong>Text HOME to 741741</strong> - Crisis Text Line</p>
                <p><strong>Call 911</strong> - Emergency services</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span>© 2025 MindCare AI</span>
              <span>•</span>
              <span>Confidential & Private</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Your data is never stored</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MindCareAI;