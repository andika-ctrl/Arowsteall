import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, DollarSign, ArrowDownToLine, ArrowUpFromLine, HelpCircle } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { useUserStore } from '@/store/useUserStore';
import { formatCurrency } from '@/utils/formatters';
import { cities } from '@/constants/cities';

export default function HomeScreen() {
  const router = useRouter();
  const { balance, totalEarnings, checkIn, lastCheckInDate } = useUserStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const canCheckIn = !lastCheckInDate || lastCheckInDate !== currentDate.toISOString().split('T')[0];
  
  const handleCheckIn = () => {
    if (canCheckIn) {
      checkIn();
      router.push('/check-in');
    } else {
      router.push('/check-in');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?ixlib=rb-1.2.1&auto=format&fit=crop&w=80&q=80' }} 
            style={styles.logo} 
          />
          <Text style={styles.headerTitle}>Arowsteall</Text>
        </View>
        
        <View style={styles.balanceContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' }} 
            style={styles.balanceBackground} 
          />
          <View style={styles.balanceContent}>
            <View style={styles.balanceRow}>
              <View style={styles.balanceItem}>
                <Text style={styles.balanceLabel}>Saldo Akun</Text>
                <Text style={styles.balanceValue}>{formatCurrency(balance)}</Text>
              </View>
              <View style={styles.balanceItem}>
                <Text style={styles.balanceLabel}>Total Pendapatan</Text>
                <Text style={styles.balanceValue}>{formatCurrency(totalEarnings)}</Text>
              </View>
            </View>
            
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => router.push('/deposit')}
              >
                <View style={styles.actionIcon}>
                  <DollarSign size={24} color={Colors.primary} />
                </View>
                <Text style={styles.actionText}>Isi Saldo</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => router.push('/withdraw')}
              >
                <View style={styles.actionIcon}>
                  <ArrowUpFromLine size={24} color={Colors.primary} />
                </View>
                <Text style={styles.actionText}>Tarik Dana</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => router.push('/customer-service')}
              >
                <View style={styles.actionIcon}>
                  <HelpCircle size={24} color={Colors.primary} />
                </View>
                <Text style={styles.actionText}>Bantuan</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={handleCheckIn}
              >
                <View style={styles.actionIcon}>
                  <Calendar size={24} color={Colors.primary} />
                </View>
                <Text style={styles.actionText}>Check-in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <Card style={styles.taskCard}>
          <View style={styles.taskHeader}>
            <Text style={styles.taskTitle}>Pusat Tugas</Text>
            <Button 
              title="MULAI" 
              onPress={() => router.push('/team')}
              size="small"
              style={styles.taskButton}
            />
          </View>
          <Text style={styles.taskDescription}>
            Selesaikan tugas dan dapatkan bonus menarik
          </Text>
          
          <View style={styles.taskLevel}>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>Lv1</Text>
            </View>
            <View style={styles.taskProgress}>
              <Text style={styles.taskTarget}>Undang 3 investor Level 1 untuk mendapatkan: {formatCurrency(6000)}</Text>
              <View style={styles.progressRow}>
                <Text style={styles.progressText}>0</Text>
                <Text style={styles.progressText}>3</Text>
                <Text style={styles.progressText}>0/3</Text>
              </View>
              <View style={styles.progressLabels}>
                <Text style={styles.progressLabel}>Saat Ini</Text>
                <Text style={styles.progressLabel}>Target</Text>
                <Text style={styles.progressLabel}>Kemajuan</Text>
              </View>
              <View style={styles.progressStatus}>
                <Text style={styles.statusText}>Dalam Proses</Text>
              </View>
            </View>
          </View>
        </Card>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lokasi</Text>
          <Text style={styles.sectionSubtitle}>Kota Kami</Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.citiesContainer}
          >
            {cities.map((city) => (
              <View key={city.id} style={styles.cityCard}>
                <Image source={{ uri: city.image }} style={styles.cityImage} />
              </View>
            ))}
          </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginLeft: 8,
  },
  balanceContainer: {
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  balanceBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  balanceContent: {
    padding: 16,
    backgroundColor: 'rgba(0, 102, 204, 0.8)',
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  balanceItem: {
    flex: 1,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  balanceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
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
    marginHorizontal: 16,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  taskButton: {
    paddingHorizontal: 16,
  },
  taskDescription: {
    fontSize: 14,
    color: Colors.darkGray,
    marginBottom: 16,
  },
  taskLevel: {
    flexDirection: 'row',
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    overflow: 'hidden',
  },
  levelBadge: {
    width: 60,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  taskProgress: {
    flex: 1,
    padding: 12,
  },
  taskTarget: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 8,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 12,
    color: Colors.darkGray,
  },
  progressStatus: {
    marginTop: 12,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    color: Colors.darkGray,
    backgroundColor: '#E9ECEF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  section: {
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: Colors.darkGray,
    marginBottom: 16,
  },
  citiesContainer: {
    paddingBottom: 16,
  },
  cityCard: {
    width: 120,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  cityImage: {
    width: '100%',
    height: '100%',
  },
});
