import React from 'react';
import { Table } from 'reactstrap';
import QuestionnaireTableElement from './QuestionnaireTableElement';

const QuestionnaireTable = ({questionnaires}) => (
    <Table hover>
        <tbody>
            {questionnaires.map(questionnaire =>
                <QuestionnaireTableElement
                    // IMPORTANT: use the 'key' property to be able to update the list dynamically
                    key={questionnaire.id}
                    questionnaire={questionnaire}
                />
            )
            }
        </tbody>
    </Table>
)

export default QuestionnaireTable;