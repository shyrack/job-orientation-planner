import { Button } from "@mui/material";

type Props = {
  name: string;
  pageId: string;
};

export default function NavbarItem(props: Props) {
  const { name, pageId } = props;

  return <Button color="primary">{name}</Button>;
}
