import { sendRequest } from "@/app/api/api";
import { authOptions } from "@/app/api/auth/auth.options";
import BookLibrary from "@/components/booklibrary/book.library";
import { getServerSession } from "next-auth";

const LibraryPage = async () => {
  const session = await getServerSession(authOptions);

  const res = await sendRequest<IBackendRes<IPaginatedResponse<IFollowBook>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/follows?current=1&pageSize=10`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });

  const books: IFollowBook[] = res?.data?.result ?? [];
  const totalPage: number = res?.data?.meta?.pages ?? 1;

  return <BookLibrary initialData={books} totalPage={totalPage} />;
};

export default LibraryPage;
