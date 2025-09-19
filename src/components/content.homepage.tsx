"use client";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Chip,
  Stack,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import { MenuOutlined } from "@mui/icons-material";

const booksRecommended = [
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    img: "/books/money.jpg",
  },
  {
    title: "How Innovation Works",
    author: "Matt Ridley",
    img: "/books/innovation.jpg",
  },
  {
    title: "Company of One",
    author: "Paul Jarvis",
    img: "/books/company.jpg",
  },
  {
    title: "Stupore E Tremori",
    author: "Amelie Nothomb",
    img: "/books/stupore.jpg",
  },
];

const booksCategories = [
  { title: "The Bees", author: "Laline Paull", img: "/books/bees.jpg" },
  { title: "Real Help", author: "Ayodeji Awosika", img: "/books/help.jpg" },
  {
    title: "The Fact of a Body",
    author: "Alex Marzano",
    img: "/books/fact.jpg",
  },
  { title: "The Room", author: "Jonas Karlsson", img: "/books/room.jpg" },
  {
    title: "Through the Language Glass",
    author: "Cate Emond",
    img: "/books/glass.jpg",
  },
];

const BookContentHomePage = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ p: 3, bgcolor: "#f9f9fb", minHeight: "100vh" }}>
      {/* Recommended Section */}
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
            Recommended
          </Typography>
          <Button endIcon={<ArrowForwardIosIcon />} size="small">
            See All
          </Button>
        </Box>
        <Grid container spacing={2} mt={1}>
          {booksRecommended.map((book) => (
            //@ts-ignore
            <Grid item xs={4} sm={3} key={book.title}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={book.img}
                  alt={book.title}
                />
                <CardContent>
                  <Typography variant="body2" noWrap>
                    {book.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {book.author}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Categories Section */}
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 3,
          p: 2,
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            Categories
          </Typography>
          <IconButton>
            <MenuOutlined />
          </IconButton>
        </Box>
        <Stack direction="row" spacing={1} my={2} flexWrap="wrap">
          <Chip label="All" clickable />
          <Chip label="Sci-Fi" clickable />
          <Chip label="Fantasy" clickable />
          <Chip label="Drama" clickable />
          <Chip label="Business" clickable />
          <Chip label="Education" clickable />
          <Chip label="Geography" clickable />
        </Stack>
        <Grid container spacing={2}>
          <Grid container spacing={2}>
            {booksCategories.map((book) => (
              //@ts-ignore
              <Grid item xs={6} sm={4} md={3} key={book.title}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="160"
                    image={book.img}
                    alt={book.title}
                  />
                  <CardContent>
                    <Typography variant="body2" noWrap>
                      {book.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {book.author}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default BookContentHomePage;
