import BookContentHomePage from "@/components/content.homepage";
import { sendRequest } from "../api/api";

export default async function Home() {
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/books?current=1&pageSize=10`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const books = res?.data?.result ?? [];

  return <BookContentHomePage initialData={books} />;
}
