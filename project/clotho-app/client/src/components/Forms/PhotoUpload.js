
import React, { useState } from 'react';
import useAxiosImg from '../../hooks/useAxiosImg';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const PhotoUpload = () => {

  const axiosImg = useAxiosImg();
  const [photos, setPhotos] = useState([]);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const priority = photos.length;
    const formData = new FormData();
    formData.append("image", file);

    // Upload photo to server
    const response = await axiosImg.post('/images/', formData);

    // Update local state
    setPhotos([...photos, { url: response.data.path, order: priority }]);
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
