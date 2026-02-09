 import React, { useState } from 'react';
import ChatSystem from '../../Component/ChatMessage/ChatSystem';

const ChatApp = () => {
  const [conversations, setConversations] = useState([
    {
      id: '1',
      participant: {
        id: '2',
        name: 'Sarah Johnson',
        avatar: 'https://example.com/avatar1.jpg',
      },
      lastMessage: {
        text: 'Hey, how are you doing?',
        time: '10:30 AM',
      },
      unreadCount: 2,
      messages: [
        {
          id: '101',
          text: 'Hi there!',
          time: '10:20 AM',
          status: 'read',
          senderId: '2',
        },
        {
          id: '102',
          text: 'Hey, how are you doing?',
          time: '10:30 AM',
          status: 'delivered',
          senderId: '2',
        },
      ],
    },
    // Add more conversations as needed
  ]);

  const currentUser = {
    id: '1',
    name: 'John Doe',
    avatar: 'https://example.com/avatar2.jpg',
  };

  const handleSendMessage = (conversationId, message) => {
    // Update the conversation with the new message
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          messages: [
            ...conv.messages,
            {
              id: Date.now().toString(),
              text: message,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              status: 'sent',
              senderId: currentUser.id,
            }
          ],
          lastMessage: {
            text: message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        };
      }
      return conv;
    }));
  };

  const handleConversationSelect = (conversationId) => {
    // Mark messages as read when conversation is selected
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          unreadCount: 0,
          messages: conv.messages.map(msg => ({
            ...msg,
            status: msg.status === 'delivered' ? 'read' : msg.status,
          })),
        };
      }
      return conv;
    }));
  };

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20 }}>
      <ChatSystem
        currentUser={currentUser}
        conversations={conversations}
        onSendMessage={handleSendMessage}
        onConversationSelect={handleConversationSelect}
        onClose={() => console.log('Chat closed')}
      />
    </div>
  );
};

export default ChatApp;