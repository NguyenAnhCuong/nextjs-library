import { sendRequest } from "@/app/api/api";
import { authOptions } from "@/app/api/auth/auth.options";
import RecommendationsBook from "@/components/recommended/recommended.book";
import { getServerSession } from "next-auth";

const RecommendationsPage = async () => {
  const session = await getServerSession(authOptions);

  const res = await sendRequest<IBackendRes<IPaginatedResponse<IBook>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/follows?current=1&pageSize=10`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });

  const books: IBook[] = res?.data?.result ?? [];
  const totalPage: number = res?.data?.meta?.pages ?? 1;

  return <RecommendationsBook initialData={books} totalPage={totalPage} />;
};

export default RecommendationsPage;
