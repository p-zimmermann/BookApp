import { Accordion, AccordionSummary, Box, IconButton, Modal } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ShowBook from "../BookUtils/ShowBook";
import AccordionShelveCurrently from "./AccordionShelveCurrently";
import AccordionShelveToRead from "./AccordionShelveToRead";
import AccordionShelveLibrary from "./AccordioanShelveLibrary";
import { useState } from "react";

export default function AccordionShelve({ currentlyRead, toRead, libBook }) {
  const [open, setOpen] = useState(false); // State to control the modal

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
                <AccordionShelveCurrently key={index} currentlyRead={currentlyRead}/>
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
                <AccordionShelveToRead key={index} toRead={toRead} />
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
                <AccordionShelveLibrary key={index} libBook={libBook}/>
            );
          })}
        </Box>
      </Accordion>
    </>
  );
}
