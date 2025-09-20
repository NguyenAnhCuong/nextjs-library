"use client";

import { Box, CardMedia, Typography, Button, Rating } from "@mui/material";
import { useBookContext } from "@/app/context/book.context";

const DetailBook = () => {
  const { selectedBook } = useBookContext();

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
        <Box textAlign="center">
          <Typography fontWeight="bold">
            {selectedBook.published_year}
          </Typography>
          <Typography variant="caption">Published Year</Typography>
        </Box>
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
          background: "#2979ff",
          textTransform: "none",
          fontWeight: "bold",
        }}
      >
        Follow
      </Button>
    </Box>
  );
};

export default DetailBook;
