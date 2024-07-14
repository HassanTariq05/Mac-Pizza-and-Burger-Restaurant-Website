import React, { useState, useEffect } from 'react';
import '../css/ProductView.css';
import '../css/style.css';
import '../css/responsive.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useStateValue } from '../components/StateProvider';
import ShopProduct from '../components/ShopProduct';
import singleProductService from '../components/singleProductService';
import { baseURL } from '../components/service';
import productService from '../components/productService';

const ProductView = () => {
    const { uuid, categoryUUID } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [ size, setSize] = useState('');
    const [showAdditionalPrice, setShowAdditionalPrice] = useState(false);
    const [additionalPrice, setAdditionalPrice] = useState(0);
    const [{ basket }, dispatch] = useStateValue();
    const navigate = useNavigate();
    const [stockId, setStockId] = useState();

    const [product, setProduct] = useState(null);

    const encodedUuid = decodeURIComponent(uuid);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const params = { id: encodedUuid };
                const response = await singleProductService.getAll(params);
                setProduct(response.data.data);
                if (product.stocks.length === 0) {
                    setStockId(product.stocks[0].id);
                }
                console.log('Single Product api response:', response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [encodedUuid]);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const params = { id: categoryUUID };
                const response = await productService.getAll(params);
                setProducts(response.data.data);
                console.log('Related Products api response:', response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchProducts();
    }, [categoryUUID]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const addToBasket = () => {
        const itemIndex = basket.findIndex((item) => item.title === product.translation.title && item.size === size);
        if (itemIndex >= 0) {
            console.log(basket[itemIndex].quantity);
            dispatch({
                type: 'UPDATE_QUANTITY',
                item: {
                    title: product.translation.title,
                    quantity: basket[itemIndex].quantity + quantity,
                    size: size,
                },
            });
        } else {
            dispatch({
                type: 'ADD_TO_BASKET',
                item: {
                    title: product.translation.title,
                    image: `${baseURL}/${product.img}`,
                    price: (additionalPrice === 0) ? (product.min_price) : (additionalPrice),
                    description: product.translation.description,
                    quantity: quantity,
                    size: size,
                    stockId: stockId,
                },
            });
        }
        navigate(`/shop/add-to-cart/${product.translation.title}/${size}`);
    };

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value);
        if (value >= product.min_qty && value <= product.max_qty) {
            setQuantity(value);
        }
    };

    const handleSizeChange = (event) => {
        const selectedSize = event.target.value;
        setSize(selectedSize);

        if (selectedSize === '') {
            setShowAdditionalPrice(false);
            setAdditionalPrice(0);
        } else {
            const selectedStock = product.stocks.find((stock) => stock.extras[0].value.value === selectedSize);
            if (selectedStock) {
                setShowAdditionalPrice(true);
                setAdditionalPrice(selectedStock.price);
            } else {
                setShowAdditionalPrice(false);
                setAdditionalPrice(0);
            }
        }


    };

    const handleAddToCartClick = () => {
        if (product.stocks.length > 1 && size === '') {
            alert('Choose a size');
        } else {
            addToBasket();
        }
    };

    const price = [product.min_price, product.max_price];

    return (
        <>
            <div id="about-page" className="page-hero-section1" style={{ backgroundImage: 'url("")' }}>
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
                                                        <li className="breadcrumb-item">
                                                            <Link to='/home'>Home</Link>
                                                        </li>
                                                        <li className="breadcrumb-item active" aria-current="page">{product.translation.title}</li>
                                                    </ol>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="product-view">
                <div className="product-image">
                    <img src={`${baseURL}/${product.img}`} alt={product.translation.title} />
                </div>
                <div className="product-details">
                    <h1 className="product-title">{product.translation.title}</h1>
                    
                    {Array.isArray(price) && price.length > 0 ? (
                        price.length > 1 && price[0] !== price[1] ? (
                            <p className="product-price">{`${parseFloat(price[0]).toFixed(2)}som-${parseFloat(price[1]).toFixed(2)}som`}</p>
                        ) : (
                            <p className="product-price">{`${parseFloat(price[0]).toFixed(2)}som`}</p>
                        )
                    ) : (
                        <p className="product-price">Price not available</p>
                    )}
                    
                    {product.stocks.length > 1 && (
                        <div className="product-size">
                            <label className='sizeLabel' htmlFor="size">Size</label>
                            <select id="size" value={size} onChange={handleSizeChange}>
                                <option value="">Choose an option</option>
                                {product.stocks.map((stock, index) => (
                                    <option key={index} value={stock.extras[0].value.value}>{stock.extras[0].value.value}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    <hr className="separator-line" /> {/* Add separator line */}
                    {showAdditionalPrice && (
                        <p className="product-price">{`${additionalPrice}.00som`}</p>
                    )}
                    <div className="product-quantity">
                        <input
                            className="qty"
                            type="number"
                            min={product.min_qty}
                            max={product.max_qty}
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                        <button onClick={handleAddToCartClick} className="addToCart"><span className="flaticon-shopping-bag"></span>Add to Cart</button>
                    </div>
                    <div className="category-container">
                        <div className="categoryLabel">Category:</div>
                        <div className="product-category">{product.category.translation.title}</div>
                    </div>
                </div>
            </div>
            <div className="related-products-section">
                <h2>Related Products</h2>
                <div className="related-products">
                    {products && products.map((item) => (
                        <ShopProduct
                        key={item.id}
                        title={item.translation.title}
                        description={item.translation.description}
                        price={[item.min_price, item.max_price]}
                        image={`${baseURL}/${item.img}`}
                        quantity={item.min_qty}
                        maxQuantity={item.max_qty}
                        stocks={item.stocks}
                        hasOption={(item.stocks.length > 1) ? true : false}
                        uuid={item.uuid}
                        categoryUUID={categoryUUID}
                        productType={true}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProductView;
