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

  create = (questionnaire) => {
    let qs = this.state.questionnaires;
    let newId = 0;
    if (qs.length > 0) {
      // Generate new ID derivated from the highst questionnaire-ID found in the list
      const index = qs.length - 1;
      newId = qs[index].id + 1;
    }
    questionnaire.id = newId;
    qs.push(questionnaire);
    this.setState({
      questionnaires: qs
    })
  }

  update = (questionnaire) => {
    let qs = this.state.questionnaires;
    let tmp = qs.find((q) => 
      q.id === questionnaire.id
    );
    tmp.title = questionnaire.title;
    tmp.description = questionnaire.description;
    this.setState(
      {
        questionnaires: qs
      }
    );
  }

  remove = (id) => {
    let qs = this.state.questionnaires;
    qs = qs.filter(q => q.id !== id);
    this.setState(
      {
        questionnaires: qs
      }
    );
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
  qs: [
    { 'id': 1, 'title': 'Test Title 1', 'description': 'Test Description 1' },
    { 'id': 2, 'title': 'Test Title 2', 'description': 'Test Description 2' },
    { 'id': 3, 'title': 'Test Title 3', 'description': 'Test Description 3' },
    { 'id': 4, 'title': 'Test Title 4', 'description': 'Test Description 4' },
    { 'id': 5, 'title': 'Test Title 5', 'description': 'Test Description 5' }
  ]
}

export default QuestionnaireContainer;