import NavbarLayout from "@/components/layout/NavbarLayout";
import Minfin from "@/components/minfin/Minfin";
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
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/public-finances-ministry/public-information`
        );
        const parsedResponse = await res.json();
        setPublicItems(parsedResponse);
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
        <Minfin publicItems={publicItems} />
      )}
    </NavbarLayout>
  );
}
