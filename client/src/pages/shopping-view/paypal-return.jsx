import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useShopOrderStore } from "@/store/shop-order-store";
import { useLocation } from "react-router-dom";

function PaypalReturnPage() {
  const { capturePayment } = useShopOrderStore();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

      capturePayment({ paymentId, payerId, orderId }).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shop/payment-success";
        }
      });
    }
  }, [paymentId, payerId, capturePayment]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment...Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaypalReturnPage;
