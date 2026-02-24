import { sendRequest } from "@/app/api/api";
import { authOptions } from "@/app/api/auth/auth.options";
import RecommendationsBook from "@/components/recommended/recommended.book";
import { getServerSession } from "next-auth";

const RecommendationsPage = async () => {
  const session = await getServerSession(authOptions);

  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/follows/recommend?current=1&pageSize=10`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });

  const books = res?.data?.result ?? [];
  const totalPage = res?.data?.meta.pages;

  return <RecommendationsBook initialData={books} totalPage={totalPage} />;
};

export default RecommendationsPage;
