"use client";

import {
  Box,
  CardMedia,
  Typography,
  Button,
  Rating,
  Divider,
} from "@mui/material";
import { useBookContext } from "@/app/context/book.context";
import { sendRequest } from "@/app/api/api";
import { url } from "inspector";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const DetailBook = () => {
  const { data: session } = useSession();
  const { selectedBook } = useBookContext();

  const [isFollowed, setIsFollowed] = useState<boolean>(false);

  useEffect(() => {
    if (!selectedBook?._id || !session?.access_token) return;

    const fetchFollowStatus = async () => {
      const res = await sendRequest<IBackendRes<boolean>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/follows/check/${selectedBook._id}`,
        method: "GET",
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (res.data) {
        setIsFollowed(res.data === true);
      }
    };

    setIsFollowed(false);
    fetchFollowStatus();
  }, [selectedBook?._id, session?.access_token]);

  if (!selectedBook) {
    return (
      <Box
        height="calc(100vh - 64px)"
        display="flex"
        justifyContent="center"
        alignItems="center"
        color="gray"
        p={3}
        sx={{
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
        position={"fixed"}
        width={"350px"}
      >
        <Typography variant="body2">Select a book to see details</Typography>
      </Box>
    );
  }

  const handleFollowBook = async (bookId: string) => {
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/follows`,
      method: "POST",
      headers: { Authorization: `Bearer ${session?.access_token}` },
      body: {
        bookId,
      },
    });

    if (res.error === "Unauthorized") {
      await signOut();
      signIn();
    }

    if (res.data) {
      setIsFollowed((prev) => !prev); // cập nhật state
    }
  };

  return (
    <Box
      height="calc(100vh - 64px)"
      bgcolor="#0d1b4c"
      color="white"
      p={3}
      sx={{
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
      position={"fixed"}
      width={"350px"}
    >
      {/* Ảnh sách */}
      <CardMedia
        component="img"
        image={selectedBook.thumbnail}
        alt={selectedBook.title}
        sx={{
          width: "200px",
          height: "280px",
          objectFit: "cover",
          borderRadius: 2,
          mx: "auto",
        }}
      />

      {/* Thông tin */}
      <Box textAlign="center" mt={2}>
        <Typography variant="h6" fontWeight="bold">
          {selectedBook.title}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "gray.300" }}>
          {selectedBook.authors}
        </Typography>

        <Box display="flex" justifyContent="center" alignItems="center" mt={1}>
          <Rating
            value={selectedBook.average_rating}
            readOnly
            precision={0.1}
          />
          <Typography variant="body2" ml={1}>
            {selectedBook.average_rating}
          </Typography>
        </Box>
      </Box>

      {/* Stats */}
      <Box display="flex" justifyContent="space-around" mt={3}>
        <Box textAlign="center">
          <Typography fontWeight="bold">{selectedBook.num_pages}</Typography>
          <Typography variant="caption">Pages</Typography>
        </Box>
        <Divider
          orientation="vertical"
          sx={{ opacity: 0.6, border: "1px solid white" }}
        />
        <Box textAlign="center">
          <Typography fontWeight="bold">
            {selectedBook.published_year}
          </Typography>
          <Typography variant="caption">Published Year</Typography>
        </Box>
        <Divider
          orientation="vertical"
          sx={{ opacity: 0.6, border: "1px solid white" }}
        />
        <Box textAlign="center">
          <Typography fontWeight="bold">
            {selectedBook.ratings_count}
          </Typography>
          <Typography variant="caption">Reviews</Typography>
        </Box>
      </Box>
      <Box mt={3}>
        <Typography variant="body2" color="gray.200" whiteSpace="pre-line">
          {selectedBook.description ?? "No description available"}
        </Typography>
      </Box>

      {/* Button dưới cùng */}
      <Button
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          borderRadius: "30px",
          background: isFollowed ? "red" : "#2979ff",
          textTransform: "none",
          fontWeight: "bold",
        }}
        onClick={() => handleFollowBook(selectedBook._id)}
      >
        {isFollowed ? "Unfollow" : "Follow"}
      </Button>
    </Box>
  );
};

export default DetailBook;
