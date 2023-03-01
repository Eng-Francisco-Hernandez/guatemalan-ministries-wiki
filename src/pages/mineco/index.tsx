import NavbarLayout from "@/components/layout/NavbarLayout";
import Mineco from "@/components/mineco/Mineco";
import { useEffect, useState } from "react";

export default function index() {
  const [publicItems, setPublicItems] = useState([]);
  useEffect(() => {
    async function fetchPublicItems() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/economy-ministry/public-information`
        );
        const parsedResponse = await res.json();
        setPublicItems(
          parsedResponse.filter(
            (item: any) => item.url !== null && !item.url.endsWith(".pdf")
          )
        );
      } catch (error) {
        console.error(error);
      }
    }
    fetchPublicItems();
  }, []);
  return (
    <NavbarLayout showHomeIcon>
      <Mineco publicItems={publicItems} />
    </NavbarLayout>
  );
}
