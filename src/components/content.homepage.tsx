"use client";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";
import { useBookContext } from "@/app/context/book.context";

export default function BookContentHomePage({
  initialData,
}: {
  initialData: IBook[];
}) {
  const { setSelectedBook } = useBookContext();
  const [books, setBooks] = useState<IBook[]>(initialData);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pageSize = 10;

  const loadMore = async (nextPage: number) => {
    setIsLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/books?current=${nextPage}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    setBooks(data?.data?.result ?? []);
    setPage(nextPage);
    setIsLoading(false);
  };

  return (
    <Box sx={{ p: 3, bgcolor: "#f9f9fb", minHeight: "100vh" }}>
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 3,
          p: 2,
          mb: 3,
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            Categories
          </Typography>
          <Button endIcon={<ArrowForwardIosIcon />} size="small">
            See All
          </Button>
        </Box>

        <Swiper
          modules={[Navigation, Pagination, Grid]}
          spaceBetween={20}
          slidesPerView={5}
          grid={{ rows: 2, fill: "row" }}
          navigation
        >
          {books.length > 0 &&
            books.map((book: IBook, index: number) => (
              <SwiperSlide key={`${book.title}-${index}`}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => setSelectedBook(book)}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={book.thumbnail}
                    alt={book.title}
                  />
                  <CardContent>
                    <Typography variant="body2" noWrap>
                      {book.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {book.authors}
                    </Typography>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              mt: 2,
              gap: 3,
            }}
          >
            <Button
              sx={{ width: 100 }}
              onClick={() => loadMore(page - 1)}
              variant="contained"
              disabled={page === 1}
              loading={isLoading}
            >
              Previous
            </Button>
            <Button
              loading={isLoading}
              sx={{ width: 100 }}
              onClick={() => loadMore(page + 1)}
              variant="contained"
            >
              Next
            </Button>
          </Box>
        </Swiper>
      </Box>
    </Box>
  );
}
