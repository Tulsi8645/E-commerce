import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useAuth } from "@/context/auth-context";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useShopOrderStore } from "@/store/shop-order-store";
import { Navigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useShopCartStore } from "@/store/shop-cart-store";
function ShoppingCheckout() {
  const { cartItems } = useShopCartStore();
  const { user } = useAuth();
  const { approvalURL, orderId, createNewOrder, createCodOrder } = useShopOrderStore();
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const { toast } = useToast();

  console.log(currentSelectedAddress, "cartItems");

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  function handleCheckout() {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });

      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });

      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: paymentMethod,
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    if (paymentMethod === "paypal") {
      createNewOrder(orderData).then((data) => {
        console.log(data, "sangam");
        if (data?.payload?.success) {
          setIsPaymemntStart(true);
        } else {
          setIsPaymemntStart(false);
        }
      });
    } else if (paymentMethod === "cod") {
      createCodOrder(orderData).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Order placed successfully with Cash on Delivery!",
            description: "Your order has been confirmed.",
          });
          window.location.href = "/shop/payment-success";
        } else {
          toast({
            title: "Failed to place order",
            description: data?.payload?.message || "Please try again",
            variant: "destructive",
          });
        }
      });
    }
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <Label className="font-semibold">Select Payment Method</Label>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="flex flex-col gap-3"
            >
              <div className="flex items-center space-x-2 border p-3 rounded-lg cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal" className="cursor-pointer flex-1">
                  Pay with PayPal
                </Label>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-lg cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod" className="cursor-pointer flex-1">
                  Cash on Delivery (COD)
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleCheckout} className="w-full">
              {isPaymentStart
                ? "Processing Payment..."
                : paymentMethod === "cod"
                ? "Place Order (Cash on Delivery)"
                : "Checkout with PayPal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
