import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
    const { user } = useAuth();

    const [allCarts, setAllCarts] = useState(() => {
        const saved = localStorage.getItem("minishop_carts");
        return saved ? JSON.parse(saved) : {};
    });

    const userId = user?.id;

    const cartItems = userId
        ? allCarts[userId] || []
        : [];

    useEffect(() => {
        localStorage.setItem(
            "minishop_carts",
            JSON.stringify(allCarts)
        );
    }, [allCarts]);

    const addToCart = (product) => {
        if (!userId) return;

        setAllCarts((previous) => {
            const currentCart = previous[userId] || [];

            const existingProduct = currentCart.find(
                (item) => item.id === product.id
            );

            let updatedCart;

            if (existingProduct) {
                updatedCart = currentCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                updatedCart = [
                    ...currentCart,
                    { ...product, quantity: 1 },
                ];
            }

            return {
                ...previous,
                [userId]: updatedCart,
            };
        });
    };

    const decreaseQuantity = (productId) => {
        if (!userId) return;

        setAllCarts((previous) => {
            const currentCart = previous[userId] || [];

            const updatedCart = currentCart
                .map((item) =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0);

            return {
                ...previous,
                [userId]: updatedCart,
            };
        });
    };

    const removeFromCart = (productId) => {
        if (!userId) return;

        setAllCarts((previous) => ({
            ...previous,
            [userId]: (previous[userId] || []).filter(
                (item) => item.id !== productId
            ),
        }));
    };

    const clearCart = () => {
        if (!userId) return;

        setAllCarts((previous) => ({
            ...previous,
            [userId]: [],
        }));
    };

    const increaseQuantity = (productId) => {
        if (!userId) return;

        setAllCarts((previous) => {
            const currentCart = previous[userId] || [];

            const updatedCart = currentCart.map((item) =>
                item.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );

            return {
                ...previous,
                [userId]: updatedCart,
            };
        });
    };

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const cartTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartCount,
                cartTotal,
                addToCart,
                decreaseQuantity,
                removeFromCart,
                clearCart,
                increaseQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}