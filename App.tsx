import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Image, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Welcome Page
function WelcomePage({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.welcomeContent}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>🌙</Text>
          </View>
        </View>
        
        <Text style={styles.welcomeTitle}>Welcome to Luna</Text>
        <Text style={styles.welcomeSubtitle}>
          Your personal AI companion that adapts to you
        </Text>
        
        <TouchableOpacity style={styles.primaryButton} onPress={onGetStarted}>
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Sign In Page
function SignInPage({ onSignIn, onBack }: { onSignIn: () => void; onBack: () => void }) {
  const [email, setEmail] = useState('');
  
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.formContent}>
          <Text style={styles.pageTitle}>Sign In</Text>
          <Text style={styles.pageSubtitle}>Welcome back! Enter your email to continue.</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TouchableOpacity style={styles.primaryButton} onPress={onSignIn}>
            <Text style={styles.primaryButtonText}>Continue</Text>
          </TouchableOpacity>
          
          <Text style={styles.footerText}>
            Don't have an account? <Text style={styles.linkText}>Sign up</Text>
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

// Daily Tips Page
function DailyTipsPage({ onContinue }: { onContinue: () => void }) {
  return (
    <View style={styles.container}>
      <View style={styles.welcomeContent}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>🔔</Text>
        </View>
        
        <Text style={styles.pageTitle}>Daily Tips</Text>
        <Text style={styles.pageSubtitle}>
          Enable notifications to receive daily tips and stay updated with your AI companion.
        </Text>
        
        <TouchableOpacity style={styles.primaryButton} onPress={onContinue}>
          <Text style={styles.primaryButtonText}>Enable Notifications</Text>
        </TouchableOpacity>
        
        <TouchableOpacity>
          <Text style={styles.secondaryButtonText}>Not now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Chat Page
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

function ChatPage({ onProfile }: { onProfile: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: "Hi! I'm Luna, your personal AI companion. How can I help you today?" },
  ]);
  const [input, setInput] = useState('');
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    
    // Simulate response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Thanks for sharing! Tell me more about what you're thinking.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };
  
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={onProfile} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>←</Text>
          </TouchableOpacity>
          
          <View style={styles.chatHeaderCenter}>
            <Text style={styles.chatHeaderTitle}>Luna</Text>
            <View style={styles.avatarSmall} />
          </View>
          
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerButtonText}>⋯</Text>
          </TouchableOpacity>
        </View>
        
        {/* Messages */}
        <ScrollView style={styles.messagesContainer} contentContainerStyle={styles.messagesContent}>
          {messages.map((msg) => (
            <View key={msg.id} style={[styles.messageRow, msg.role === 'user' ? styles.messageRowRight : styles.messageRowLeft]}>
              <View style={[styles.messageBubble, msg.role === 'user' ? styles.userBubble : styles.assistantBubble]}>
                <Text style={styles.messageText}>{msg.content}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        
        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.chatInput}
            placeholder="Message Luna..."
            placeholderTextColor="#666"
            value={input}
            onChangeText={setInput}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>↑</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

// Profile Page
function ProfilePage({ onBack }: { onBack: () => void }) {
  const menuItems = [
    { icon: '👤', label: 'Edit Profile' },
    { icon: '🔔', label: 'Notifications' },
    { icon: '🎨', label: 'Appearance' },
    { icon: '🔒', label: 'Privacy & Security' },
    { icon: '❓', label: 'Help & Support' },
    { icon: '📤', label: 'Log Out' },
  ];
  
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={onBack} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>←</Text>
          </TouchableOpacity>
          
          <Text style={styles.chatHeaderTitle}>Settings</Text>
          
          <View style={styles.headerButton} />
        </View>
        
        {/* Profile */}
        <View style={styles.profileSection}>
          <View style={styles.avatarLarge} />
          <Text style={styles.profileName}>User</Text>
          <Text style={styles.profileEmail}>user@luna.ai</Text>
        </View>
        
        {/* Menu */}
        <ScrollView style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// Main App
export default function App() {
  const [page, setPage] = useState<'welcome' | 'signin' | 'dailytips' | 'chat' | 'profile'>('welcome');
  
  switch (page) {
    case 'welcome':
      return <WelcomePage onGetStarted={() => setPage('signin')} />;
    case 'signin':
      return <SignInPage onSignIn={() => setPage('dailytips')} onBack={() => setPage('welcome')} />;
    case 'dailytips':
      return <DailyTipsPage onContinue={() => setPage('chat')} />;
    case 'chat':
      return <ChatPage onProfile={() => setPage('profile')} />;
    case 'profile':
      return <ProfilePage onBack={() => setPage('chat')} />;
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  safeArea: {
    flex: 1,
  },
  welcomeContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logoContainer: {
    marginBottom: 32,
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 48,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 24,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 32,
    lineHeight: 24,
  },
  primaryButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 28,
    width: '100%',
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  secondaryButtonText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
  formContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  backButton: {
    padding: 16,
  },
  backButtonText: {
    fontSize: 24,
    color: '#888',
  },
  input: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#fff',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#222',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 24,
  },
  linkText: {
    color: '#8B5CF6',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconText: {
    fontSize: 36,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtonText: {
    fontSize: 24,
    color: '#888',
  },
  chatHeaderCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  chatHeaderTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  avatarSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#8B5CF6',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    gap: 12,
  },
  messageRow: {
    flexDirection: 'row',
  },
  messageRowLeft: {
    justifyContent: 'flex-start',
  },
  messageRowRight: {
    justifyContent: 'flex-end',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: '#8B5CF6',
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: '#222',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#222',
    gap: 8,
  },
  chatInput: {
    flex: 1,
    backgroundColor: '#111',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#fff',
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#222',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: 20,
    color: '#fff',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#8B5CF6',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    color: '#ddd',
  },
  menuArrow: {
    fontSize: 16,
    color: '#666',
  },
});
