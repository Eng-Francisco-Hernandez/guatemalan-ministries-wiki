import NavbarLayout from "@/components/layout/NavbarLayout";
import Mineco from "@/components/mineco/Mineco";

export default function index({ publicItems = [] }) {
  return (
    <NavbarLayout showHomeIcon>
      <Mineco publicItems={publicItems} />
    </NavbarLayout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/economy-ministry/public-information`
  );
  const parsedResponse = await res.json();
  return {
    props: {
      publicItems: parsedResponse.filter(
        (item: any) => item.url !== null && !item.url.endsWith(".pdf")
      ),
    },
  };
}
