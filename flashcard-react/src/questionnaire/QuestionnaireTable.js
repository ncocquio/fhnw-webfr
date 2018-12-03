import React from 'react';
import { Table } from 'reactstrap';
import QuestionnaireTableElement from './QuestionnaireTableElement';

const QuestionnaireTable = ({questionnaires, deleteHandler, updateHandler}) => (
    <Table hover className="mt-4">
        <tbody>
            {questionnaires.map(questionnaire =>
                <QuestionnaireTableElement
                    // IMPORTANT: use the 'key' property to be able to update the list dynamically
                    key={questionnaire.id}
                    questionnaire={questionnaire}
                    deleteHandler={deleteHandler}
                    updateHandler={updateHandler}  
                />
            )
            }
        </tbody>
    </Table>
)

export default QuestionnaireTable;