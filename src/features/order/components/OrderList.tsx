import OrderCard from "./OrderCard";

const OrderList = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 px-5 gap-x-4">
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
    </div>
  );
};

export default OrderList;
