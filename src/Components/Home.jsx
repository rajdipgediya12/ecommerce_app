import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/actions";
import { useNavigate } from "react-router-dom";

const Home = ({ product }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, [selectedCategory, currentPage]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://dummyjson.com/products/categories"
      );
      setCategories(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/products`);

      setProducts(
        Array.isArray(response.data.products) ? response.data.products : []
      );
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleAddToCart = () => {
    if (product && product.id) {
      dispatch(addToCart(product));
      navigate("/cart");
    } else {
      console.error("Invalid product data:", product);
    }
  };
  console.log(selectedCategory, "selectedCategory");
  console.log(categories, "categories");
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Explore Our Products
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <MenuItem value="all">All Categories</MenuItem>
              {Array.isArray(categories) &&
                categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container spacing={3}>
            {Array.isArray(products) &&
              products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                  <Card>
                    <CardMedia
                      component="img"
                      alt={product.title}
                      height="140"
                      image={product.thumbnail}
                    />
                    <CardContent>
                      <Typography variant="h6">{product.title}</Typography>
                      <Typography>${product.price}</Typography>
                      <Typography>{product.description}</Typography>

                      <Button variant="outlined" color="primary">
                        View Details
                      </Button>
                      <Link to={`/product/${product.id}/cart`}>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={handleAddToCart}
                          className="mt-2"
                        >
                          Add to cart
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              style={{ marginTop: 16 }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
