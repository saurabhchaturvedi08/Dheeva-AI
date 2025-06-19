import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { ArrowLeft, Download, Share2, ArrowUp } from 'lucide-react-native';
import { MOCK_FILES, MOCK_CHATS } from '@/constants/mockData';
import { ChatBubble } from '@/components/ChatBubble';
import { FilePreview } from '@/components/FilePreview';

export default function FileDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    if (id) {
      // In a real app, fetch file details from API
      const foundFile = MOCK_FILES.find(f => f.id === id);
      if (foundFile) {
        setFile(foundFile);
        setMessages(MOCK_CHATS[id] || []);
      }
    }
  }, [id]);

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
        text: `This is a simulated response about "${file?.name}" to your question: "${inputText}"`,
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  if (!file) {
    return (
      <View style={styles.container}>
        <Text>File not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          title: file.name,
          headerTitleStyle: {
            fontSize: 16,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color="#0f172a" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerButton}>
                <Download size={20} color="#0f172a" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <Share2 size={20} color="#0f172a" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      
      {showPreview && (
        <View style={styles.previewContainer}>
          <FilePreview file={file} />
          <TouchableOpacity 
            style={styles.hidePreviewButton}
            onPress={() => setShowPreview(false)}
          >
            <Text style={styles.hidePreviewText}>Hide Preview</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {!showPreview && (
        <TouchableOpacity 
          style={styles.showPreviewButton}
          onPress={() => setShowPreview(true)}
        >
          <Text style={styles.showPreviewText}>Show File Preview</Text>
        </TouchableOpacity>
      )}
      
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatBubble message={item} />}
        contentContainerStyle={[
          styles.chatList, 
          { paddingTop: showPreview ? 120 : 48 }
        ]}
        ListEmptyComponent={
          <View style={styles.emptyChat}>
            <Text style={styles.emptyChatTitle}>No questions yet</Text>
            <Text style={styles.emptyChatSubtitle}>
              Ask questions about {file.name} to get AI-powered insights
            </Text>
          </View>
        }
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={`Ask about ${file.name}...`}
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
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  previewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    zIndex: 1,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  hidePreviewButton: {
    position: 'absolute',
    bottom: 4,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  hidePreviewText: {
    fontSize: 12,
    color: '#6366f1',
  },
  showPreviewButton: {
    position: 'absolute',
    top: 8,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  showPreviewText: {
    color: '#6366f1',
    fontWeight: '500',
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