import { useState } from "react";
import { Platform, View, Text, Modal } from "react-native";
import { CalendarDots } from "phosphor-react-native";
import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

import theme from "src/theme";

import { formatToAmericanDate } from "@utils/date";

import { Button } from "@components/Button";

import { DateButton, DateButtonPlaceholder, TextDateButton } from "./styles";

interface DateTimePickerProps {
  onChange: (date: Date) => void;
  currentDate?: Date;
};

export function DateTimePicker(props: DateTimePickerProps) {
  if (Platform.OS === 'android') {
    return <AndroidDateTimePicker {...props} />;
  }

  if (Platform.OS === 'ios') {
    return <IOSDateTimePicker {...props} />;
  }

  return null;
};

export const AndroidDateTimePicker = ({ onChange, currentDate }: DateTimePickerProps) => {
  // Constants
  const formattedDate = formatToAmericanDate(currentDate);

  // Methods
  const showDateTimePicker = () => {
    DateTimePickerAndroid.open({
      value: currentDate ?? new Date(),
      onChange: (_, date?: Date) => onChange(date || new Date()),
      mode: 'date',
    })
  };

  // Renders
  return (
    <>
      <DateButton
        style={{ width: '100%', backgroundColor: theme.COLORS.GRAY_600, padding: 24, borderRadius: 8  }}
        onPress={showDateTimePicker}
      >
        {!currentDate ? (
          <DateButtonPlaceholder>Event date</DateButtonPlaceholder>
        ): (
          <TextDateButton>{formattedDate}</TextDateButton>
        )}
        <CalendarDots color={theme.COLORS.BLUE_DARK} size={32} />
      </DateButton>
    </>
  )
};

export const IOSDateTimePicker = ({ onChange, currentDate }: DateTimePickerProps) => {
  // States
  const [showCalendar, setShowCaledar] = useState(false);

  // Constants
  const formattedDate = formatToAmericanDate(currentDate);

  // Renders
  return (
    <>
      <DateButton
        style={{ width: '100%', backgroundColor: theme.COLORS.GRAY_600, padding: 24, borderRadius: 8  }}
        onPress={() => setShowCaledar(!showCalendar)}
      >
        {!currentDate ? (
          <DateButtonPlaceholder>Event date</DateButtonPlaceholder>
        ): (
          <TextDateButton>{formattedDate}</TextDateButton>
        )}
        <CalendarDots color={theme.COLORS.BLUE_DARK} size={32} />
      </DateButton>

      {showCalendar && (
        <Modal transparent={true} animationType="slide">
           <View style={{ flex: 1, justifyContent: 'center', padding: 24, backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ backgroundColor: 'white', borderRadius: 8, paddingBottom: 24, alignItems: 'center' }}>
              <RNDateTimePicker
                accentColor={theme.COLORS.BLUE}
                textColor={theme.COLORS.WHITE}
                minimumDate={new Date()}
                value={currentDate ?? new Date()}
                mode='date'
                display="inline"
                onChange={(_, date) => onChange(date || new Date())}
              />
              <View style={{ width: '70%', backgroundColor: '#FFF', marginTop: 16 }}>
                <Button title="Done" onPress={() => setShowCaledar(false)} activeOpacity={1} />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};
