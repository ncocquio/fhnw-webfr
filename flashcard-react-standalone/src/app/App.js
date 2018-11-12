import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Container } from 'reactstrap';
import QuestionnaireContainer from '../questionnaire/QuestionnaireContainer';

export default class App extends React.Component {
  render() {
    return (
      <Container fluid>
        <Header
          title="Flashcard Client with React"
          subtitle="Version 1" />
        <QuestionnaireContainer />
        <Footer message="The FHNW Team" />
      </Container>
    )
  }
}
