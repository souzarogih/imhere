import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import {styles} from './styles';

import { Participant } from '../../components/Participant';

export function Home() {

  const participants = [
    'Higor', 'Iara', 'João', 'Pedro', 'Ana', "Paulo", "Luiz", "Marcos", 
    "Mateus", "Lucas", "Carlos", "Felipe"];

  function handleParticipantAdd(){
    if(participants.includes("Higor")){
        return Alert.alert("Participante existe", "Já exste um participante na lista com esse nome")
    }

    console.log("Você clicou em adicionaar")
  }

  function handleParticipantRemove(name: string){
    Alert.alert("Remover", `Deseja remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => Alert.alert("Deletado!")
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ]);

    console.log(`Você clicou em remover ${name}`)
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