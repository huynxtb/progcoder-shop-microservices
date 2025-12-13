import {
  allCakeList,
  blogList,
  ornamentList,
} from "../data/Data";
import { createContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useKeycloak } from "../contexts/KeycloakContext";
import { searchProducts, getCategories, getBrands } from "../services/productService";

const FarzaaContext = createContext();

const FarzaaContextProvider = ({ children }) => {
  const { authenticated, login } = useKeycloak();
  
  // Wishlist Modal
  const [showWishlist, setShowWishlist] = useState(false);

  const handleWishlistClose = () => setShowWishlist(false);
  const handleWishlistShow = () => setShowWishlist(true);

  // Cart Modal
  const [showCart, setShowCart] = useState(false);

  const handleCartClose = () => setShowCart(false);
  const handleCartShow = () => setShowCart(true);

  // Video Modal
  const [showVideo, setShowVideo] = useState(false);

  const handleVideoClose = () => setShowVideo(false);
  const handleVideoShow = () => setShowVideo(true);

  // Header Category Button
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleCategoryBtn = () => {
    setIsCategoryOpen((prevState) => !prevState);
  };
  const categoryBtnRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoryBtnRef.current &&
        !categoryBtnRef.current.contains(event.target)
      ) {
        // Click occurred outside the button, so close the button
        setIsCategoryOpen(false);
      }
    };

    // Attach the click event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Countdown Timer
  const countdownDate = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
  ).getTime();
  const [isTimerState, setIsTimerState] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setInterval(() => setNewTime(), 1000);
  }, []);

  const setNewTime = () => {
    if (countdownDate) {
      const currentTime = new Date().getTime();

      const distanceToDate = countdownDate - currentTime;

      let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor(
        (distanceToDate % (1000 * 60 * 60)) / (1000 * 60)
      );
      let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);

      const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      days = `${days}`;
      if (numbersToAddZeroTo.includes(hours)) {
        hours = `0${hours}`;
      } else if (numbersToAddZeroTo.includes(minutes)) {
        minutes = `0${minutes}`;
      } else if (numbersToAddZeroTo.includes(seconds)) {
        seconds = `0${seconds}`;
      }

      setIsTimerState({ days: days, hours: hours, minutes, seconds });
    }
  };

  // Product Quick View Modal
  const [isProductViewOpen, setIsProductViewOpen] = useState(false);

  const handleProductViewClose = () => {
    setIsProductViewOpen(false);
  };
  const handleProductViewOpen = () => {
    setIsProductViewOpen(true);
  };

  // Sticky Header Section on Scroll
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 300) {
        setIsHeaderFixed(true);
      } else {
        setIsHeaderFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      // Clean up the event listener when the component is unmounted
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // List View Mode
  const [isListView, setIsListView] = useState(false);

  const setListView = () => {
    setIsListView(true);
  };
  const setGridView = () => {
    setIsListView(false);
  };
  // Price Filter
  const [maxPrice, setMaxPrice] = useState(100000000); // Default max price
  const [price, setPrice] = useState([0, 100000000]);

  const handlePriceChange = (event, newPrice) => {
    setPrice(newPrice);
  };

  // API Data States
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [brandsLoading, setBrandsLoading] = useState(false);

  // Product Filter States
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Calculate max price from products (only on initial load)
  useEffect(() => {
    if (filteredProducts && filteredProducts.length > 0 && isInitialLoad) {
      const prices = filteredProducts.map(p => p.price || 0);
      const calculatedMaxPrice = Math.max(...prices, 0);
      if (calculatedMaxPrice > 0) {
        // Round up to nearest 100000000 for better UX
        const roundedMax = Math.ceil(calculatedMaxPrice / 100000000) * 100000000;
        setMaxPrice(roundedMax);
        // Only update price range on initial load
        setPrice([0, roundedMax]);
        setIsInitialLoad(false);
      }
    } else if (filteredProducts && filteredProducts.length > 0 && !isInitialLoad) {
      // Update maxPrice when products change, but don't reset price filter
      const prices = filteredProducts.map(p => p.price || 0);
      const calculatedMaxPrice = Math.max(...prices, 0);
      if (calculatedMaxPrice > 0) {
        const roundedMax = Math.ceil(calculatedMaxPrice / 100000000) * 100000000;
        // Only update maxPrice if it's larger, but keep current price filter
        setMaxPrice(prevMax => Math.max(prevMax, roundedMax));
      }
    }
  }, [filteredProducts, isInitialLoad]);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  
  // Pagination
  const productsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Map API product to component format
  const mapApiProductToComponent = (apiProduct) => {
    // Get thumbnail URL
    let imgSrc = "";
    if (apiProduct.thumbnail) {
      imgSrc = typeof apiProduct.thumbnail === 'string' 
        ? apiProduct.thumbnail 
        : apiProduct.thumbnail.publicURL || "";
    } else if (apiProduct.images && apiProduct.images.length > 0) {
      const firstImage = apiProduct.images[0];
      imgSrc = typeof firstImage === 'string' 
        ? firstImage 
        : firstImage.publicURL || "";
    }

    return {
      id: apiProduct.id,
      name: apiProduct.name,
      price: apiProduct.price,
      salePrice: apiProduct.salePrice || 0,
      imgSrc: imgSrc,
      category: apiProduct.categories && apiProduct.categories.length > 0 ? apiProduct.categories[0] : null,
      categories: apiProduct.categories || [],
      sku: apiProduct.sku,
      slug: apiProduct.slug,
      status: apiProduct.status,
      displayStatus: apiProduct.displayStatus,
      featured: apiProduct.featured || false,
      images: apiProduct.images || [],
      isInWishlist: false,
    };
  };

  // Fetch products from API
  const fetchProducts = async (filters = {}) => {
    try {
      setProductsLoading(true);
      
      // Merge filters with current state
      const {
        searchText = filters.searchText !== undefined ? filters.searchText : searchTerm,
        categoryId = filters.categoryId !== undefined ? filters.categoryId : selectedCategory,
        minPrice = filters.minPrice !== undefined ? filters.minPrice : price[0],
        maxPrice = filters.maxPrice !== undefined ? filters.maxPrice : price[1],
        status = filters.status !== undefined ? filters.status : null,
        sortBy: sortByValue = filters.sortBy !== undefined ? filters.sortBy : sortBy,
        pageNumber = filters.pageNumber !== undefined ? filters.pageNumber : currentPage,
        pageSize = filters.pageSize !== undefined ? filters.pageSize : productsPerPage,
      } = filters;

      // Map sortBy to API format
      let apiSortBy = null;
      let apiSortType = null;
      
      switch (sortByValue) {
        case "name-az":
          apiSortBy = 1; // Name
          apiSortType = 1; // Asc
          break;
        case "name-za":
          apiSortBy = 1; // Name
          apiSortType = 2; // Desc
          break;
        case "price-low-high":
          apiSortBy = 3; // Price
          apiSortType = 1; // Asc
          break;
        case "price-high-low":
          apiSortBy = 3; // Price
          apiSortType = 2; // Desc
          break;
        default:
          break;
      }

      const params = {
        searchText: searchText || null,
        categories: categoryId || null,
        minPrice: minPrice > 0 ? minPrice : null,
        maxPrice: maxPrice && maxPrice > 0 ? maxPrice : null,
        status: status,
        sortBy: apiSortBy,
        sortType: apiSortType,
        pageNumber,
        pageSize,
      };

      const response = await searchProducts(params);
      
      if (response && response.result) {
        const products = response.result.products.map(mapApiProductToComponent);
        setFilteredProducts(products);
        setPaginatedProducts(products);
        setTotalProducts(response.result.paging?.totalCount || 0);
        setTotalPages(response.result.paging?.totalPages || 0);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
      setFilteredProducts([]);
      setPaginatedProducts([]);
    } finally {
      setProductsLoading(false);
    }
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const response = await getCategories();
      if (response && response.result && response.result.items) {
        setCategories(response.result.items);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
      setCategories([]);
    } finally {
      setCategoriesLoading(false);
    }
  };

  // Fetch brands from API
  const fetchBrands = async () => {
    try {
      setBrandsLoading(true);
      const response = await getBrands();
      if (response && response.result && response.result.items) {
        setBrands(response.result.items);
      } else {
        setBrands([]);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
      toast.error("Failed to load brands");
      setBrands([]);
    } finally {
      setBrandsLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchProducts();
  }, []);

  // Handle sort change
  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortBy(value);
    setCurrentPage(1);
    fetchProducts({ sortBy: value, pageNumber: 1 });
  };

  // Handle category filter
  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    fetchProducts({ categoryId, pageNumber: 1 });
  };

  // Handle price filter
  const handlePriceFilter = () => {
    setCurrentPage(1);
    fetchProducts({ 
      minPrice: price[0], 
      maxPrice: price[1],
      pageNumber: 1 
    });
  };

  // Handle search change with debounce
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setCurrentPage(1);
  };

  // Debounce search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchProducts({ searchText: searchTerm, pageNumber: 1 });
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Handle tag selection (for brands)
  const handleTagSelection = (tagId) => {
    const newSelectedTags = selectedTags.includes(tagId)
      ? selectedTags.filter((id) => id !== tagId)
      : [...selectedTags, tagId];
    
    setSelectedTags(newSelectedTags);
    setCurrentPage(1);
    
    // Filter by selected brand tags
    if (newSelectedTags.length > 0) {
      // For now, we'll use categories filter - brands can be added later
      fetchProducts({ pageNumber: 1 });
    } else {
      fetchProducts({ pageNumber: 1 });
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    scrollToTop();
    fetchProducts({ pageNumber: newPage });
  };

  // Cart Item Table
  const [cartItems, setCartItems] = useState([]);
  const cartItemAmount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleRemoveItem = (itemId) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
    toast.error("Item deleted from cart!");
  };
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 0) {
      if (newQuantity === 0) {
        handleRemoveItem(itemId); // Call the handleRemoveItem function
      } else {
        const updatedItems = cartItems.map((item) =>
          item.id === itemId
            ? {
                ...item,
                quantity: newQuantity,
                total: item.price * newQuantity,
              }
            : item
        );
        setCartItems(updatedItems);
      }
    }
  };

  // Add to Cart
  const addToCart = (itemId) => {
    // Check if user is authenticated
    if (!authenticated) {
      // Redirect to Keycloak login with current page as redirect URI
      login({ redirectUri: window.location.href });
      return;
    }

    // Find the item from filteredProducts using itemId
    const itemToAdd = filteredProducts.find((item) => item.id === itemId);

    if (itemToAdd) {
      const existingItemIndex = cartItems.findIndex(
        (item) => item.id === itemId
      );
      // Check if the item is already in the cart
      if (!cartItems.some((item) => item.id === itemId)) {
        // Set initial quantity to 1 and total to item's price
        const newItem = {
          ...itemToAdd,
          quantity: 1,
          total: itemToAdd.price,
        };

        setCartItems((prevCartItems) => [...prevCartItems, newItem]);
        toast.success("Item added in cart!");
      } else if (existingItemIndex !== -1) {
        // Increment quantity and update total
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quantity += 1;
        updatedCartItems[existingItemIndex].total =
          updatedCartItems[existingItemIndex].quantity * itemToAdd.price;

        setCartItems(updatedCartItems);
        toast.success("Item list updated in cart!");
      }
    } else {
      toast.warning("Item not found.");
    }
  };

  // Wishlist Item Table
  const [wishlist, setWishlist] = useState([]);
  const wishlistItemAmount = wishlist.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleRemoveItemWishlist = (itemId) => {
    const updatedItems = wishlist.filter((item) => item.id !== itemId);
    setWishlist(updatedItems);
    toast.error("Item deleted from wishlist!");
  };

  // Add to Wishlist

  const addToWishlist = (itemId) => {
    const itemToAdd = filteredProducts.find((item) => item.id === itemId);

    if (itemToAdd) {
      if (!wishlist.some((item) => item.id === itemId)) {
        const newItem = {
          ...itemToAdd,
          quantity: 1,
          total: itemToAdd.price,
          isInWishlist: true,
        };

        setWishlist((prevWishlistItems) => [...prevWishlistItems, newItem]);
        toast.success("Item added to wishlist!");
      } else {
        toast.warning("Item already in wishlist!");
      }
    } else {
      toast.error("Item not found in filteredProducts.");
    }
  };

  useEffect(() => {
    setFilteredProducts((prevFilteredProducts) => {
      const updatedProductList = prevFilteredProducts.map((item) => {
        if (wishlist.some((wishlistItem) => wishlistItem.id === item.id)) {
          return {
            ...item,
            isInWishlist: true,
          };
        } else {
          return {
            ...item,
            isInWishlist: false,
          };
        }
      });
      return updatedProductList;
    });
  }, [wishlist]);

  // Function to add wishlist items to cart
  const addWishlistToCart = () => {
    if (wishlist.length === 0) {
      toast.warning("No items in wishlist to add!");
      return;
    }

    const updatedCartItems = [...cartItems];

    wishlist.forEach((wishlistItem) => {
      const existingCartItemIndex = updatedCartItems.findIndex(
        (cartItem) => cartItem.id === wishlistItem.id
      );

      if (existingCartItemIndex !== -1) {
        // If item exists in cart, update its quantity
        updatedCartItems[existingCartItemIndex].quantity += 1;
        updatedCartItems[existingCartItemIndex].total += wishlistItem.price;
      } else {
        // If item does not exist in cart, add it with quantity 1
        const newCartItem = {
          ...wishlistItem,
          quantity: 1,
          total: wishlistItem.price,
        };
        updatedCartItems.push(newCartItem);
      }
    });

    setCartItems(updatedCartItems);
    setWishlist([]); // Clear the wishlist after adding to cart
    toast.success("Wishlist items added to cart!");
  };

  const addToCartFromWishlist = (item) => {
    const existingCartItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    const updatedWishlist = wishlist.filter(
      (wishlistItem) => wishlistItem.id !== item.id
    ); // Use a different parameter name

    if (existingCartItemIndex !== -1) {
      // If item exists in cart, update its quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingCartItemIndex].quantity += 1;
      updatedCartItems[existingCartItemIndex].total += item.price;
      setCartItems(updatedCartItems);
      toast.success("Item quantity updated in cart!");
    } else {
      // If item does not exist in cart, add it with quantity 1
      const newCartItem = {
        ...item,
        quantity: 1,
        total: item.price,
      };
      setCartItems((prevCartItems) => [...prevCartItems, newCartItem]);
      setWishlist(updatedWishlist); // Update wishlist after removing the item
      toast.success("Item added to cart!");
    }
  };

  // Total Price
  const subTotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  const shipping = cartItems.length === 0 ? 0.0 : 50.0;
  const coupon = cartItems.length === 0 ? 0.0 : 60.0;
  const finalPrice = subTotal - (shipping + coupon);

  // Blog List Category Filter
  const [filteredBlogList, setFilteredBlogList] = useState(blogList);
  const [activeBlogCategory, setActiveBlogCategory] = useState(null);
  const [paginatedBlogPost, setPaginatedBlogPost] = useState([]);
  // pagination
  const itemsPerBlogPage = 3; // Number of items per page

  const [currentBlogPage, setCurrentBlogPage] = useState(1);

  const handleBlogPageChange = (newPage) => {
    setCurrentBlogPage(newPage);
    scrollToTop();
  };
  useEffect(() => {
    const startIndex = (currentBlogPage - 1) * itemsPerBlogPage;
    const endIndex = startIndex + itemsPerBlogPage;

    const paginatedBlogSlice = filteredBlogList.slice(startIndex, endIndex);

    setPaginatedBlogPost(paginatedBlogSlice);
  }, [currentBlogPage, filteredBlogList]);

  const totalBlogs = filteredBlogList.length;
  const totalBlogPage = Math.ceil(totalBlogs / itemsPerBlogPage);

  // Search Filter
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filteredBlogs = blogList.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBlogList(filteredBlogs);
    setCurrentBlogPage(1); // Reset to the first page when search is changed
    setSelectedBlogTags([]); // Reset selected tags
    setActiveBlogCategory(null); // Reset active category
  };

  // Blog Category Filter

  const handleBlogCategoryFilter = (category) => {
    if (category === null) {
      setFilteredBlogList(blogList);
    } else {
      const filteredBlogs = blogList.filter(
        (item) => item.category === category
      );
      setFilteredBlogList(filteredBlogs);
    }
    setActiveBlogCategory(category);
    setCurrentBlogPage(1); // Reset to the first page when category is changed
    setSelectedBlogTags([]); // Reset selected tags
  };
  // Blog Tag Filter
  const [selectedBlogTags, setSelectedBlogTags] = useState([]);

  const handleBlogTagSelection = (tag) => {
    if (selectedBlogTags.includes(tag)) {
      setSelectedBlogTags(
        selectedBlogTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedBlogTags([...selectedBlogTags, tag]);
    }
  };
  // Filter products based on selected tags
  useEffect(() => {
    // Apply all active filters together
    let filteredBlogs = blogList;

    // Apply category filter
    if (activeBlogCategory !== null) {
      filteredBlogs = filteredBlogs.filter(
        (blog) => blog.category === activeBlogCategory
      );
    }

    // Apply tag filter
    if (selectedBlogTags.length > 0) {
      filteredBlogs = filteredBlogs.filter((blog) =>
        selectedBlogTags.includes(blog.category)
      );
    }

    // Apply search filter
    if (searchQuery.trim() !== "") {
      filteredBlogs = filteredBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Update filtered blog list and reset pagination
    setFilteredBlogList(filteredBlogs);
    setCurrentBlogPage(1);
  }, [searchQuery, selectedBlogTags, activeBlogCategory]);

  // jewelery shop
  const [jeweleryArray, setJeweleryArray] = useState(ornamentList);
  const [jeweleryWishlist, setJeweleryWishlist] = useState([]);
  const wishlistJewelleryItemAmount = jeweleryWishlist.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // random ornament array
  const [randomizedItems, setRandomizedItems] = useState([]);

  useEffect(() => {
    // Shuffle the array and store the shuffled order initially
    const shuffledItems = shuffleArray(jeweleryArray);
    setRandomizedItems(shuffledItems);
  }, []); // Empty dependency array, so the shuffle is done once on mount

  const handleRemoveJeweleryItemWishlist = (itemId) => {
    const updatedItems = jeweleryWishlist.filter((item) => item.id !== itemId);
    setJeweleryWishlist(updatedItems);
    toast.error("Item deleted from wishlist!");
  };

  const addToJeweleryWishlist = (itemId) => {
    const itemToAdd = jeweleryArray.find((item) => item.id === itemId);

    if (itemToAdd) {
      if (!jeweleryWishlist.some((item) => item.id === itemId)) {
        const newItem = {
          ...itemToAdd,
          quantity: 1,
          total: itemToAdd.price,
          isInWishlist: true,
        };

        setJeweleryWishlist((prevWishlistItems) => [
          ...prevWishlistItems,
          newItem,
        ]);
        toast.success("Item added to wishlist!");
      } else {
        toast.warning("Item already in wishlist!");
      }
    } else {
      toast.error("Item not found in filteredProducts.");
    }
  };

  const updateIsInWishlist = (itemsArray) => {
    return itemsArray.map((item) => {
      if (
        jeweleryWishlist.some((wishlistItem) => wishlistItem.id === item.id)
      ) {
        return {
          ...item,
          isInWishlist: true,
        };
      } else {
        return {
          ...item,
          isInWishlist: false,
        };
      }
    });
  };

  useEffect(() => {
    setJeweleryArray((prevFilteredProducts) =>
      updateIsInWishlist(prevFilteredProducts)
    );
    setRandomizedItems((prevRandomizedItems) =>
      updateIsInWishlist(prevRandomizedItems)
    );
  }, [jeweleryWishlist]);

  // Jewelery add to cart array
  const [jeweleryAddToCart, setJeweleryAddToCart] = useState([]);
  // Jewelery cart total amount
  const jeweleryCartItemAmount = jeweleryAddToCart.reduce(
    (total, item) => total + item.quantity,
    0
  );
  // handle remove method for jewelery shop
  const handleRemoveJeweleryCartItem = (itemId) => {
    const updatedItems = jeweleryAddToCart.filter((item) => item.id !== itemId);
    setJeweleryAddToCart(updatedItems);
    toast.error("Item deleted from wishlist!");
  };
  // handle quantity change for jewelery shop
  const handleJeweleryCartQuantityChange = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      handleRemoveJeweleryCartItem(itemId); // Call the handleRemoveItem function
    } else {
      const updatedItems = jeweleryAddToCart.map((item) =>
        item.id === itemId
          ? { ...item, quantity: newQuantity, total: item.price * newQuantity }
          : item
      );
      setJeweleryAddToCart(updatedItems);
    }
  };
  // Add to cart in jewelery shop
  const addToJeweleryCart = (itemId) => {
    const itemToAdd = ornamentList.find((item) => item.id === itemId);

    if (itemToAdd) {
      const existingItemIndex = jeweleryAddToCart.findIndex(
        (item) => item.id === itemId
      );
      // Check if the item is already in the cart
      if (!jeweleryAddToCart.some((item) => item.id === itemId)) {
        // Set initial quantity to 1 and total to item's price
        const newItem = {
          ...itemToAdd,
          quantity: 1,
          total: itemToAdd.price,
        };

        setJeweleryAddToCart((prevAddToCartItems) => [
          ...prevAddToCartItems,
          newItem,
        ]);
        toast.success("Item added in AddToCart!");
      } else if (existingItemIndex !== -1) {
        // Increment quantity and update total
        const updatedAddToCartItems = [...jeweleryAddToCart];
        updatedAddToCartItems[existingItemIndex].quantity += 1;
        updatedAddToCartItems[existingItemIndex].total =
          updatedAddToCartItems[existingItemIndex].quantity * itemToAdd.price;

        setJeweleryAddToCart(updatedAddToCartItems);
        toast.success("Item list updated in AddToCart!");
      }
    } else {
      toast.warning("Item not found in ornament list.");
    }
  };

  // Cake Shop cart
  // Main cake list array
  const [cakeListArray, setCakeListArray] = useState(allCakeList);

  // random cake array
  const [randomizedCakes, setRandomizedCakes] = useState([]);
  const [randomizedCakesSecond, setRandomizedCakesSecond] = useState([]);
  const cakeSlice = cakeListArray.slice(-8);
  useEffect(() => {
    // Shuffle the array and store the shuffled order initially for the first state variable
    const shuffledCakes = shuffleArray(cakeSlice);
    setRandomizedCakes(shuffledCakes);

    // Create a new shuffled array for the second state variable
    const shuffledCakesSecond = shuffleArray(cakeSlice.slice()); // Create a copy of cakeSlice before shuffling
    setRandomizedCakesSecond(shuffledCakesSecond);
  }, []); // Empty dependency array, so the shuffle is done once on mount

  // Wishlist

  // Initiate cake shop wishlist array
  const [wishlistCakes, setWishlistCakes] = useState([]);
  const wishlistCakeAmount = wishlistCakes.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Cake wishlist remove item method
  const handleRemoveCakeWishlist = (itemId) => {
    const updatedItems = wishlistCakes.filter((item) => item.id !== itemId);
    setWishlistCakes(updatedItems);
    toast.error("Item deleted from wishlist!");
  };

  // Add to Cake wishlist
  const addToCakeWishlist = (itemId) => {
    // Find the item from allCakeList using itemId
    const itemToAdd = cakeListArray.find((item) => item.id === itemId);

    if (itemToAdd) {
      if (!wishlistCakes.some((item) => item.id === itemId)) {
        const newItem = {
          ...itemToAdd,
          quantity: 1,
          total: itemToAdd.price,
          isInWishlist: true,
        };

        setWishlistCakes((prevWishlistItems) => [
          ...prevWishlistItems,
          newItem,
        ]);
        toast.success("Item added to wishlist!");
      } else {
        toast.warning("Item already in wishlist!");
      }
    } else {
      toast.error("Item not found in All Cake List.");
    }
  };
  const updateIsInCakeWishlist = (itemsArray) => {
    return itemsArray.map((item) => {
      if (wishlistCakes.some((wishlistItem) => wishlistItem.id === item.id)) {
        return {
          ...item,
          isInWishlist: true,
        };
      } else {
        return {
          ...item,
          isInWishlist: false,
        };
      }
    });
  };

  useEffect(() => {
    setCakeListArray((prevFilteredProducts) =>
      updateIsInCakeWishlist(prevFilteredProducts)
    );
    setRandomizedCakes((prevRandomizedItems) =>
      updateIsInCakeWishlist(prevRandomizedItems)
    );
    setRandomizedCakesSecond((prevRandomizedItems) =>
      updateIsInCakeWishlist(prevRandomizedItems)
    );
  }, [wishlistCakes]);

  // Cart
  // Initiate cake shop cart array
  const [cartCakes, setCartCakes] = useState([]);
  // Cake cart quantity amount
  const cartCakeAmount = cartCakes.reduce(
    (total, item) => total + item.quantity,
    0
  );
  // Cake cart remove item method
  const handleRemoveCake = (itemId) => {
    const updatedItems = cartCakes.filter((item) => item.id !== itemId);
    setCartCakes(updatedItems);
    toast.error("Item deleted from cart!");
  };
  // Cake quantity change method
  const handleCakeQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 0) {
      if (newQuantity === 0) {
        handleRemoveCake(itemId); // Call the handleRemoveItem function
      } else {
        const updatedItems = cartCakes.map((item) =>
          item.id === itemId
            ? {
                ...item,
                quantity: newQuantity,
                total: item.price * newQuantity,
              }
            : item
        );
        setCartCakes(updatedItems);
      }
    }
  };

  // Add to Cake Cart
  const addToCakeCart = (itemId) => {
    // Find the item from allProductList using itemId
    const itemToAdd = allCakeList.find((item) => item.id === itemId);

    if (itemToAdd) {
      const existingItemIndex = cartCakes.findIndex(
        (item) => item.id === itemId
      );
      // Check if the item is already in the cart
      if (!cartCakes.some((item) => item.id === itemId)) {
        // Set initial quantity to 1 and total to item's price
        const newItem = {
          ...itemToAdd,
          quantity: 1,
          total: itemToAdd.price,
        };

        setCartCakes((prevCartItems) => [...prevCartItems, newItem]);
        toast.success("Item added in cart!");
      } else if (existingItemIndex !== -1) {
        // Increment quantity and update total
        const updatedCartCakes = [...cartCakes];
        updatedCartCakes[existingItemIndex].quantity += 1;
        updatedCartCakes[existingItemIndex].total =
          updatedCartCakes[existingItemIndex].quantity * itemToAdd.price;

        setCartCakes(updatedCartCakes);
        toast.success("Item list updated in cart!");
      }
    } else {
      toast.warning("Item not found in allProductList.");
    }
  };

  // Function to shuffle an array using Fisher-Yates algorithm
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  // Right Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarOpen = () => {
    setIsSidebarOpen(true);
  };
  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    home: false,
    shop: false,
    pages: false,
    blog: false,
  });
  const handleDropdownToggle = (dropdownName) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [dropdownName]: !prevState[dropdownName],
    }));
  };

  // Search Modal
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const toggleOpenSearch = () => {
    setSearchModalOpen(true);
  };

  const toggleCloseSearch = () => {
    setSearchModalOpen(false);
  };

  return (
    <FarzaaContext.Provider
      value={{
        showWishlist,
        handleWishlistClose,
        handleWishlistShow,
        showCart,
        handleCartClose,
        handleCartShow,
        showVideo,
        handleVideoClose,
        handleVideoShow,
        isCategoryOpen,
        handleCategoryBtn,
        categoryBtnRef,
        isTimerState,
        isProductViewOpen,
        handleProductViewClose,
        handleProductViewOpen,
        isHeaderFixed,
        isListView,
        setListView,
        setGridView,
        price,
        maxPrice,
        handlePriceChange,
        filteredProducts,
        sortBy,
        handleSortChange,
        handleCategoryFilter,
        handlePriceFilter,
        currentPage,
        handlePageChange,
        totalPages,
        paginatedProducts,
        productsPerPage,
        totalProducts,
        cartItems,
        handleQuantityChange,
        handleRemoveItem,
        wishlist,
        handleRemoveItemWishlist,
        addToCart,
        cartItemAmount,
        addToWishlist,
        categories,
        brands,
        productsLoading,
        categoriesLoading,
        brandsLoading,
        selectedTags,
        handleTagSelection,
        subTotal,
        shipping,
        coupon,
        finalPrice,
        filteredBlogList,
        handleBlogCategoryFilter,
        activeBlogCategory,
        currentBlogPage,
        handleBlogPageChange,
        itemsPerBlogPage,
        totalBlogPage,
        paginatedBlogPost,
        jeweleryWishlist,
        addToJeweleryWishlist,
        jeweleryAddToCart,
        addToJeweleryCart,
        jeweleryCartItemAmount,
        handleRemoveJeweleryItemWishlist,
        handleRemoveJeweleryCartItem,
        handleJeweleryCartQuantityChange,
        randomizedCakes,
        randomizedCakesSecond,
        cartCakes,
        cartCakeAmount,
        handleRemoveCake,
        handleCakeQuantityChange,
        addToCakeCart,
        wishlistCakes,
        handleRemoveCakeWishlist,
        addToCakeWishlist,
        searchTerm,
        handleSearchChange,
        searchQuery,
        handleSearch,
        jeweleryArray,
        randomizedItems,
        cakeListArray,
        addWishlistToCart,
        addToCartFromWishlist,
        isSidebarOpen,
        handleSidebarOpen,
        handleSidebarClose,
        isDropdownOpen,
        handleDropdownToggle,
        selectedBlogTags,
        handleBlogTagSelection,
        wishlistItemAmount,
        wishlistJewelleryItemAmount,
        wishlistCakeAmount,
        searchModalOpen,
        toggleOpenSearch,
        toggleCloseSearch,
      }}
    >
      {children}
    </FarzaaContext.Provider>
  );
};

export { FarzaaContext, FarzaaContextProvider };
