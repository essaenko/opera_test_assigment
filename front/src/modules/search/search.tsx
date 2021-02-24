import React, { useEffect, FormEvent, useState } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { fetchLatestBlock, searchBlock } from '../../store/block/block.actions';

import { isValidBlockNumber } from '../../utils/validation.utils';

import css from './search.module.css';

export const Search = (): JSX.Element => {
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState<boolean>(true);
  const onSearchBlock = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const blockID = (e.target as HTMLFormElement)['0'].value;
    if (!blockID) {
      dispatch(fetchLatestBlock());
    } else if (isValidBlockNumber(blockID)) {
      setIsValid(true);
      dispatch(searchBlock(blockID));
    } else {
      setIsValid(false);
    }
  }
  
  useEffect(() => {
    dispatch(fetchLatestBlock());
  }, []);

  return (
    <Container className={css.root}>
      <Row>
        <Col>
          <h1>Etherium Web Gateway</h1>
        </Col>
      </Row>
      <Form onSubmit={onSearchBlock}>
        <Row>
          <Col>
            <Form.Control type="text" placeholder="Find blocks by their number" onChange={() => { !isValid && setIsValid(true) }} isInvalid={!isValid}/>
            <Form.Control.Feedback type="invalid" tooltip>
              Invalid block number
            </Form.Control.Feedback>
          </Col>
          <Col>
            <Button variant="primary" type="submit">
              Find
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}