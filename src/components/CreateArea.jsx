import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
// import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [isClick, setClick] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    console.log("Submitting note:", note);

    // Only submit if there's content
    if (note.title.trim() || note.content.trim()) {
      props.onAdd(note);
      setNote({
        title: "",
        content: "",
      });
    } else {
      console.log("Note is empty, not submitting");
    }

    event.preventDefault();
  }

  function firstClick() {
    setClick(true);
  }

  function first() {
    return (
      <div>
        <form className="create-note">
          {
            <textarea
              onClick={firstClick}
              name="content"
              placeholder="Take a note"
              rows="1"
            />
          }
        </form>
      </div>
    );
  }

  function second() {
    return (
      <div>
        <form className="create-note">
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
          <textarea
            name="content"
            onChange={handleChange}
            value={note.content}
            placeholder="Take a note..."
            rows="3"
          />
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </form>
      </div>
    );
  }

  return <div>{isClick === false ? first() : second()}</div>;
}

export default CreateArea;
