import NavbarLayout from "@/components/layout/NavbarLayout";
import Minfin from "@/components/minfin/Minfin";
import { Paper } from "@mui/material";

export default function index({ publicItems = [] }) {
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
