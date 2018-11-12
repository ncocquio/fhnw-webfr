import React from 'react';

const textStyle = {
  verticalAlign: 'middle'
};

const QuestionnaireTableElement = ( {questionnaire } ) => (
  <tr>
    <td colSpan="1" style={textStyle}>
      {questionnaire.id}
    </td>
    <td colSpan="3" style={textStyle}>
      {questionnaire.title}
    </td>
    <td colSpan="10" style={textStyle}>
      {questionnaire.description}
    </td>
  </tr>
)

export default QuestionnaireTableElement;
