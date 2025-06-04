import { createContext, useContext, useReducer, useEffect } from 'react';
import { reviews as initialReviews } from '../data/products';

const MAX_QUANTITY_PER_PRODUCT = 9;
const MAX_CART_TOTAL = 999.99;
// Action types
const ACTION_TYPES = {
  // Cart actions
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  
  // Favorites actions
  ADD_TO_FAVORITES: 'ADD_TO_FAVORITES',
  REMOVE_FROM_FAVORITES: 'REMOVE_FROM_FAVORITES',
  TOGGLE_FAVORITE: 'TOGGLE_FAVORITE',
  CLEAR_FAVORITES: 'CLEAR_FAVORITES',
  
  // Reviews actions
  ADD_REVIEW: 'ADD_REVIEW',
  LOAD_REVIEWS: 'LOAD_REVIEWS',
  
  // Data loading actions
  LOAD_CART: 'LOAD_CART',
  LOAD_FAVORITES: 'LOAD_FAVORITES',
};

// Initial state
const initialState = {
  cart: {
    items: [],
    total: 0,
    itemCount: 0,
  },
  favorites: {
    items: [],
    count: 0,
  },
  reviews: {
    items: initialReviews,
  },
};

// Utility functions
const calculateCartTotals = (items) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  return { total, itemCount };
};

const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

const loadFromLocalStorage = (key, fallback = null) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return fallback;
  }
};

// Reducer function
function appReducer(state, action) {
  switch (action.type) {
    // Cart actions
    case ACTION_TYPES.ADD_TO_CART: {
    const existingItem = state.cart.items.find(item => item.id === action.payload.id);
    
    let newItems;
    if (existingItem) {
      // Check max quantity limit
      if (existingItem.quantity >= MAX_QUANTITY_PER_PRODUCT) {
        return state; // Don't add if already at max
      }
      
      newItems = state.cart.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY_PER_PRODUCT) }
          : item
      );
    } else {
      newItems = [...state.cart.items, { ...action.payload, quantity: 1 }];
    }
    
    const { total, itemCount } = calculateCartTotals(newItems);
    
    // Check max cart total limit
    if (total > MAX_CART_TOTAL) {
      return state; // Don't add if exceeds max total
    }
    
    return {
      ...state,
      cart: {
        items: newItems,
        total,
        itemCount,
      },
    };
  }
    
    case ACTION_TYPES.REMOVE_FROM_CART: {
      const newItems = state.cart.items.filter(item => item.id !== action.payload);
      const { total, itemCount } = calculateCartTotals(newItems);
      
      return {
        ...state,
        cart: {
          items: newItems,
          total,
          itemCount,
        },
      };
    }
    
    
    case ACTION_TYPES.UPDATE_QUANTITY: {
      if (action.payload.quantity < 1 || action.payload.quantity > MAX_QUANTITY_PER_PRODUCT) {
        return state;
      }
      
      const newItems = state.cart.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.min(action.payload.quantity, MAX_QUANTITY_PER_PRODUCT) }
          : item
      );
      
      const { total, itemCount } = calculateCartTotals(newItems);
      
      // Check max cart total limit
      if (total > MAX_CART_TOTAL) {
        return state; // Don't update if exceeds max total
      }
      
      return {
        ...state,
        cart: {
          items: newItems,
          total,
          itemCount,
        },
      };
    }
    
    case ACTION_TYPES.CLEAR_CART:
      return {
        ...state,
        cart: {
          items: [],
          total: 0,
          itemCount: 0,
        },
      };
    
    case ACTION_TYPES.LOAD_CART: {
      const { total, itemCount } = calculateCartTotals(action.payload);
      return {
        ...state,
        cart: {
          items: action.payload,
          total,
          itemCount,
        },
      };
    }
    
    // Favorites actions
    case ACTION_TYPES.ADD_TO_FAVORITES: {
      const isAlreadyFavorite = state.favorites.items.find(item => item.id === action.payload.id);
      if (isAlreadyFavorite) return state;
      
      const newItems = [...state.favorites.items, action.payload];
      return {
        ...state,
        favorites: {
          items: newItems,
          count: newItems.length,
        },
      };
    }
    
    case ACTION_TYPES.REMOVE_FROM_FAVORITES: {
      const newItems = state.favorites.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        favorites: {
          items: newItems,
          count: newItems.length,
        },
      };
    }
    
    case ACTION_TYPES.TOGGLE_FAVORITE: {
      const isCurrentlyFavorite = state.favorites.items.find(item => item.id === action.payload.id);
      let newItems;
      
      if (isCurrentlyFavorite) {
        newItems = state.favorites.items.filter(item => item.id !== action.payload.id);
      } else {
        newItems = [...state.favorites.items, action.payload];
      }
      
      return {
        ...state,
        favorites: {
          items: newItems,
          count: newItems.length,
        },
      };
    }
    
    case ACTION_TYPES.CLEAR_FAVORITES:
      return {
        ...state,
        favorites: {
          items: [],
          count: 0,
        },
      };
    
    case ACTION_TYPES.LOAD_FAVORITES:
      return {
        ...state,
        favorites: {
          items: action.payload,
          count: action.payload.length,
        },
      };
    
    // Reviews actions
    case ACTION_TYPES.ADD_REVIEW:
      return {
        ...state,
        reviews: {
          items: [...state.reviews.items, action.payload],
        },
      };
    
    case ACTION_TYPES.LOAD_REVIEWS:
      return {
        ...state,
        reviews: {
          items: action.payload,
        },
      };
    
    default:
      return state;
  }
}

