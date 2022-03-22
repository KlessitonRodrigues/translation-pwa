import { Box, Zoom } from "@material-ui/core";
import React from "react";

import * as s from "./styles";

import { RenderLangsSelectionsProps as Props, LangItemProps } from "../../types";

const LangItem = ({ lang, onClick, show }: LangItemProps) => (
  <Zoom in={show} key={lang.code} style={{ display: show ? "block" : "none" }}>
    <s.LangItem onClick={() => onClick && onClick(lang)}>
      <b>{lang.code.toUpperCase()}</b>
      <Box>{lang.name.toUpperCase()}</Box>
    </s.LangItem>
  </Zoom>
);

const RenderLangsSelections = ({ langs, search, onClick }: Props) => {
  const toRender = React.useMemo(() => {
    const lowerCaseSearch = search.toLowerCase();

    return langs.map((lang) => {
      const matchSearch = (lang.code + " " + lang.name).toLowerCase().includes(lowerCaseSearch);
      return <LangItem show={matchSearch} lang={lang} onClick={onClick} key={lang.code} />;
    });
  }, [search]);

  return <s.LangGrid>{toRender}</s.LangGrid>;
};

export default RenderLangsSelections;
