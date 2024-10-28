import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Home } from '@screens/Home';
import { Event } from '@screens/event';
import { EventList } from '@screens/eventList';

export type AppRoutesParams = {
  home: undefined;
  eventList: undefined;
  event: {
    eventId: number;
  }
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
        name="event"
        component={Event}
      />

      <Screen
        name="eventList"
        component={EventList}
      />
    </Navigator>
  );
}
