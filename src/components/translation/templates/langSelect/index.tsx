import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Box, Input, Grow } from "@material-ui/core";

import GlobeIcon from "../../../../assets/fluencyIcons/Globe.svg";
import SearchIcon from "../../../../assets/fluencyIcons/Search.svg";
import RenderLangsSelections from "./renderLangs";
import { LangSelectionProps as Props } from "../../types";

export default function LangSelection({ state, actions }: Props) {
  const [search, setSearch] = useState("");

  return (
    <Dialog
      open={!!state.toggle.selectLangModal}
      keepMounted
      scroll="paper"
      fullWidth
      onClose={() => actions.setModel && actions.setModel("")}
      TransitionComponent={Grow}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" mb={2}>
          <GlobeIcon style={{ marginRight: "16px", transform: "scale(1.5)" }} />
          Language Select
        </Box>
        <Box display="flex" alignItems="center">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            autoFocus
            placeholder="Search"
          />
          <SearchIcon />
        </Box>
      </DialogTitle>
      <DialogContent>
        <RenderLangsSelections
          langs={state.ssr.langs}
          search={search}
          onClick={() => actions.onClick}
        />
      </DialogContent>
    </Dialog>
  );
}
