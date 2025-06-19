import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { ArrowUp, FileText, Plus } from 'lucide-react-native';
import { MOCK_FILES, MOCK_CHATS } from '@/constants/mockData';
import { ChatBubble } from '@/components/ChatBubble';
import { ChatHeader } from '@/components/ChatHeader';

export default function ChatScreen() {
  const [selectedFile, setSelectedFile] = useState(MOCK_FILES[0]);
  const [messages, setMessages] = useState(MOCK_CHATS[MOCK_FILES[0].id] || []);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    const userMessage = {
      id: String(Date.now()),
      text: inputText,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage = {
        id: String(Date.now() + 1),
        text: `This is a simulated response to your question: "${inputText}"`,
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setMessages(MOCK_CHATS[file.id] || []);
  };

  return (
    <View style={styles.container}>
      <ChatHeader 
        selectedFile={selectedFile}
        files={MOCK_FILES}
        onSelectFile={handleFileSelect}
      />
      
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatBubble message={item} />}
        contentContainerStyle={styles.chatList}
        ListEmptyComponent={
          <View style={styles.emptyChat}>
            <FileText size={48} color="#cbd5e1" />
            <Text style={styles.emptyChatTitle}>No messages yet</Text>
            <Text style={styles.emptyChatSubtitle}>
              Ask questions about {selectedFile?.name} or upload a new file
            </Text>
          </View>
        }
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask a question about this file..."
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity 
          style={[
            styles.sendButton, 
            !inputText.trim() && styles.sendButtonDisabled
          ]} 
          onPress={handleSend}
          disabled={!inputText.trim() || isLoading}
        >
          <ArrowUp size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  chatList: {
    padding: 16,
    paddingBottom: 80,
  },
  emptyChat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyChatTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginTop: 16,
  },
  emptyChatSubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 32,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxHeight: 120,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  sendButtonDisabled: {
    backgroundColor: '#cbd5e1',
  },
});