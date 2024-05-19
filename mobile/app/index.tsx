import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import IMAGE from "../static/image";

export default function App() {
  const loginHandler = () => {
    router.push("/login");
  };

  const signUpHandler = () => {
    router.push("/signUp");
  };
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />
      <View className="items-center flex-1">
        <LinearGradient
          // Background Linear Gradient
          colors={["#181C24", "#11306F"]}
          className="absolute top-0 bottom-0 left-0 right-0"
        />
        <View className="items-center w-full">
          <Image
            source={IMAGE.mainLogo}
            className="w-3/5 mt-[25%]"
            style={{ resizeMode: "contain" }}
          />
        </View>
        <Text className="-mt-16 text-2xl text-white font-SyneBold">
          An eye for your visitors.
        </Text>
        <View className="absolute top-0 bottom-0 left-0 right-0 items-center justify-center flex-1">
          {/* Login Button */}
          <TouchableOpacity
            onPress={() => loginHandler()}
            className="w-2/5 overflow-hidden rounded-lg"
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#E55D7D", "#6B46E6"]}
              className="items-center py-2 rounded-lg"
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text className="text-lg text-white font-SyneBold">Log in</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={() => signUpHandler()}
            className="w-2/5 mt-6 overflow-hidden rounded-lg"
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#6B46E6", "#E7A856"]}
              className="items-center py-2 rounded-lg"
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text className="text-lg text-white font-SyneBold">Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

// import { View, Text, Pressable, Image } from "react-native";
// import React from "react";
// import { StatusBar } from "expo-status-bar";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Stack, router } from "expo-router";
// import { LinearGradient } from "expo-linear-gradient";
// import Header from "../components/header";
// import IMAGE from "../static/image";
// import DashboardTable from "../components/dashboardTable";

// const Table = () => {
//   const backHandler = () => {
//     router.back();
//   };
//   return (
//     <>
//       <Stack.Screen options={{ headerShown: false }} />
//       <StatusBar style="light" />
//       <SafeAreaView className="flex-1">
//         <LinearGradient
//           // Background Linear Gradient
//           colors={["#181C24", "#11306F"]}
//           className="absolute top-0 bottom-0 left-0 right-0"
//         />
//         <Header />
//         <View className="flex-1 px-6">
//           <View className="w-full flex-1 border-white border-[2px] rounded-xl pt-6 px-4 pb-8 mb-8">
//             <View className="flex-row items-center justify-between mb-4">
//               <Pressable onPress={() => backHandler()}>
//                 <Image source={IMAGE.back} className="w-10 h-10" />
//               </Pressable>

//               <LinearGradient
//                 colors={["#6B46E6", "#E7A856"]}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 className="w-[70%] self-center items-center border-white border-[2px] py-2 rounded-lg"
//               >
//                 <Text className="text-white font-SyneBold">
//                   Dashboard Toko Tuki
//                 </Text>
//               </LinearGradient>

//               <Pressable>
//                 <Image source={IMAGE.edit} className="w-8 h-8" />
//               </Pressable>
//             </View>

//             {/* Table */}
//             <DashboardTable />
//           </View>
//         </View>
//       </SafeAreaView>
//     </>
//   );
// };

// export default Table;
