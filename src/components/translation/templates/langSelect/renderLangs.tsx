import Box from "@material-ui/core/Box";
import Slide from "@material-ui/core/Slide";
import { useCallback } from "react";

type Props = {
  langs: string[][];
  search: string;
  onClick: (v: string) => any;
};

type LangItemProps = {
  show: boolean;
  code: string;
  name: string;
  onClick: (v: string) => any;
};

const LangItem = (props: LangItemProps) => (
  <Slide direction="left" key={props.code} in={props.show} unmountOnExit>
    <Box
      bgcolor="primary.50"
      m={1}
      p={1}
      borderRadius={8}
      onClick={() => props.onClick && props.onClick(props.code)}
    >
      <b>{props.code.toUpperCase()}</b>
      <Box>{props.name}</Box>
    </Box>
  </Slide>
);

const RenderLangsSelections = ({ langs, search, onClick }: Props) => {
  const code = 0;
  const name = 1;

  const toRender = useCallback(
    () =>
      langs.map((lang) => {
        const matchSearch = lang.join(" ").includes(search);
        return (
          <LangItem
            show={matchSearch}
            key={lang[code]}
            code={lang[code]}
            name={lang[name]}
            onClick={onClick}
          />
        );
      }),
    [search]
  );

  return (
    <Box
      display="grid"
      gridTemplateColumns="1fr 1fr 1fr"
      alignContent="flex-start"
      height={800}
      paddingBottom={4}
    >
      {toRender()}
    </Box>
  );
};

export default RenderLangsSelections;
