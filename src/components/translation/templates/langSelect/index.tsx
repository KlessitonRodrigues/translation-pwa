import { useCallback, useMemo, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Box from "@material-ui/core/Box";
import Input from "@material-ui/core/Input";
import Zoom from "@material-ui/core/Zoom";

import GlobeIcon from "../../../../assets/fluencyIcons/Globe.svg";
import SearchIcon from "../../../../assets/fluencyIcons/Search.svg";

import RenderLangsSelections from "./renderLangs";

type Props = {
  langs: string[][];
  isOpen: boolean;
  toggleOpen?: () => any;
  onClick?: (code: string) => any;
};

type LangItem = {
  code: string;
  name: string;
  show: boolean;
  onClick: (v: string) => any;
};

const LangItem = (props: LangItem) => (
  <Zoom key={props.code} in={props.show}>
    <Box
      bgcolor="primary.50"
      m={1}
      p={1}
      borderRadius={8}
      onClick={() => props.onClick && props.onClick(props.code)}
    >
      <b>{props.code}</b>
      <Box>{props.name}</Box>
    </Box>
  </Zoom>
);

const RenderLangs = (props: Props, search: string) => {
  const { langs, onClick } = props;
  return langs.map((lang) => {
    const [code, name] = lang;
    const matchSearch = lang[1].includes(search);
    return (
      <LangItem
        key={code}
        show={matchSearch}
        code={code}
        name={name}
        onClick={() => onClick && onClick(lang[1])}
      />
    );
  });
};

export default function LangSelection(props: Props) {
  const [search, setSearch] = useState("");
  // const LangsItems = useMemo(() => RenderLangs(props, search), [search]);

  return (
    <Dialog
      open={props.isOpen}
      scroll="paper"
      fullWidth
      onClose={() => props.toggleOpen && props.toggleOpen()}
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
        <RenderLangsSelections langs={props.langs} search={search} onClick={() => props.onClick} />
      </DialogContent>
    </Dialog>
  );
}
