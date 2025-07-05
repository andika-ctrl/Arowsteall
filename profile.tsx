import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  DollarSign, 
  ArrowUpFromLine, 
  HelpCircle, 
  Calendar, 
  Info, 
  FileText, 
  Clock, 
  MessageCircle, 
  Download, 
  CreditCard, 
  Lock, 
  Gift 
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useUserStore } from '@/store/useUserStore';
import { formatCurrency } from '@/utils/formatters';

export default function ProfileScreen() {
  const router = useRouter();
  const { username, phoneNumber, balance, totalEarnings, level, logout } = useUserStore();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Saya</Text>
        </View>
        
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?ixlib=rb-1.2.1&auto=format&fit=crop&w=80&q=80' }} 
              style={styles.avatar} 
            />
            <View style={styles.userInfo}>
              <Text style={styles.phoneNumber}>{phoneNumber || '+62 88226507430'}</Text>
              <View style={styles.levelBadge}>
                <Text style={styles.levelText}>Lv{level}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
              <Text style={styles.logoutText}>Keluar</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.balanceRow}>
            <View style={styles.balanceItem}>
              <Text style={styles.balanceValue}>{formatCurrency(balance)}</Text>
              <Text style={styles.balanceLabel}>Saldo Akun</Text>
            </View>
            <View style={styles.balanceDivider} />
            <View style={styles.balanceItem}>
              <Text style={styles.balanceValue}>{formatCurrency(totalEarnings)}</Text>
              <Text style={styles.balanceLabel}>Total Pendapatan</Text>
            </View>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/deposit')}
            >
              <View style={styles.actionIcon}>
                <DollarSign size={24} color="#000" />
              </View>
              <Text style={styles.actionText}>Isi Saldo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/withdraw')}
            >
              <View style={styles.actionIcon}>
                <ArrowUpFromLine size={24} color="#000" />
              </View>
              <Text style={styles.actionText}>Tarik Dana</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/customer-service')}
            >
              <View style={styles.actionIcon}>
                <HelpCircle size={24} color="#000" />
              </View>
              <Text style={styles.actionText}>Bantuan</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/check-in')}
            >
              <View style={styles.actionIcon}>
                <Calendar size={24} color="#000" />
              </View>
              <Text style={styles.actionText}>Check-in</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.taskCard}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' }} 
            style={styles.taskImage} 
          />
          <View style={styles.taskContent}>
            <Text style={styles.taskTitle}>Pusat Tugas</Text>
            <Text style={styles.taskDescription}>
              Selesaikan tugas dan dapatkan bonus menarik
            </Text>
            <TouchableOpacity 
              style={styles.taskButton}
              onPress={() => router.push('/team')}
            >
              <Text style={styles.taskButtonText}>MULAI</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Lainnya</Text>
        
        <View style={styles.menuSection}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/about')}
          >
            <View style={styles.menuIcon}>
              <Info size={24} color="#000" />
            </View>
            <Text style={styles.menuText}>Tentang Kami</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/rules')}
          >
            <View style={styles.menuIcon}>
              <FileText size={24} color="#000" />
            </View>
            <Text style={styles.menuText}>Peraturan</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/history')}
          >
            <View style={styles.menuIcon}>
              <Clock size={24} color="#000" />
            </View>
            <Text style={styles.menuText}>Riwayat</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/customer-service')}
          >
            <View style={styles.menuIcon}>
              <MessageCircle size={24} color="#000" />
            </View>
            <Text style={styles.menuText}>Layanan Pelanggan</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.menuSection}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/download')}
          >
            <View style={styles.menuIcon}>
              <Download size={24} color="#000" />
            </View>
            <Text style={styles.menuText}>Unduh Aplikasi</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/bank-account')}
          >
            <View style={styles.menuIcon}>
              <CreditCard size={24} color="#000" />
            </View>
            <Text style={styles.menuText}>Tautkan Kartu Bank</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/change-password')}
          >
            <View style={styles.menuIcon}>
              <Lock size={24} color="#000" />
            </View>
            <Text style={styles.menuText}>Ubah Kata Sandi</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/redeem-code')}
          >
            <View style={styles.menuIcon}>
              <Gift size={24} color="#000" />
            </View>
            <Text style={styles.menuText}>Tukar Hadiah</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  profileCard: {
    backgroundColor: Colors.background,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  userInfo: {
    marginLeft: 12,
    flex: 1,
  },
  phoneNumber: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  levelBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  levelText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  logoutButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  logoutText: {
    fontSize: 14,
    color: Colors.darkGray,
  },
  balanceRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    paddingTop: 16,
    marginBottom: 16,
  },
  balanceItem: {
    flex: 1,
    alignItems: 'center',
  },
  balanceDivider: {
    width: 1,
    backgroundColor: Colors.lightGray,
  },
  balanceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  balanceLabel: {
    fontSize: 14,
    color: Colors.darkGray,
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: Colors.text,
  },
  taskCard: {
    backgroundColor: Colors.background,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskImage: {
    width: '100%',
    height: 120,
  },
  taskContent: {
    padding: 16,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  taskDescription: {
    fontSize: 14,
    color: Colors.darkGray,
    marginTop: 4,
    marginBottom: 12,
  },
  taskButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignSelf: 'flex-end',
  },
  taskButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  menuSection: {
    backgroundColor: Colors.background,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    fontSize: 16,
    color: Colors.text,
  },
});
