import { createSettingsStyles } from "@/assets/styles/setting.style";
import DangerZone from "@/components/danger-zone";
import Preferrence from "@/components/preferences";
import ProgressStats from "@/components/progress-stats";
import useTheme from "@/hooks/useTheme";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingScreen = () => {
  const { colors } = useTheme();
  const settingStyle = createSettingsStyles(colors);
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={settingStyle.container}
    >
      <SafeAreaView style={settingStyle.safeArea}>
        {/* header */}
        <View style={settingStyle.header}>
          <View style={settingStyle.titleContainer}>
            <LinearGradient
              colors={colors.gradients.primary}
              style={settingStyle.iconContainer}
            >
              <FontAwesome name="gear" size={28} color={"#ffffff"} />
            </LinearGradient>
            <Text style={settingStyle.title}>Settings</Text>
          </View>
        </View>
        <ScrollView
          style={settingStyle.scrollView}
          contentContainerStyle={settingStyle.content}
          showsVerticalScrollIndicator={false}
        >
          <ProgressStats />
          <Preferrence />
          <DangerZone />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SettingScreen;
