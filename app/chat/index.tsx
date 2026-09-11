import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import AppSearchInput from '@/components/filter/appSearchInput';
import { useColor } from '@/providers/colors/colorProvider';
import { ColorType } from '@/types/themes';
import { ChevronLeft } from 'lucide-react-native';

// TODO: thay bằng data thật từ API
type Conversation = {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  isOnline: boolean;
};

const mockConversations: Conversation[] = [
  {
    id: 'landlord_1',
    name: 'Chủ trọ - Cô Hoa',
    lastMessage: 'Dạ con cảm ơn cô ạ',
    lastMessageAt: '2026-09-10T08:35:00',
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: 'support_1',
    name: 'Hỗ trợ kỹ thuật',
    lastMessage: 'Vấn đề của bạn đã được xử lý xong nhé',
    lastMessageAt: '2026-09-09T14:12:00',
    unreadCount: 2,
    isOnline: false,
  },
  {
    id: 'landlord_2',
    name: 'Chủ trọ - Anh Tuấn',
    lastMessage: 'Cuối tháng nhớ đóng tiền phòng em nhé',
    lastMessageAt: '2026-09-08T19:40:00',
    unreadCount: 1,
    isOnline: false,
  },
  {
    id: 'neighbor_1',
    name: 'Phòng 204 - Minh',
    lastMessage: 'Ok bạn ơi, để mình gửi lại',
    lastMessageAt: '2026-09-06T11:02:00',
    unreadCount: 0,
    isOnline: true,
  },
];

function formatTime(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();

  if (isToday) {
    return d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  }

  const diffDays = Math.floor(
    (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diffDays === 1) return 'Hôm qua';
  if (diffDays < 7) return `${diffDays} ngày trước`;

  return d.toLocaleDateString('vi-VN');
}

export default function ChatListScreen() {
  const { colors } = useColor();
  const styles = createStyleSheet(colors);
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  const filteredConversations = mockConversations
    .filter((c) =>
      c.name.toLowerCase().includes(searchText.trim().toLowerCase())
    )
    .sort(
      (a, b) =>
        new Date(b.lastMessageAt).getTime() -
        new Date(a.lastMessageAt).getTime()
    );

  const handleOpenChat = (conversationId: string) => {
    // TODO: điều hướng sang màn chat chi tiết kèm id
    router.push(`/chat/chatBox?id=${conversationId}`);
  };

  const renderItem = ({ item }: { item: Conversation }) => (
    <TouchableOpacity
      style={styles.conversationItem}
      activeOpacity={0.7}
      onPress={() => handleOpenChat(item.id)}
    >
      <View style={styles.avatarWrapper}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        {item.isOnline && <View style={styles.onlineDot} />}
      </View>

      <View style={styles.conversationContent}>
        <View style={styles.rowBetween}>
          <Text
            style={[
              styles.conversationName,
              item.unreadCount > 0 && styles.boldText,
            ]}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <Text style={styles.timeText}>{formatTime(item.lastMessageAt)}</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text
            style={[
              styles.lastMessage,
              item.unreadCount > 0 && styles.boldText,
            ]}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>
                {item.unreadCount > 9 ? '9+' : item.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()} style={styles.goBackButton}>
            <ChevronLeft size={26} color={colors.primaryText}/>
        </Pressable>
        <Text style={styles.headerTitle}>Tin nhắn</Text>
      </View>

      {/* Search */}
      <View style={styles.searchWrapper}>
        <AppSearchInput
            placeholder='Tìm kiếm cuộc trò chuyện'
            onChangeText={setSearchText}
            value={searchText}
        />
      </View>

      {/* Conversation list */}
      <FlatList
        data={filteredConversations}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Không tìm thấy cuộc trò chuyện nào</Text>
          </View>
        }
      />
    </View>
  );
}

const createStyleSheet = (colors: ColorType) =>
  StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 8,
        paddingTop: 12,
        paddingBottom: 10,
        gap: 4,
        flexDirection: "row",
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: '700',
        color: colors.primaryText,
    },
    goBackButton:{
        justifyContent: 'center'
    }
    ,
    searchWrapper: {
        paddingHorizontal: 16,
        paddingBottom: 8,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        flexGrow: 1,
    },
    separator: {
        height: 1,
        backgroundColor: colors.surfaceSecondary,
        marginLeft: 60,
    },
    conversationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 12,
    },
    avatarWrapper: {

    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.buttonBackground,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        color: colors.buttonText,
        fontWeight: '700',
        fontSize: 18,
    },
    onlineDot: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#4CAF50',
        borderWidth: 2,
        borderColor: colors.surface,
    },
    conversationContent: {
        flex: 1,
        gap: 4,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
    },
    conversationName: {
        fontSize: 15,
        fontWeight: '500',
        color: colors.primaryText,
        flex: 1,
    },
    boldText: {
        fontWeight: '700',
    },
    timeText: {
        fontSize: 12,
        color: colors.secondaryText,
    },
    lastMessage: {
        fontSize: 13,
        color: colors.secondaryText,
        flex: 1,
    },
    unreadBadge: {
        backgroundColor: colors.buttonBackground,
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    unreadBadgeText: {
        color: colors.buttonText,
        fontSize: 11,
        fontWeight: '700',
    },
    emptyContainer: {
        paddingTop: 60,
        alignItems: 'center',
    },
    emptyText: {
        color: colors.secondaryText,
        fontSize: 14,
    },
  });