import {
  Accordion,
  AccordionSummary,
  Box,
} from "@mui/material";
import ShowBook from "../BookUtils/ShowBook";
import { useState } from "react";

export default function AccordionShelve({ currentlyRead, toRead, libBook }) {
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
          {currentlyRead.map((currentlyRead, index) => {
            return (
              <>
                <Box
                  sx={{
                    width: "20%",
                    padding: 2,
                  }}
                  key={currentlyRead.id}
                >
                  <ShowBook key={index} book={currentlyRead} />
                </Box>
              </>
            );
          })}
        </Box>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary>To Read</AccordionSummary>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {toRead.map((toRead, index) => {
            return (
              <>
                <Box
                  sx={{
                    width: "20%",
                    padding: 2,
                  }}
                  key={toRead.id}
                >
                  <ShowBook key={index} book={toRead} />
                </Box>
              </>
            );
          })}
        </Box>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary>Library</AccordionSummary>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {libBook.map((libBook, index) => {
            return (
              <>
                <Box
                  sx={{
                    width: "20%",
                    padding: 2,
                  }}
                  key={libBook.id}
                >
                  <ShowBook key={index} book={libBook} />
                </Box>
              </>
            );
          })}
        </Box>
      </Accordion>
    </>
  );
}
