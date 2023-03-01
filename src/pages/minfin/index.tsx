import NavbarLayout from "@/components/layout/NavbarLayout";
import Minfin from "@/components/minfin/Minfin";
import { Paper } from "@mui/material";
import { useEffect, useState } from "react";

export default function index() {
  const [publicItems, setPublicItems] = useState([]);

  useEffect(() => {
    async function fetchPublicItems() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/public-finances-ministry/public-information`
        );
        const parsedResponse = await res.json();
        setPublicItems(parsedResponse);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPublicItems();
  }, []);
  return (
    <NavbarLayout showHomeIcon>
      <Minfin publicItems={publicItems} />
    </NavbarLayout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/public-finances-ministry/public-information`
  );
  const parsedResponse = await res.json();
  return {
    props: {
      publicItems: parsedResponse,
    },
  };
}
