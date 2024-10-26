import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Home } from '@screens/Home';
import { EventList } from '@screens/eventList';
import { RegisterParticipants } from '@screens/registerParticipants';

export type AppRoutesParams = {
  home: undefined;
  eventList: undefined;
  registerParticipants: {
    eventName: string;
    eventDate: string;
  };
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutesParams>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutesParams>();

export function AppRoutes() {
  // Renders
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="home"
        component={Home}
      />

      <Screen
        name="eventList"
        component={EventList}
      />

      <Screen
        name="registerParticipants"
        component={RegisterParticipants}
      />
    </Navigator>
  );
}
