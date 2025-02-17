import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import {styles} from './styles';

import { Participant } from '../../components/Participant';
import { useState } from 'react';

export function Home() {

  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');

  function handleParticipantAdd(){
    if(participants.includes(participantName)){
        return Alert.alert("Participante existe", "Já exste um participante na lista com esse nome")
    }

    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName("");
  }

  function handleParticipantRemove(name: string){
    Alert.alert("Remover", `Deseja remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => prevState.filter(Participant => Participant !== name))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do evento
      </Text>

      <Text style={styles.eventDate}>
        Sexta, 4 de Novembro de 2022.
      </Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input} 
          placeholder='Nome'
          placeholderTextColor="#6B6B6B"
          onChangeText={setParticipantName}
          // onChangeText={text => setParticipantName(text)}
          value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
              +
          </Text>
        </TouchableOpacity>
      </View>

{/* usar  FlatList para muitos dados*/}
      <FlatList 
        data={participants}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <Participant 
          key={item}
          name={item} 
          onRemove={() => handleParticipantRemove(item)} 
          />
        )}   
        showsVerticalScrollIndicator={false}   
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes na sua lista de presença.
          </Text>
        )}
      />

{/* usar  ScrollView para menus ou listas com poucos dados*/}
    {/* <ScrollView>
      {
        participants.map(participant => (
          <Participant 
          key={participant}
          name={participant} 
          onRemove={() => handleParticipantRemove(participant)} 
          />
        ))
      }
      </ScrollView> */}


      {/* <Participant name="Higor" onRemove={() => handleParticipantRemove("Higor")} /> */}
      {/* <Participant name="Iara" onRemove={() => handleParticipantRemove("Iara")}/> */}
      {/* <Participant name="Assis" onRemove={() => handleParticipantRemove("Assis")}/> */}
      {/* <Participant name="Islania" onRemove={() => handleParticipantRemove("Islania")}/> */}

    </View>
  );
}