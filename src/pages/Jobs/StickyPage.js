import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import MainLayout1 from '../../layouts/MainLayout1';
import PageHeader from '../../Component/Pages/PageHeader';

const StickyPage = () => {
  return (
     <MainLayout1>
          <PageHeader title= 'Untitled Job' />
      <Container fluid>
        <Row className="mt-5">
          <Col md={8}>
            <Card>
              <Card.Body>
                <h2>Main Content</h2>
                <p>
                  Scroll down to see the sticky sidebar in action. The sidebar will stick to the top as you scroll.
                </p>

                <div style={{ height: '1500px', paddingTop: '50px' }}>
                  <h4>Scroll Down</h4>
                  <p>More content to scroll...</p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card style={stickyStyle}>
              <PageHeader title= 'Untitled Job' />
            </Card>
          </Col>
        </Row>
      </Container>
      </MainLayout1>
   
  );
};

const stickyStyle = {
  position: 'sticky',
  top: '90px',
  zIndex: 10,
  backgroundColor: 'lightgray',
  padding: '20px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
};

export default StickyPage;
