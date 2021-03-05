import React, { Component } from 'react';
import NoteCard from './NoteCard';

class List extends Component {
  componentWillMount() {
    this.props.getNotess();
  }

  render() {
    const { notes2, getNote, deleteNote } = this.props;

    const cards = notes2.map((note, index) => {
      return (
        <NoteCard
          key={index}
          index={index}
          note={note}
          getNote={getNote}
          deleteNote={deleteNote}
        />
      );
    });

    return (
      <div className="list-container">
        {cards}
      </div>
    );
  }
}

export default List;