import React from 'react';
import QuestionnaireTable from './QuestionnaireTable';
import QuestionnaireCreateDialog from './QuestionnaireCreateDialog';

class QuestionnaireContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnaires: this.props.qs
        }
    }

    componentDidMount() {
        var request = new Request(this.props.serverUrl + "/questionnaires", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        fetch(request).then(response => response.json()
        ).then(json => {
            this.setState(
                {
                    questionnaires: json
                }
            );
        }).catch(error => {
            // handle error
        })
    }

    create = (questionnaire) => {
        var request = new Request(this.props.serverUrl + "/questionnaires", {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(questionnaire)
        });
        fetch(request).then(response => response.json()
        ).then(json => {
            const qs = this.state.questionnaires;
            qs.push(json);
            this.setState(
                {
                    questionnaires: qs
                }
            );
        }).catch(error => {
            // handle error
        })
    }

    update = (questionnaire) => {
        var request = new Request(this.props.serverUrl + "/questionnaires/" + questionnaire.id, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(questionnaire)
        });
        fetch(request).then(response => response.json()
        ).then(json => {
            let qs = this.state.questionnaires;
            let tmp = qs.find((q) =>
                q.id === questionnaire.id
            );
            tmp.title = json.title;
            tmp.description = json.description;
            this.setState(
                {
                    questionnaires: qs
                }
            );
        }).catch(error => {
            // handle error
        })
    }

    remove = (id) => {
        var request = new Request(this.props.serverUrl + "/questionnaires/" + id, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        fetch(request)
            .then(response =>
            { if (response.ok) {
                let qs = this.state.questionnaires;
                qs = qs.filter(q => q.id !== id);
                this.setState(
                    {
                        questionnaires: qs
                    }
                );
            }}).catch(error => {
            // handle error
        })



    }

    render() {
        return (
            <div>
                <QuestionnaireCreateDialog className="float-right"
                                           createHandler={this.create}
                />
                <h3>Questionnaires</h3>
                <QuestionnaireTable
                    questionnaires={this.state.questionnaires}
                    deleteHandler={this.remove}
                    updateHandler={this.update}
                />
            </div>
        )
    }
}

QuestionnaireContainer.defaultProps = {
    qs: []
}

export default QuestionnaireContainer;