// Context
const AppContext = createContext();

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  // Load data from localStorage on mount
  useEffect(() => {
    const savedCart = loadFromLocalStorage('cart', []);
    const savedFavorites = loadFromLocalStorage('favorites', []);
    const savedReviews = loadFromLocalStorage('reviews', initialReviews);
    
    if (savedCart.length > 0) {
      dispatch({ type: ACTION_TYPES.LOAD_CART, payload: savedCart });
    }
    
    if (savedFavorites.length > 0) {
      dispatch({ type: ACTION_TYPES.LOAD_FAVORITES, payload: savedFavorites });
    }
    
    if (savedReviews.length > 0) {
      dispatch({ type: ACTION_TYPES.LOAD_REVIEWS, payload: savedReviews });
    }
  }, []);
  
  // Save to localStorage when state changes
  useEffect(() => {
    saveToLocalStorage('cart', state.cart.items);
  }, [state.cart.items]);
  
  useEffect(() => {
    saveToLocalStorage('favorites', state.favorites.items);
  }, [state.favorites.items]);
  
  useEffect(() => {
    saveToLocalStorage('reviews', state.reviews.items);
  }, [state.reviews.items]);
  
  // Cart actions
  const addToCart = (product) => {
    dispatch({ type: ACTION_TYPES.ADD_TO_CART, payload: product });
  };
  
  const removeFromCart = (productId) => {
    dispatch({ type: ACTION_TYPES.REMOVE_FROM_CART, payload: productId });
  };
  
  const updateQuantity = (productId, quantity) => {
    dispatch({ type: ACTION_TYPES.UPDATE_QUANTITY, payload: { id: productId, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: ACTION_TYPES.CLEAR_CART });
  };
  
  // Favorites actions
  const addToFavorites = (product) => {
    dispatch({ type: ACTION_TYPES.ADD_TO_FAVORITES, payload: product });
  };
  
  const removeFromFavorites = (productId) => {
    dispatch({ type: ACTION_TYPES.REMOVE_FROM_FAVORITES, payload: productId });
  };
  
  const toggleFavorite = (product) => {
    dispatch({ type: ACTION_TYPES.TOGGLE_FAVORITE, payload: product });
  };
  
  const clearFavorites = () => {
    dispatch({ type: ACTION_TYPES.CLEAR_FAVORITES });
  };
  
  const isFavorite = (productId) => {
    return state.favorites.items.some(item => item.id === productId);
  };
  
  // Reviews actions
  const addReview = (review) => {
    dispatch({ type: ACTION_TYPES.ADD_REVIEW, payload: review });
  };
  
  const getReviewsByProduct = (productId) => {
    return state.reviews.items.filter(review => review.productId === productId);
  };
  
  const getAverageRating = (productId) => {
    const productReviews = getReviewsByProduct(productId);
    if (productReviews.length === 0) return 0;
    
    const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / productReviews.length;
  };

    const getMaxQuantity = () => MAX_QUANTITY_PER_PRODUCT;
    const getMaxCartTotal = () => MAX_CART_TOTAL;
    const isAtMaxQuantity = (productId) => {
    const item = state.cart.items.find(item => item.id === productId);
    return item ? item.quantity >= MAX_QUANTITY_PER_PRODUCT : false;
    };
    const isNearMaxTotal = () => state.cart.total > MAX_CART_TOTAL * 0.9;

  
  const value = {
    // State
    cartItems: state.cart.items,
    cartTotal: state.cart.total,
    itemCount: state.cart.itemCount,
    favorites: state.favorites.items,
    favoritesCount: state.favorites.count,
    reviews: state.reviews.items,
    
    // Cart actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getMaxQuantity,
    getMaxCartTotal,
    isAtMaxQuantity,
    isNearMaxTotal,
    
    // Favorites actions
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    clearFavorites,
    isFavorite,
    
    // Reviews actions
    addReview,
    getReviewsByProduct,
    getAverageRating,
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hooks for specific domains
export const useCart = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useCart must be used within an AppProvider');
  }
  
  return {
    cartItems: context.cartItems,
    cartTotal: context.cartTotal,
    itemCount: context.itemCount,
    addToCart: context.addToCart,
    isAtMaxQuantity: context.isAtMaxQuantity,
    getMaxQuantity: context.getMaxQuantity,
    getMaxCartTotal: context.getMaxCartTotal,
    isNearMaxTotal: context.isNearMaxTotal,
    removeFromCart: context.removeFromCart,
    updateQuantity: context.updateQuantity,
    clearCart: context.clearCart,
  };
};

export const useFavorites = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useFavorites must be used within an AppProvider');
  }
  
  return {
    favorites: context.favorites,
    favoritesCount: context.favoritesCount,
    addToFavorites: context.addToFavorites,
    removeFromFavorites: context.removeFromFavorites,
    toggleFavorite: context.toggleFavorite,
    clearFavorites: context.clearFavorites,
    isFavorite: context.isFavorite,
  };
};

export const useReviews = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useReviews must be used within an AppProvider');
  }
  
  return {
    reviews: context.reviews,
    addReview: context.addReview,
    getReviewsByProduct: context.getReviewsByProduct,
    getAverageRating: context.getAverageRating,
  };
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};