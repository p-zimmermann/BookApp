import { Accordion, AccordionSummary, AccordionDetails, Box } from "@mui/material";
import SearchResults from "../BookSearch/SearchResults";
import { useState } from "react";
import axios from "axios";

export default function AccordionShelve({ toReadBooks }) {
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary>Currently Reading</AccordionSummary>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
            {toReadBooks.map((toReadBooks, index) => {
            return <SearchResults key={index} book={toReadBooks} />;
          })}
          
        </Box>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary>To Read</AccordionSummary>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary>Library</AccordionSummary>
      </Accordion>
    </>
  );
}
