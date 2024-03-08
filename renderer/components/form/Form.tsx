import { Grid } from "@mui/material";

type FormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
};

export default function Form(props: FormProps) {
  const { onSubmit, children } = props;
  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        {children}
      </Grid>
    </form>
  );
}
