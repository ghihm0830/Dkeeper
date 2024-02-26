import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { dkeeper} from "../../../declarations/dkeeper";


function App() {
  //useState rerender screen whenever notes is updated
  const [notes, setNotes] = useState([]);

  //add a new note on the frontend
  function addNote(newNote) {
    setNotes(prevNotes => {
      //call function (order of attributes must match with order in motoko)
      dkeeper.createNote(newNote.title, newNote.content)
      //add new note at the very front and order does not change whenver the page is reranderred [...prevNotes, newNote] to [newNote, ...prevNotes]
      return [newNote, ...prevNotes];
    });
  }

  //use effect hook is triggered whenever render function is called in react //no input and no outpu in ()
  //check if any change has been made before triggered ({}, [])
  useEffect(() => {
    console.log("triggered!")
    fetchData(); //has to be asyncronyze //pull out notes array from motoku
  }, []);

  async function fetchData() {
     //returned array from motoku and store in a local constant //wait until we get the array back from motoku before we continue
    const notesArray = await dkeeper.readNotes();
    //update stateUse with every info in notesArray
    setNotes(notesArray);
  }

  function deleteNote(id) {
    dkeeper.removeNote(id);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
