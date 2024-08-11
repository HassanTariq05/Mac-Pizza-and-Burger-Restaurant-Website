import React, { useState, useEffect } from 'react';
import '../css/style.css';
import '../css/responsive.css';
import { Link, useParams } from 'react-router-dom';
import '../js/menu';
import '../js/booking-form';
import '../js/changer';
import '../js/comment-form';
import '../js/contact-form';
import '../js/jquery.scrollto';
import ShopProduct from '../components/ShopProduct';
import CategorySidebar from '../components/CategorySidebar';
import productService from '../components/productService';
import { baseURL } from '../components/service';
import allCategoryProductService from '../components/allCategoryProductsService';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import placeHolderImg from "../images/placeHolderImg.jpg"

function Shop() {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(category || 'all');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0); // New state for total results
    const [sortOption, setSortOption] = useState('menu_order');

    const fetchProducts = async () => {
        try {
            let response;
            if (selectedCategory === 'all') {
                const params = { id: "53dc5677-4a67-4b7f-a8a6-33304311512a", page };
                response = await allCategoryProductService.get(params);
            } else {
                const params = { id: selectedCategory, page };
                response = await productService.getAll(params);
            }
            setProducts(response.data.data);
            setTotalPages(response.data.meta.last_page);
            setTotalResults(response.data.meta.total); // Set total results from response
        } catch (error) {
            // console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory, page]);

    useEffect(() => {
        let sorted = [...products];
        switch (sortOption) {
            case 'price':
                sorted.sort((a, b) => a.min_price - b.min_price);
                break;
            case 'price-desc':
                sorted.sort((a, b) => b.min_price - a.min_price);
                break;
            default:
                // Default sorting logic (if any)
                break;
        }
        setSortedProducts(sorted);
    }, [products, sortOption]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    return (
        <div id="page" className="page">
            <div id="about-page" className="page-hero-section division" style={{ backgroundImage: "url('')" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="hero-txt text-center white-color">
                                <div id="breadcrumb">
                                    <div className="row">
                                        <div className="col">
                                            <div className="breadcrumb-nav">
                                                <nav aria-label="breadcrumb">
                                                    <ol className="breadcrumb">
                                                        <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                                        <li className="breadcrumb-item active" aria-current="page">SHOP</li>
                                                    </ol>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h2 className="h2-xl">SHOP</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="wide-100 Shop-page division">
                <div className="container">
                    <div className="shop-main d-flex flex-wrap">
                        <CategorySidebar onCategorySelect={setSelectedCategory} />
                        {sortedProducts.length > 0 ? 
                            <div className="shop-content">
                            <div className="top-bar">
                                <div className="leftbox">
                                    <p>Showing {(page - 1) * 10 + 1}–{Math.min(page * 10, totalResults)} of {totalResults} results</p>
                                </div>
                                <div className="select-wrap">
                                    <select value={sortOption} onChange={handleSortChange}>
                                        <option value="menu_order">Default sorting</option>
                                        <option value="price">Sort by price: low to high</option>
                                        <option value="price-desc">Sort by price: high to low</option>
                                    </select>
                                </div>
                            </div>
                            <div className="categories-tabbing-content">
                                <div className="categories-tab-box active" id="1">
                                    <div className="row">
                                        {sortedProducts.map((item) => (
                                            <ShopProduct
                                                key={item.id}
                                                title={item.translation.title}
                                                description={item.translation.description}
                                                price={[item.min_price, item.max_price]}
                                                image={`${baseURL}/${item.img}`}
                                                quantity={item.min_qty}
                                                maxQuantity={item.max_qty}
                                                stocks={item.stocks}
                                                hasOption={item.stocks.length > 1}
                                                uuid={item.uuid}
                                                categoryUUID={selectedCategory}
                                                productType={false}
                                                stockId={item.stocks.length === 1 ? item.stocks[0].id : null}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Stack spacing={2}>
                                    <Pagination 
                                        count={totalPages} 
                                        page={page} 
                                        onChange={handlePageChange} 
                                        variant="outlined" 
                                        color="primary" 
                                    />
                                </Stack>
                            </div>
                        </div>
                        :
                        <div className='placeHolderDiv'>
                            <div className='text-center'>
                            <img src={placeHolderImg} className='placeHolderImg' ></img>
                            <h2>No Products Available</h2>
                         </div>
                            </div>
                            }
                        
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Shop;
