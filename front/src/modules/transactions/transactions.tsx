import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Badge, Pagination } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectBlock, selectBlockStatus } from '../../store/block/block.slice';

import { copyToClipboard } from '../../utils/clipboard.utils';

import css from './transactions.module.css';

const TRANSACTIONS_PER_PAGE: number = 25;

export const Transactions = (): JSX.Element => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const block = useSelector(selectBlock);
  const blockStatus = useSelector(selectBlockStatus);

  useEffect(() => {
    if (blockStatus.loaded && block.transactions && block.transactions.length > TRANSACTIONS_PER_PAGE) {
      setPages(Math.ceil(block.transactions.length / TRANSACTIONS_PER_PAGE));
    } else {
      setPages(1);
    }
  }, [block, blockStatus]);

  return (
    <Container className={css.root}>
      <Row>
        <Col>
          <h2>
            Block #{block.number && parseInt(block.number.slice(2), 16)}
          </h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>
            Hash: {block.hash}
          </h4>
        </Col>
      </Row>
      {pages > 1 && (
        <Row>
          <Col>
            <Pagination>{Array(pages).fill(1).map((_, pageItem) => (
              <Pagination.Item key={pageItem} active={pageItem + 1 === page} onClick={() => setPage(pageItem + 1)}>
                {pageItem + 1}
              </Pagination.Item>
            ))}</Pagination>
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  #
                </th>
                <th>
                  Transaction hash
                </th>
                <th>
                  From
                </th>
                <th>
                  To
                </th>
              </tr>
            </thead>
            <tbody>
              {blockStatus.error && (
                <tr>
                  <td colSpan={4}>
                    {blockStatus.error}
                  </td>
                </tr>
              )}
              {blockStatus.loaded && !block.transactions.length && (
                <tr>
                  <td colSpan={4}>
                    There is no transactions in block
                  </td>
                </tr>
              )}
              {blockStatus.loaded && block.transactions && block.transactions
                .slice((page - 1) * TRANSACTIONS_PER_PAGE, (page - 1) * TRANSACTIONS_PER_PAGE + TRANSACTIONS_PER_PAGE)
                .map((transaction, index) => (
                <tr key={transaction.hash}>
                  <td>
                    {(page - 1) * TRANSACTIONS_PER_PAGE + index + 1}
                  </td>
                  <td title={transaction.hash}>
                    {transaction.hash.slice(0, 20)}...
                    <Badge variant="secondary" className={css.badge} pill onClick={() => copyToClipboard(transaction.hash)}>Copy</Badge>
                  </td>
                  <td title={transaction.from}>
                    {transaction.from.slice(0, 20)}...
                    <Badge variant="secondary" className={css.badge} pill onClick={() => copyToClipboard(transaction.from)}>Copy</Badge>
                  </td >
                  <td title={transaction.to}>
                    {transaction.to.slice(0, 20)}...
                    <Badge variant="secondary" className={css.badge} pill onClick={() => copyToClipboard(transaction.to)}>Copy</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      {pages > 1 && (
        <Row>
          <Col>
            <Pagination>{Array(pages).fill(1).map((_, pageItem) => (
              <Pagination.Item key={pageItem} active={pageItem + 1 === page} onClick={() => setPage(pageItem + 1)}>
                {pageItem + 1}
              </Pagination.Item>
            ))}</Pagination>
          </Col>
        </Row>
      )}
    </Container> 
  )
}