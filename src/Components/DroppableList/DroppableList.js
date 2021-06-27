import PropTypes from "prop-types";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Card from "../Card/Card";

const DroppableList = (props) => {
  const { droppableId, list, getItemStyle, getListStyle, title } = props;
  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          <div className="flex-space-between">
            <div className="list-header">{title}</div>
            <div className=" icon-opacity list-header">
              <i className="fa fa-ellipsis-h fa-lg" aria-hidden="true"></i>
            </div>
          </div>
          {list.length > 0 &&
            list.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <Card props={item} />
                  </div>
                )}
              </Draggable>
            ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

DroppableList.propTypes = {
  droppableId: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  getItemStyle: PropTypes.func.isRequired,
  getListStyle: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default DroppableList;
