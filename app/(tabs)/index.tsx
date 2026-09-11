import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useAuth } from '@/providers/auth/authProvider';
import { useColor } from '@/providers/colors/colorProvider';
import { ColorType } from '@/types/themes';
import { Redirect } from 'expo-router';

// TODO: thay bằng data thật từ API/store (react-query, zustand, ...)
const mockRoomInfo = {
  roomCode: 'P203',
  address: '123 Nguyễn Văn Cừ, Q.5, TP.HCM',
  area: 20, // m2
  price: 3500000, // VNĐ/tháng
};

const mockContractInfo = {
  startDate: '2025-09-01',
  endDate: '2026-09-01',
};

const mockPaymentInfo = {
  rentAmount: 3500000,
  electricAmount: 250000,
  waterAmount: 100000,
  dueDate: '2026-09-15',
  status: 'unpaid' as 'unpaid' | 'paid' | 'overdue',
};

function formatCurrency(value: number) {
  return value.toLocaleString('vi-VN') + 'đ';
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN');
}

function getContractProgress(start: string, end: string) {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  const now = Date.now();

  const totalDays = Math.round((endTime - startTime) / (1000 * 60 * 60 * 24));
  const remainingDays = Math.max(
    0,
    Math.round((endTime - now) / (1000 * 60 * 60 * 24))
  );
  const passedDays = totalDays - remainingDays;
  const percent = totalDays > 0 ? Math.min(100, (passedDays / totalDays) * 100) : 0;

  return { totalDays, remainingDays, percent };
}

