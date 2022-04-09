import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Box, Input, Grow } from "@material-ui/core";

import GlobeIcon from "../../../../assets/fluencyIcons/Globe.svg";
import SearchIcon from "../../../../assets/fluencyIcons/Search.svg";
import RenderLangsSelections from "./renderLangs";
import { LangSelectionProps as Props } from "../../types";

export default function LangSelection({ state: { toggle, ssr }, actions }: Props) {
  const [search, setSearch] = useState("");

  return (
    <Dialog
      open={!!toggle.selectLangModal}
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
          langs={ssr.langs}
          search={search}
          onClick={(lang) => actions.onClick && actions.onClick(lang)}
        />
      </DialogContent>
    </Dialog>
  );
}
