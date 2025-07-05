import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Copy } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useUserStore } from '@/store/useUserStore';
import Header from '@/components/Header';
import TeamMemberCard from '@/components/TeamMemberCard';
import Button from '@/components/Button';

export default function TeamScreen() {
  const { referralCode, teamMembers } = useUserStore();
  const [activeTab, setActiveTab] = useState(0);
  
  // Calculate team members by level
  const level1Members = teamMembers.filter(member => member.level === 1);
  const level2Members = teamMembers.filter(member => member.level === 2);
  const level3Members = teamMembers.filter(member => member.level === 3);
  
  const handleCopyCode = () => {
    // In a real app, you would use Clipboard.setString(referralCode)
    alert('Kode referral disalin: ' + referralCode);
  };
  
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Bergabunglah dengan Arowsteall dan dapatkan penghasilan harian! Gunakan kode referral saya: ${referralCode} atau klik link berikut: https://arowsteall.com/register?code=${referralCode}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderTabContent = () => {
    let currentMembers = [];
    let memberCount = 0;
    
    switch (activeTab) {
      case 0:
        currentMembers = level1Members;
        memberCount = level1Members.length;
        break;
      case 1:
        currentMembers = level2Members;
        memberCount = level2Members.length;
        break;
      case 2:
        currentMembers = level3Members;
        memberCount = level3Members.length;
        break;
    }
    
    return (
      <View style={styles.tabContent}>
        <Text style={styles.memberCount}>Anggota Tim</Text>
        <Text style={styles.memberCountValue}>{memberCount}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.memberCount}>Isi Ulang Tim</Text>
        <Text style={styles.memberCountValue}>Rp 0</Text>
        
        {currentMembers.length > 0 ? (
          currentMembers.map((member, index) => (
            <TeamMemberCard
              key={index}
              username={member.username}
              accountId={member.id}
              date={member.joinDate}
              amount={member.investment}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              {activeTab === 0 
                ? "Belum ada anggota tim. Bagikan kode referral Anda untuk mengundang teman."
                : activeTab === 1
                ? "Belum ada anggota tim level 2. Anggota tim level 1 Anda perlu mengundang teman."
                : "Belum ada anggota tim level 3. Anggota tim level 2 Anda perlu mengundang teman."
              }
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Tim" showBackButton={false} />
      
      <ScrollView>
        <View style={styles.heroSection}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' }} 
            style={styles.heroImage} 
          />
          <Text style={styles.inviteText}>Mulai mengundang teman sekarang</Text>
          <Text style={styles.inviteSubtext}>Bagikan kode atau tautan undangan</Text>
          
          <View style={styles.codeContainer}>
            <Text style={styles.referralCode}>{referralCode}</Text>
            <TouchableOpacity onPress={handleCopyCode} style={styles.copyButton}>
              <Text style={styles.copyText}>Salin</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.linkContainer}>
            <Text style={styles.referralLink} numberOfLines={1}>
              https://arowsteall.com/register?code={referralCode}
            </Text>
            <TouchableOpacity onPress={handleShare} style={styles.copyButton}>
              <Text style={styles.copyText}>Salin</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{teamMembers.length}</Text>
              <Text style={styles.statLabel}>Total pengguna</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>Rp 0</Text>
              <Text style={styles.statLabel}>Total Hadiah</Text>
            </View>
          </View>
          
          <Text style={styles.inviteTitle}>
            UNDANG TEMAN UNTUK BERGABUNG DENGAN TIM
          </Text>
          
          <View style={styles.commissionContainer}>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>LV1</Text>
            </View>
            <View style={styles.commissionInfo}>
              <Text style={styles.commissionRate}>35%</Text>
              <Text style={styles.commissionLabel}>Komisi</Text>
            </View>
            <View style={styles.commissionInfo}>
              <Text style={styles.commissionRate}>{level1Members.length}</Text>
              <Text style={styles.commissionLabel}>Pengguna</Text>
            </View>
            <View style={styles.commissionInfo}>
              <Text style={styles.commissionRate}>0</Text>
              <Text style={styles.commissionLabel}>Hadiah</Text>
            </View>
          </View>
          
          <View style={styles.commissionContainer}>
            <View style={[styles.levelBadge, { backgroundColor: Colors.secondary }]}>
              <Text style={styles.levelText}>LV2</Text>
            </View>
            <View style={styles.commissionInfo}>
              <Text style={styles.commissionRate}>3%</Text>
              <Text style={styles.commissionLabel}>Komisi</Text>
            </View>
            <View style={styles.commissionInfo}>
              <Text style={styles.commissionRate}>{level2Members.length}</Text>
              <Text style={styles.commissionLabel}>Pengguna</Text>
            </View>
            <View style={styles.commissionInfo}>
              <Text style={styles.commissionRate}>0</Text>
              <Text style={styles.commissionLabel}>Hadiah</Text>
            </View>
          </View>
          
          <View style={styles.commissionContainer}>
            <View style={[styles.levelBadge, { backgroundColor: Colors.accent }]}>
              <Text style={styles.levelText}>LV3</Text>
            </View>
            <View style={styles.commissionInfo}>
              <Text style={styles.commissionRate}>2%</Text>
              <Text style={styles.commissionLabel}>Komisi</Text>
            </View>
            <View style={styles.commissionInfo}>
              <Text style={styles.commissionRate}>{level3Members.length}</Text>
              <Text style={styles.commissionLabel}>Pengguna</Text>
            </View>
            <View style={styles.commissionInfo}>
              <Text style={styles.commissionRate}>0</Text>
              <Text style={styles.commissionLabel}>Hadiah</Text>
            </View>
          </View>
          
          <Text style={styles.commissionText}>
            Saat teman yang Anda undang mendaftar dan berinvestasi, Anda akan langsung menerima bonus tunai sebesar 35% dari jumlah investasi mereka.
          </Text>
          <Text style={styles.commissionText}>
            Saat anggota tim level 2 Anda berinvestasi, Anda akan menerima bonus tunai sebesar 3%.
          </Text>
          <Text style={styles.commissionText}>
            Saat anggota tim level 3 Anda berinvestasi, Anda akan menerima bonus tunai sebesar 2%.
          </Text>
          <Text style={styles.commissionText}>
            Setelah anggota tim Anda berinvestasi, bonus tunai akan langsung disetorkan ke saldo akun Anda dan Anda dapat segera menariknya.
          </Text>
        </View>
        
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 0 && styles.activeTab]} 
            onPress={() => setActiveTab(0)}
          >
            <Text style={[styles.tabText, activeTab === 0 && styles.activeTabText]}>Level 1</Text>
            {activeTab === 0 && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 1 && styles.activeTab]} 
            onPress={() => setActiveTab(1)}
          >
            <Text style={[styles.tabText, activeTab === 1 && styles.activeTabText]}>Level 2</Text>
            {activeTab === 1 && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 2 && styles.activeTab]} 
            onPress={() => setActiveTab(2)}
          >
            <Text style={[styles.tabText, activeTab === 2 && styles.activeTabText]}>Level 3</Text>
            {activeTab === 2 && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        </View>
        
        {renderTabContent()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  heroSection: {
    padding: 16,
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  inviteText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
  },
  inviteSubtext: {
    fontSize: 14,
    color: Colors.darkGray,
    textAlign: 'center',
    marginBottom: 16,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    marginBottom: 12,
  },
  referralCode: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    padding: 12,
  },
  copyButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  copyText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    marginBottom: 24,
  },
  referralLink: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
    padding: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 4,
  },
  inviteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 16,
  },
  commissionContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },
  levelBadge: {
    width: 60,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  levelText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  commissionInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  commissionRate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  commissionLabel: {
    fontSize: 12,
    color: Colors.darkGray,
    marginTop: 4,
  },
  commissionText: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 8,
    lineHeight: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    backgroundColor: Colors.background,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    position: 'relative',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 16,
    color: Colors.darkGray,
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: '500',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: Colors.primary,
  },
  tabContent: {
    padding: 16,
  },
  memberCount: {
    fontSize: 16,
    color: Colors.darkGray,
  },
  memberCountValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.lightGray,
    marginVertical: 16,
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: Colors.darkGray,
    textAlign: 'center',
    lineHeight: 20,
  },
});
