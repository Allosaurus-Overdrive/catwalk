/* eslint-disable react/prop-types */
import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import QListItem from './QListItem';

const styledButton = {
  border: '1px',
  borderStyle: 'solid',
  backgroundColor: 'white',
  fontSize: '12px',
  padding: '15px',
  borderColor: 'darkslategray',
  color: 'black',
  fontFamily: ['Roboto', 'sans-serif'],
  width: 190,
  display: 'inline-block',
  outline: 'none',
};

const styledHeading = {
  fontWeight: '600',
};

const item = {
  height: '300px',
  overflow: 'scroll',
};

export default function QuestionsAccordion({ questions }) {
  return (
    <div>
      <Accordion>
        <AccordionItem style={item}>
          <AccordionItemHeading style={styledHeading}>
            <AccordionItemButton style={styledButton}>
              MORE ANSWERED QUESTIONS
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            {questions.map((result) => (
              <QListItem key={result.question_id} question={result} />
            ))}
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
