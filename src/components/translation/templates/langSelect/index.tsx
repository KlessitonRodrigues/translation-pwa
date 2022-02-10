import { Box } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

const LangComponent = (lang: { name: string; id: string }) => (
  <Box>
    <Box>{lang.id}</Box>
    {lang.name}
  </Box>
);

export default function LangSelection() {
  return (
    <Dialog open>
      <DialogTitle>Language Select</DialogTitle>
      <DialogContent></DialogContent>
    </Dialog>
  );
}
