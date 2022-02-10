import { ButtonProps, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  ToggleTextButton: {
    whiteSpace: "nowrap",
    "& b": {
      transition: "1s",
      maxWidth: "0px",
      opacity: 0,
    },
    "&:hover b": {
      maxWidth: "300px",
      opacity: 1,
    },
  },
});

export default function ToggleTextButton(props: ButtonProps) {
  const classes = useStyles();
  return (
    <Button className={classes.ToggleTextButton} {...props}>
      {props.children}
    </Button>
  );
}
