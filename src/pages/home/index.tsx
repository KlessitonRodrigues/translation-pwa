import Translation from "../../components/translation";
import TranslationAPI from "../../data/api/translation";

type Props = {
  langs: { code: string; name: string }[];
};

export default function Home(props: Props) {
  return <Translation ssr={{ langs: props.langs }} />;
}

export async function getStaticProps(): Promise<{ props: Props }> {
  const res = await TranslationAPI.getSuportedLangs();

  return {
    props: {
      langs: res.data || [],
    },
  };
}
