import React, { useContext } from 'react';
import { Row, Col, InputGroup, Button, FormControl } from 'react-bootstrap';
import { Context } from '.';

const Ideas = ({ideas}) => {
  return ideas.map((idea, Idx)=>(
    <Row key={idea.id + '_row'}>
      <Idea
        key={idea.id}
        index={Idx}
        {...idea} />
    </Row>
  ));
};

const getPayload = function(id, data, target){
  const payload = {id};
  const [name, value] = data;
  payload[name] = value;
  payload[target.name] = target.value;
  return payload;
};

const Idea = ({id, title, description, descCountDown, creationDate, lastUpdated, index}) => {
  const dispatch = useContext(Context);
  return (
    <Col>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Title"
          name='title'
          value={title}
          onChange={e=>dispatch({type:'update', payload: getPayload(id, ['description', description], e.currentTarget)})}
        />
        <Actions id={id} index={index} />
      </InputGroup>
      <InputGroup className="mb-3">
        <FormControl as="textarea" aria-label="With textarea"
                     value={description}
                     name='description'
                     onChange={e=>dispatch({type:'update', payload: getPayload(id, ['title', title], e.currentTarget)})} />
        <InputGroup.Append>
          <InputGroup.Text>{descCountDown}</InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>Created date</InputGroup.Text>
        </InputGroup.Prepend>
        <InputGroup.Append>
          <InputGroup.Text>{creationDate}</InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Last Updated</InputGroup.Text>
        </InputGroup.Prepend>
        <InputGroup.Append>
          <InputGroup.Text>{lastUpdated}</InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    </Col>
  )
};

const Actions = ({id, index}) => {
  const dispatch = useContext(Context);
  return (<InputGroup.Append>
    <Button variant="outline-secondary" onClick={()=>dispatch({ type:'delete', payload: id })}>Delete</Button>
    {index > 0 && <Button variant="outline-secondary"
                          onClick={()=>dispatch({ type:'moveUp', payload: index })}>Move Up</Button>}
  </InputGroup.Append>);
};

export default Ideas;
