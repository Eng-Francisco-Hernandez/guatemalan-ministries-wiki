import NavbarLayout from "@/components/layout/NavbarLayout";
import Mineco from "@/components/mineco/Mineco";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

export default function Index() {
  const [publicItems, setPublicItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPublicItems() {
      setLoading(true);
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
      setLoading(false);
    }
    fetchPublicItems();
  }, []);
  return (
    <NavbarLayout showHomeIcon>
      {loading ? (
        <div className="loader-container">
          <CircularProgress />
        </div>
      ) : (
        <Mineco publicItems={publicItems} />
      )}
    </NavbarLayout>
  );
}
