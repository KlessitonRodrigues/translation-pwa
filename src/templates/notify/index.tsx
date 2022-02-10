import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";

type Props = {
  serverity?: "success" | "error" | "info" | "warning";
  msg?: string;
  open?: boolean;
  progress?: boolean;
  onClose?: () => {};
  onClick?: () => {};
};

export default function Notify(props: Props) {
  return (
    <Snackbar open={props.open}>
      <Paper elevation={4}>
        <Alert onClose={props.onClose} onClick={props.onClick} severity={props.serverity}>
          <Box minWidth={400}>{props.msg || ""}</Box>
        </Alert>
        {props.progress && <LinearProgress />}
      </Paper>
    </Snackbar>
  );
}
