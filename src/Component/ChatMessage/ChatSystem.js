import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Avatar, IconButton, TextField, Badge, List, ListItem, ListItemAvatar, ListItemText, Divider, Typography, Box, Paper } from '@mui/material';
import { Send, Search, MoreVert, Close, Circle } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled components
const ChatContainer = styled(Paper)(({ theme }) => ({
  width: 350,
  height: 500,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  overflow: 'hidden',
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const ChatSearch = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const ChatList = styled(List)({
  flex: 1,
  overflowY: 'auto',
});

const ChatMessageArea = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  borderTop: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
}));

const MessageBubble = styled(Box)(({ theme, isCurrentUser }) => ({
  maxWidth: '70%',
  padding: theme.spacing(1, 2),
  margin: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: isCurrentUser ? theme.palette.primary.light : theme.palette.grey[200],
  color: isCurrentUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
  alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
  wordBreak: 'break-word',
}));

const MessageTime = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(0.5),
}));

const ChatSystem = ({
  currentUser,
  conversations,
  onSendMessage,
  onConversationSelect,
  onClose,
}) => {
  const [activeConversation, setActiveConversation] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);

  // Set first conversation as active by default
  useEffect(() => {
    if (conversations.length > 0 && !activeConversation) {
      setActiveConversation(conversations[0].id);
    }
  }, [conversations, activeConversation]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation]);

  const handleSendMessage = () => {
    if (message.trim() && activeConversation) {
      onSendMessage(activeConversation, message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getActiveConversationData = () => {
    return conversations.find(conv => conv.id === activeConversation);
  };

  const activeConvData = getActiveConversationData();

  return (
    <ChatContainer>
      <ChatHeader>
        <Typography variant="subtitle1" fontWeight="bold">Messages</Typography>
        <Box>
          <IconButton size="small" color="inherit" onClick={onClose}>
            <Close fontSize="small" />
          </IconButton>
        </Box>
      </ChatHeader>

      <ChatSearch>
        <TextField
          fullWidth
          size="small"
          placeholder="Search conversations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search fontSize="small" color="action" sx={{ mr: 1 }} />,
          }}
        />
      </ChatSearch>

      {!activeConversation ? (
        <ChatList>
          {filteredConversations.map((conversation) => (
            <React.Fragment key={conversation.id}>
              <ListItem
                button
                onClick={() => {
                  setActiveConversation(conversation.id);
                  onConversationSelect(conversation.id);
                }}
                selected={activeConversation === conversation.id}
              >
                <ListItemAvatar>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={conversation.unreadCount > 0 ? <Circle color="primary" sx={{ fontSize: 12 }} /> : null}
                  >
                    <Avatar src={conversation.participant.avatar} alt={conversation.participant.name} />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={conversation.participant.name}
                  secondary={conversation.lastMessage.text}
                  secondaryTypographyProps={{
                    noWrap: true,
                    color: conversation.unreadCount > 0 ? 'text.primary' : 'text.secondary',
                    fontWeight: conversation.unreadCount > 0 ? 'bold' : 'normal',
                  }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <Typography variant="caption" color="text.secondary">
                    {conversation.lastMessage.time}
                  </Typography>
                  {conversation.unreadCount > 0 && (
                    <Box sx={{
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      borderRadius: '50%',
                      width: 20,
                      height: 20,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      mt: 0.5,
                    }}>
                      {conversation.unreadCount}
                    </Box>
                  )}
                </Box>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </ChatList>
      ) : (
        <>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 1,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton size="small" onClick={() => setActiveConversation(null)}>
                <Close fontSize="small" />
              </IconButton>
              <Avatar src={activeConvData?.participant.avatar} sx={{ mx: 1 }} />
              <Typography variant="subtitle2" fontWeight="bold">
                {activeConvData?.participant.name}
              </Typography>
            </Box>
            <IconButton size="small">
              <MoreVert fontSize="small" />
            </IconButton>
          </Box>

          <Box sx={{
            flex: 1,
            overflowY: 'auto',
            p: 1,
            display: 'flex',
            flexDirection: 'column',
          }}>
            {activeConvData?.messages.map((msg, index) => (
              <MessageBubble
                key={index}
                isCurrentUser={msg.senderId === currentUser.id}
              >
                <Typography variant="body2">{msg.text}</Typography>
                <MessageTime>
                  {msg.time} • {msg.status === 'read' ? 'Read' : 'Delivered'}
                </MessageTime>
              </MessageBubble>
            ))}
            <div ref={messagesEndRef} />
          </Box>

          <ChatMessageArea>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              size="small"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              disabled={!message.trim()}
              sx={{ ml: 1 }}
            >
              <Send />
            </IconButton>
          </ChatMessageArea>
        </>
      )}
    </ChatContainer>
  );
};

ChatSystem.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  conversations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      participant: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string,
      }).isRequired,
      lastMessage: PropTypes.shape({
        text: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
      }).isRequired,
      unreadCount: PropTypes.number.isRequired,
      messages: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
          time: PropTypes.string.isRequired,
          status: PropTypes.oneOf(['sent', 'delivered', 'read']).isRequired,
          senderId: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  onSendMessage: PropTypes.func.isRequired,
  onConversationSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ChatSystem;