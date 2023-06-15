import {Accordion, AccordionSummary, AccordionDetails} from '@mui/material'
import {useState } from 'react';

export default function AccordionShelve () {
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    return(
        <>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
                <AccordionSummary>Currently Reading</AccordionSummary>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary>To Read</AccordionSummary>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary>Library</AccordionSummary>
            </Accordion></>
    )
}