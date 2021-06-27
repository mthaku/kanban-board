import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DroppableList from "../DroppableList/DroppableList";
import { data } from "../data";

// fake data generator
const getItems = () => {
  return data.map((k) => ({
    ...k,
    id: `${Math.floor(Math.random().toFixed(4) * 10000)}`
  }));
};

const grid = 8;

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};


const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  margin: `${grid * 2}px`,
  border: "1px solid lightgrey",
  // change background colour if dragging
  background: isDragging ? "lightgrey" : "white",
  boxShadow: isDragging ? "10px 10px 10px 10px #eee" : "",
  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
  boxShadow: "10px 10px 10px 10px #eee",
  background: isDraggingOver ? "offwhite" : "white",
  width: "30%"
});

const KanbanBoard = () => {
    
  const [state, setState] = useState({
    droppable: getItems(),
    droppable2: [],
    droppable3: [],
    droppable4: []
  });

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  const id2List = {
    droppable: "droppable",
    droppable2: "droppable2",
    droppable3: "droppable3",
    droppable4: "droppable4"
  };

  const getList = (id) => state[id2List[id]];

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );

      let state = { items };

      if (
        ["droppable2", "droppable3", "droppable4"].includes(source.droppableId)
      ) {
        state = { [source.droppableId]: items };
      }

      setState(...state);
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );
      setState({
        ...state,
        [source.droppableId]: result[source.droppableId],
        [destination.droppableId]: result[destination.droppableId]
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DroppableList
        droppableId="droppable"
        title="New Task"
        list={state.droppable}
        getListStyle={getListStyle}
        getItemStyle={getItemStyle}
      />
      <DroppableList
        droppableId="droppable2"
        title="In Progress"
        list={state.droppable2}
        getListStyle={getListStyle}
        getItemStyle={getItemStyle}
      />
      <DroppableList
        droppableId="droppable3"
        title="Review"
        list={state.droppable3}
        getListStyle={getListStyle}
        getItemStyle={getItemStyle}
      />
      <DroppableList
        droppableId="droppable4"
        title="Done"
        list={state.droppable4}
        getListStyle={getListStyle}
        getItemStyle={getItemStyle}
      />
    </DragDropContext>
  );
};

export default KanbanBoard;
