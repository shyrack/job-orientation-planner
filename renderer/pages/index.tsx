import Link from "next/link";

type IndexPageProps = {};

export default function IndexPage(props: IndexPageProps) {
  return <Link href={"/test"}>Test</Link>;
}
