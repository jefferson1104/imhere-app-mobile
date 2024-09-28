import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';

import { Participant } from '../../components/Participant';

import { styles } from './styles';

export function Home() {
  // States
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');

  // Constants
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Methods
  const handleParticipantAdd = () => {
    if (!participantName) {
      Alert.alert('Nome do participante vazio!', 'Informe o nome do participante.');
      return;
    }

    if (participants.includes(participantName)) {
      Alert.alert('Participante já cadastrado!', 'Já existe um participante com esse nome.');
      return;
    }

    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName('');
  };

  const handleParticipantRemove = (name: string) => {
    const removeParticipant = () => {
      const newParticipants = participants.filter(participant => participant !== name);
      setParticipants(newParticipants);
      Alert.alert(`O participante ${name} foi removido com sucesso.`)
    };

    Alert.alert('Remover participante!', `Deseja remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => removeParticipant()
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ]);
  };

  // Renders
  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Event Name
      </Text>

      <Text style={styles.eventDate}>
        {formattedDate}
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder='Guest name'
          placeholderTextColor="#6B6B6B"
          onChangeText={(text) => setParticipantName(text)}
          value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={item => item}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Participant
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyList}>
            No guests registered. Add guests to your guest list.
          </Text>
        )}
      />
    </View>
  );
}