export default function HomeScreen() {
  const { isLoggedIn } = useAuth();
  const { colors } = useColor();
  const styles = createStyleSheet(colors);

  if (!isLoggedIn) {
    return <Redirect href={'/login'} />;
  }

  const { remainingDays, percent } = getContractProgress(
    mockContractInfo.startDate,
    mockContractInfo.endDate
  );

  const totalDue =
    mockPaymentInfo.rentAmount +
    mockPaymentInfo.electricAmount +
    mockPaymentInfo.waterAmount;

  const statusLabel =
    mockPaymentInfo.status === 'paid'
      ? 'Đã thanh toán'
      : mockPaymentInfo.status === 'overdue'
      ? 'Quá hạn'
      : 'Chưa thanh toán';

  const statusColor =
    mockPaymentInfo.status === 'paid'
      ? '#4CAF50'
      : mockPaymentInfo.status === 'overdue'
      ? '#F44336'
      : '#FF9800';

  return (
    <ScrollView
      style={styles.homeContainer}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Greeting */}
      <View>
        <Text style={styles.greeting}>Xin chào Hoàng Nghi</Text>
        <Text style={styles.subGreeting}>Chúc bạn một ngày tốt lành</Text>
      </View>

      {/* Room info card */}
      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>Phòng của bạn</Text>
          <View style={styles.roomCodeBadge}>
            <Text style={styles.roomCodeText}>{mockRoomInfo.roomCode}</Text>
          </View>
        </View>
        <Text style={styles.address}>{mockRoomInfo.address}</Text>
        <View style={styles.rowBetween}>
          <Text style={styles.infoLabel}>Diện tích</Text>
          <Text style={styles.infoValue}>{mockRoomInfo.area} m²</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.infoLabel}>Giá thuê</Text>
          <Text style={styles.infoValue}>
            {formatCurrency(mockRoomInfo.price)}/tháng
          </Text>
        </View>
      </View>

      {/* Contract card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Hợp đồng thuê</Text>
        <View style={styles.rowBetween}>
          <Text style={styles.infoLabel}>Ngày bắt đầu</Text>
          <Text style={styles.infoValue}>
            {formatDate(mockContractInfo.startDate)}
          </Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.infoLabel}>Ngày kết thúc</Text>
          <Text style={styles.infoValue}>
            {formatDate(mockContractInfo.endDate)}
          </Text>
        </View>

        <View style={styles.progressBarBackground}>
          <View
            style={[styles.progressBarFill, { width: `${percent}%` }]}
          />
        </View>
        <Text style={styles.remainingText}>
          Còn <Text style={styles.remainingHighlight}>{remainingDays}</Text>{' '}
          ngày trước khi hết hạn hợp đồng
        </Text>
      </View>

      {/* Payment card */}
      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>Thanh toán kỳ này</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: statusColor + '20' },
            ]}
          >
            <Text style={[styles.statusText, { color: statusColor }]}>
              {statusLabel}
            </Text>
          </View>
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.infoLabel}>Tiền phòng</Text>
          <Text style={styles.infoValue}>
            {formatCurrency(mockPaymentInfo.rentAmount)}
          </Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.infoLabel}>Tiền điện</Text>
          <Text style={styles.infoValue}>
            {formatCurrency(mockPaymentInfo.electricAmount)}
          </Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.infoLabel}>Tiền nước</Text>
          <Text style={styles.infoValue}>
            {formatCurrency(mockPaymentInfo.waterAmount)}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.rowBetween}>
          <Text style={styles.totalLabel}>Tổng cộng</Text>
          <Text style={styles.totalValue}>{formatCurrency(totalDue)}</Text>
        </View>
        <Text style={styles.dueDateText}>
          Hạn thanh toán: {formatDate(mockPaymentInfo.dueDate)}
        </Text>

        <TouchableOpacity style={styles.payButton} activeOpacity={0.8}>
          <Text style={styles.payButtonText}>Thanh toán ngay</Text>
        </TouchableOpacity>
      </View>

      {/* Quick actions */}
      <View style={styles.quickActionsRow}>
        <TouchableOpacity style={styles.quickActionItem} activeOpacity={0.8}>
          <Text style={styles.quickActionText}>Xem hợp đồng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionItem} activeOpacity={0.8}>
          <Text style={styles.quickActionText}>Báo sự cố</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionItem} activeOpacity={0.8}>
          <Text style={styles.quickActionText}>Liên hệ chủ trọ</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const createStyleSheet = (colors: ColorType) =>
  StyleSheet.create({
    homeContainer: {
      flex: 1,
      backgroundColor: colors.surface,
    },
    contentContainer: {
      padding: 16,
      gap: 16,
      paddingBottom: 32,
    },
    greeting: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.primaryText,
    },
    subGreeting: {
      fontSize: 14,
      color: colors.secondaryText,
      marginTop: 2,
    },
    card: {
      backgroundColor: colors.surfaceSecondary,
      borderRadius: 16,
      padding: 16,
      gap: 8,
    },
    cardHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.primaryText,
    },
    roomCodeBadge: {
      backgroundColor: colors.buttonBackground,
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    roomCodeText: {
      color: colors.buttonText,
      fontWeight: '700',
      fontSize: 13,
    },
    address: {
      fontSize: 13,
      color: colors.secondaryText,
      marginBottom: 4,
    },
    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    infoLabel: {
      fontSize: 14,
      color: colors.secondaryText,
    },
    infoValue: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.primaryText,
    },
    progressBarBackground: {
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.background,
      overflow: 'hidden',
      marginTop: 8,
    },
    progressBarFill: {
      height: '100%',
      backgroundColor: colors.buttonBackground,
      borderRadius: 4,
    },
    remainingText: {
      fontSize: 13,
      color: colors.secondaryText,
      marginTop: 4,
    },
    remainingHighlight: {
      color: colors.primaryText,
      fontWeight: '700',
    },
    statusBadge: {
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    statusText: {
      fontSize: 12,
      fontWeight: '700',
    },
    divider: {
      height: 1,
      backgroundColor: colors.background,
      marginVertical: 4,
    },
    totalLabel: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.primaryText,
    },
    totalValue: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.primaryText,
    },
    dueDateText: {
      fontSize: 12,
      color: colors.secondaryText,
      marginTop: 2,
    },
    payButton: {
      backgroundColor: colors.buttonBackground,
      borderRadius: 12,
      paddingVertical: 12,
      alignItems: 'center',
      marginTop: 8,
    },
    payButtonText: {
      color: colors.buttonText,
      fontWeight: '700',
      fontSize: 15,
    },
    quickActionsRow: {
      flexDirection: 'row',
      gap: 10,
    },
    quickActionItem: {
      flex: 1,
      backgroundColor: colors.surfaceSecondary,
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: 'center',
    },
    quickActionText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.primaryText,
      textAlign: 'center',
    },
  });