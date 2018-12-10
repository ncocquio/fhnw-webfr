import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {Container} from 'reactstrap';
import QuestionnaireContainer from '../questionnaire/QuestionnaireContainer';
import {Loader} from "./Loader";

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false
        }
    }

    componentDidMount() {
        this.setState(
            {
                loading: true
            }
        );
        let request = new Request("application.json", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        fetch(request).then(response => response.json()
        ).then(json => {
            this.setState(
                {
                    serverUrl: json.serverUrl,
                    loading: false
                }
            );
        }).catch(error => {
            // handle error
        })
    }

    render() {
        let comp;
        if (this.state.loading) {
            comp = <Loader />
        } else {
            comp = <QuestionnaireContainer serverUrl={this.state.serverUrl} />
        }
        return (
            <Container fluid>
                <Header
                    title="Flashcard Client with React"
                    subtitle="Version 1"/>
                {comp}
                <Footer message="The FHNW Team"/>
            </Container>
        )
    }
}

export default App;