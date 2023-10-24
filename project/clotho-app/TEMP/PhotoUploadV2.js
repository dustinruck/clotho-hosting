import { useState } from 'react';
import useAxiosJWT from '../client/src/hooks/useAxiosJWT'; 
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
    Card,
    CardImg,
    CardBody,
    Form,
    FormGroup,
    Input,
    Label,
    Button,
    Container
} from "reactstrap";

export default function NewPost() {
  const axiosJWT = useAxiosJWT();
  const [photos, setPhotos] = useState([]);
  const [caption, setCaption] = useState("");

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    //FIX ME
    const { data } = await axiosJWT.post('/api/posts', formData, { headers: {'Content-Type': 'multipart/form-data'}});
    setPhotos([...photos, { url: data.url }]);
  };

  const onDragEnd = (result) => {
    // Reorder photo list with drag and drop
    // Then update the order in the mySQL db
  };

  const submit = async event => { //FIXME
    event.preventDefault();
    // Submit any other data e
  };

  return (
    <Container>
      <Form onSubmit={submit}>
        <FormGroup>
          <Label for="imageUpload">Upload Image</Label>
          <Input type="file" id="imageUpload" onChange={onFileChange} accept="image/*" />
        </FormGroup>
        <FormGroup>
          <Label for="caption">Caption</Label>
          <Input type="text" id="caption" value={caption} onChange={e => setCaption(e.target.value)} placeholder='Caption' />
        </FormGroup>
        <Button color="primary" type="submit">Submit</Button>
      </Form>

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
                      <Card className="mt-3">
                        <CardImg top width="100%" src={photo.url} alt="Uploaded Preview" />
                        <CardBody>
                          <small>Drag to reorder</small>
                        </CardBody>
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
}
