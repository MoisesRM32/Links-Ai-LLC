import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Brand colors extracted from image_b64504.png
const COLORS = {
  primary: '#004D24', // LINX dark green
  background: '#FFFFFF',
  surface: '#F4F5F4',
  text: '#1A1A1A',
  textSecondary: '#666666',
};

// --- PLAY FLOW SCREENS (Stack) ---
function PlayHomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.brandTitle}>LINX</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardSubtitle}>READY TO PLAY?</Text>
          <View style={styles.imagePlaceholder} />
          <Text style={styles.courseTitle}>Oso Creek Golf Course</Text>
          <Text style={styles.courseDetails}>18 Holes • Par 70 • 6,352 Yds</Text>
          
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate('StartRound')}
          >
            <Text style={styles.primaryButtonText}>Start Round</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardSubtitle}>ALREADY PLAYED?</Text>
          <TouchableOpacity style={styles.actionRow}>
            <Ionicons name="scan-outline" size={24} color={COLORS.primary} />
            <Text style={styles.actionText}>Scan Scorecard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionRow}>
            <Ionicons name="pencil-outline" size={24} color={COLORS.primary} />
            <Text style={styles.actionText}>Enter Scores manually</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StartRoundScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Start a Round</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.content}>
        <Text style={styles.courseTitle}>Oso Creek Golf Course</Text>
        <TouchableOpacity 
          style={[styles.primaryButton, { marginTop: 'auto', marginBottom: 20 }]}
          onPress={() => navigation.navigate('EnterScores')}
        >
          <Text style={styles.primaryButtonText}>Start Round</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function EnterScoresScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Enter Scores</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.content}>
        <Text style={styles.courseTitle}>Hole 1</Text>
        <TouchableOpacity 
          style={[styles.primaryButton, { marginTop: 'auto', marginBottom: 20 }]}
          onPress={() => navigation.navigate('RoundComplete')}
        >
          <Text style={styles.primaryButtonText}>Save & Next Hole</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function RoundCompleteScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={[styles.brandTitle, { marginTop: 40 }]}>LINX</Text>
        <Text style={styles.headerTitle}>Round Complete</Text>
      </View>
    </SafeAreaView>
  );
}

// --- MAIN TAB SCREENS ---
function FeedScreen() {
  return (
    <View style={styles.centeredContainer}>
      <Text style={styles.brandTitle}>LINX</Text>
      <Text style={styles.courseTitle}>Your Feed</Text>
    </View>
  );
}

function GroupsScreen() {
  return (
    <View style={styles.centeredContainer}>
      <Text style={styles.brandTitle}>LINX</Text>
      <Text style={styles.courseTitle}>Groups</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.centeredContainer}>
      <Text style={styles.brandTitle}>LINX</Text>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>CV</Text>
      </View>
      <Text style={styles.courseTitle}>Christian Valdez</Text>
    </View>
  );
}

// --- NAVIGATORS ---
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function PlayStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PlayHome" component={PlayHomeScreen} />
      <Stack.Screen name="StartRound" component={StartRoundScreen} />
      <Stack.Screen name="EnterScores" component={EnterScoresScreen} />
      <Stack.Screen name="RoundComplete" component={RoundCompleteScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.textSecondary,
          tabBarStyle: {
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Feed') iconName = 'home-outline';
            else if (route.name === 'Play') iconName = 'flag-outline';
            else if (route.name === 'Groups') iconName = 'people-outline';
            else if (route.name === 'You') iconName = 'person-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Feed" component={FeedScreen} />
        <Tab.Screen name="Play" component={PlayStack} />
        <Tab.Screen name="Groups" component={GroupsScreen} />
        <Tab.Screen name="You" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centeredContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    paddingTop: 60,
  },
  content: {
    padding: 20,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardSubtitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  imagePlaceholder: {
    height: 120,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    marginBottom: 16,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  courseDetails: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: '700',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  avatarText: {
    color: COLORS.background,
    fontSize: 24,
    fontWeight: '700',
  },
});
