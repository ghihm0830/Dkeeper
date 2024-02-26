import List "mo:base/List";
import Debug "mo:base/Debug";

actor Dkeeper {

  //create new data type to be stored in the note
  public type Note = {
    //: declare a type
    title: Text;
    content: Text;
  };

  //create a new variable (array) //List contains note //List.List is not type so must import List
  //notes is an array of Note object //nil to create a empty list
  //used stable to prevent notes from being removed whenever dfx is reployed
  stable var notes: List.List<Note> = List.nil<Note>();

  public func createNote(titletext: Text, contentText: Text) {

    //= create a new note when user typed input from Javascript side
    let newNote: Note = {
      title = titletext;
      content = contentText;
    };

    //push newNote into an empty array (notes)
    notes := List.push(newNote, notes);
    //check if a new note has been created on the backend as well
    Debug.print(debug_show (notes));
  };

  public query func readNotes(): async [Note] {
  //convert list to an array (to Array returns in the format of array)
    return List.toArray(notes);
  };

  public func removeNote(id: Nat) {
    //take drop append to remove a note
    let listFront = List.take(notes, id);
    let listBack = List.drop(notes, id + 1);
    notes := List.append(listFront, listBack);
  };
}

