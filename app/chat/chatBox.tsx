import { useRef, useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { useColor } from '@/providers/colors/colorProvider';
import { ColorType } from '@/types/themes';
import { Paperclip, SendHorizonal } from 'lucide-react-native';

// TODO: thay bằng data thật (API/socket)
type Message = {
  id: string;
  text: string;
  senderId: string;
  createdAt: string;
};

const CURRENT_USER_ID = 'tenant_1';
const OTHER_USER = {
  id: 'landlord_1',
  name: 'Chủ trọ - Cô Hoa',
};

const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Chào em, phòng em ở còn vấn đề gì không?',
    senderId: 'landlord_1',
    createdAt: '2026-09-10T08:30:00',
  },
  {
    id: '2',
    text: 'Dạ chào cô, phòng con vòi nước bị rỉ ạ',
    senderId: 'tenant_1',
    createdAt: '2026-09-10T08:32:00',
  },
  {
    id: '3',
    text: 'Ok để cô kêu thợ qua sửa nhé',
    senderId: 'landlord_1',
    createdAt: '2026-09-10T08:33:00',
  },
  {
    id: '4',
    text: 'Dạ con cảm ơn cô ạ',
    senderId: 'tenant_1',
    createdAt: '2026-09-10T08:35:00',
  },
];

function formatTime(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
}

export default function ChatScreen() {
  const { colors } = useColor();
  const styles = createStyleSheet(colors);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputText, setInputText] = useState('');
  const listRef = useRef<FlatList>(null);

  const handleSend = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: trimmed,
      senderId: CURRENT_USER_ID,
      createdAt: new Date().toISOString(),
    };

    // TODO: gọi API/socket gửi tin nhắn thật ở đây
    setMessages((prev) => [...prev, newMessage]);
    setInputText('');

    setTimeout(() => {
      listRef.current?.scrollToEnd({ animated: true });
    }, 50);
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isMine = item.senderId === CURRENT_USER_ID;
    return (
      <View
        style={[
          styles.messageRow,
          isMine ? styles.messageRowRight : styles.messageRowLeft,
        ]}
      >
        <View
          style={[
            styles.bubble,
            isMine ? styles.bubbleMine : styles.bubbleOther,
          ]}
        >
          <Text style={isMine ? styles.bubbleTextMine : styles.bubbleTextOther}>
            {item.text}
          </Text>
        </View>
        <Text
          style={[
            styles.timeText,
            isMine ? styles.timeTextRight : styles.timeTextLeft,
          ]}
        >
          {formatTime(item.createdAt)}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : "padding"}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {OTHER_USER.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View>
          <Text style={styles.headerName}>{OTHER_USER.name}</Text>
          <Text style={styles.headerStatus}>Đang hoạt động</Text>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        onContentSizeChange={() =>
          listRef.current?.scrollToEnd({ animated: false })
        }
      />

      {/* Input bar */}
      <View style={styles.inputBar}>
        <TouchableOpacity
          style={[
            styles.sendButton,
            !inputText.trim() && styles.sendButtonDisabled,
          ]}
          onPress={handleSend}
          disabled={!inputText.trim()}
          activeOpacity={0.8}
        >
            <Paperclip color={styles.sendButtonText.color} size={18}/>
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Nhập tin nhắn..."
          placeholderTextColor={colors.secondaryText}
          value={inputText}
          onChangeText={setInputText}
          multiline
        />

        <TouchableOpacity
          style={[
            styles.sendButton,
            !inputText.trim() && styles.sendButtonDisabled,
          ]}
          onPress={handleSend}
          disabled={!inputText.trim()}
          activeOpacity={0.8}
        >
          <SendHorizonal color={styles.sendButtonText.color} size={18}/>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const createStyleSheet = (colors: ColorType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.surface,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.surfaceSecondary,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.buttonBackground,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarText: {
      color: colors.buttonText,
      fontWeight: '700',
      fontSize: 16,
    },
    headerName: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.primaryText,
    },
    headerStatus: {
      fontSize: 12,
      color: colors.secondaryText,
      marginTop: 2,
    },
    listContent: {
      padding: 16,
      gap: 12,
      flexGrow: 1,
    },
    messageRow: {
      maxWidth: '80%',
    },
    messageRowLeft: {
      alignSelf: 'flex-start',
      alignItems: 'flex-start',
    },
    messageRowRight: {
      alignSelf: 'flex-end',
      alignItems: 'flex-end',
    },
    bubble: {
      borderRadius: 16,
      paddingHorizontal: 14,
      paddingVertical: 10,
    },
    bubbleOther: {
      backgroundColor: colors.surfaceSecondary,
      borderTopLeftRadius: 4,
    },
    bubbleMine: {
      backgroundColor: colors.buttonBackground,
      borderTopRightRadius: 4,
    },
    bubbleTextOther: {
      color: colors.primaryText,
      fontSize: 14,
      lineHeight: 20,
    },
    bubbleTextMine: {
      color: colors.buttonText,
      fontSize: 14,
      lineHeight: 20,
    },
    timeText: {
      fontSize: 10,
      color: colors.secondaryText,
      marginTop: 4,
    },
    timeTextLeft: {
      marginLeft: 4,
    },
    timeTextRight: {
      marginRight: 4,
    },
    inputBar: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      backgroundColor: colors.surfaceSecondary,
    },
    textInput: {
      flex: 1,
      backgroundColor: colors.background,
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 10,
      color: colors.primaryText,
      fontSize: 14,
      maxHeight: 100,
    },
    sendButton: {
        backgroundColor: colors.buttonBackground,
        borderRadius: 20,
        padding: 10,
    },
    sendButtonDisabled: {
      opacity: 0.5,
    },
    sendButtonText: {
      color: colors.buttonText,
      fontWeight: '700',
      fontSize: 14,
    },
  });