
import React, { useState } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const PhotoUpload = () => {
  const [photos, setPhotos] = useState([]);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const id = 1; // Replace with actual item ID?
    const priority = photos.length;

    // Upload photo to server
    const { data } = await axios.post(BASE_API_URL + '/api/admin/listingimages/upload', {
      file,
      id,
      priority,
    });

    // Update local state
    setPhotos([...photos, { url: data.url, order: priority }]);
  };

  const onDragEnd = (result) => {
    // Reorder photo list - drag and drop
    // Update the order in the mysql db
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="photoList">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {photos.map((photo, index) => (
                <Draggable key={photo.url} draggableId={photo.url} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <img src={photo.url} alt="Item" />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default PhotoUpload;
