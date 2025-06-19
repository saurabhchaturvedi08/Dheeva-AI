import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { ArrowUp, Search as SearchIcon, Globe } from 'lucide-react-native';
import { ChatBubble } from '@/components/ChatBubble';
import { DomainSelector } from '@/components/DomainSelector';

export default function SearchScreen() {
  const [domain, setDomain] = useState('general');
  const [messages, setMessages] = useState([]);
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
      domain,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage = {
        id: String(Date.now() + 1),
        text: `This is a simulated response to your ${domain} domain question: "${inputText}"`,
        sender: 'ai',
        timestamp: new Date().toISOString(),
        domain,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>AI Search</Text>
        <Text style={styles.headerSubtitle}>
          Ask any question - get real-time AI answers
        </Text>
        
        <View style={styles.domainContainer}>
          <Text style={styles.domainLabel}>Select Knowledge Domain:</Text>
          <DomainSelector 
            selectedDomain={domain} 
            onSelectDomain={setDomain} 
          />
        </View>
      </View>
      
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatBubble message={item} />}
        contentContainerStyle={styles.chatList}
        ListEmptyComponent={
          <View style={styles.emptySearch}>
            <Globe size={48} color="#cbd5e1" />
            <Text style={styles.emptySearchTitle}>Ask anything</Text>
            <Text style={styles.emptySearchSubtitle}>
              Get answers to general questions or specific {domain} domain inquiries
            </Text>
          </View>
        }
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={`Ask a ${domain} question...`}
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
  headerContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  domainContainer: {
    marginTop: 16,
  },
  domainLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0f172a',
    marginBottom: 8,
  },
  chatList: {
    padding: 16,
    paddingBottom: 80,
  },
  emptySearch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptySearchTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginTop: 16,
  },
  emptySearchSubtitle: {
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