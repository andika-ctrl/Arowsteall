import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { investmentPackages } from '@/constants/packages';
import PackageCard from '@/components/PackageCard';
import { useUserStore } from '@/store/useUserStore';
import Header from '@/components/Header';

export default function ProductsScreen() {
  const { balance, subtractBalance, purchasePackage } = useUserStore();
  const [loading, setLoading] = useState(false);

  const handleBuyPackage = (packageId: string, price: number) => {
    if (balance < price) {
      Alert.alert(
        "Saldo Tidak Cukup",
        "Saldo Anda tidak cukup untuk membeli paket ini. Silakan isi ulang saldo Anda.",
        [{ text: "OK" }]
      );
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      subtractBalance(price);
      purchasePackage(packageId);
      
      Alert.alert(
        "Pembelian Berhasil",
        "Paket berhasil dibeli. Anda akan mulai menerima pendapatan harian.",
        [{ text: "OK" }]
      );
      
      setLoading(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Produk" showBackButton={false} />
      
      <FlatList
        data={investmentPackages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PackageCard
            packageData={item}
            onBuyPress={() => handleBuyPackage(item.id, item.price)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  listContent: {
    padding: 16,
  },
});
