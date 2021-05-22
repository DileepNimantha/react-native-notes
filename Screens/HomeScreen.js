import React, {useEffect, useState, useContext, useRef} from 'react';
import {Text, FlatList, TouchableOpacity} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import {Button, Form} from 'native-base';
import {Layout} from '../Components/Layout';
import {NoteContent} from '../Components/NoteContent';
import {NoteContext} from '../Contexts/NoteContext';

const HomeScreen = props => {
  const prevProps = useRef(false);
  const {getContextNotes} = useContext(NoteContext);
  const [notes, setNotes] = useState();

  useEffect(() => {
    const getData = async () => {
      if (prevProps.isFocused !== props.isFocused) {
        const getNotes = await getContextNotes();

        if (getNotes.length) {
          setNotes(getNotes);
        }
      }
    };

    getData();
  }, [getContextNotes, props.isFocused]);

  return (
    <Layout
      title="My Notes"
      footer={
        <Button full onPress={() => props.navigation.navigate('AddNoteScreen')}>
          <Text>Add Note</Text>
        </Button>
      }>
      <FlatList
        data={notes}
        keyExtractor={note => note.id}
        renderItem={note => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('ModNote', {id: note.item.id})
            }>
            <NoteContent note={{...note}} />
          </TouchableOpacity>
        )}></FlatList>
    </Layout>
  );
};

export default withNavigationFocus(HomeScreen);
