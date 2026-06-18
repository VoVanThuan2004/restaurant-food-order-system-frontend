import ModalComponent from "../../../components/ModalComponent";
import { useOrderDetail } from "../../../hooks/order/useOrderDetail";
import { Spin, Empty, Divider } from "antd";
import "./OrderDetailModal.css";
import formatCurrency from "../../../utils/formatCurrency";
import { ORDER_ITEM_STATUS_UI } from "../../../utils/order-item-status-ui";

type Props = {
  orderId: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function OrderDetailModal(props: Props) {
  const { orderId, isOpen, setIsOpen } = props;

  // Gọi hook api lấy danh sách items trong order
  const { data, isLoading } = useOrderDetail(orderId);
  const orderDetail = data?.data;

  const getStatusUI = (status: string) => {
    return ORDER_ITEM_STATUS_UI[status] || ORDER_ITEM_STATUS_UI["NEW"];
  };

  return (
    <ModalComponent
      title="Chi tiết đơn gọi món"
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      onOk={() => setIsOpen(false)}
      okText="Đóng"
      cancelText="Hủy"
      width={700}
      loading={isLoading}
    >
      {isLoading ? (
        <div className="order-detail-spinner">
          <Spin />
        </div>
      ) : !orderDetail ? (
        <Empty description="Không có dữ liệu" />
      ) : (
        <div className="order-detail-container">
          {/* Header Info */}
          <div className="order-detail-header">
            <div className="header-info">
              <div className="info-item">
                <span className="label">Bàn ăn:</span>
                <span className="value">{orderDetail.diningTableName}</span>
              </div>
              <div className="info-item">
                <span className="label">Nhân viên:</span>
                <span className="value">{orderDetail.staffName}</span>
              </div>
            </div>
          </div>

          <Divider />

          {/* Order Items */}
          <div className="order-items">
            <h3 className="items-title">Các món ăn</h3>

            {orderDetail.orderItems && orderDetail.orderItems.length > 0 ? (
              <div className="items-list">
                {orderDetail.orderItems.map((item) => (
                  <div key={item.orderItemId} className="item-card">
                    <div className="item-header">
                      <div className="item-basic">
                        <img
                          src={item.dishImage}
                          alt={item.dishName}
                          className="item-image"
                        />
                        <div className="item-info">
                          <h4 className="item-name">{item.dishName}</h4>
                          <div className="item-meta">
                            <span className="item-quantity">
                              x{item.quantity}
                            </span>
                            <span
                              className={`item-status ${getStatusUI(
                                item.currentStatus
                              ).className}`}
                            >
                              {getStatusUI(item.currentStatus).label}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="item-price">
                        {formatCurrency(item.totalPrice)}
                      </div>
                    </div>

                    {/* Variants */}
                    {item.orderItemVariants &&
                      item.orderItemVariants.length > 0 && (
                        <div className="item-variants">
                          {item.orderItemVariants.map((variant) => (
                            <div key={`${item.orderItemId}-${variant.optionId}`} className="variant-item">
                              <span className="variant-group">
                                {variant.groupName}:
                              </span>
                              <span className="variant-option">
                                {variant.optionName}
                              </span>
                              {variant.priceAdjustment > 0 && (
                                <span className="variant-price">
                                  +{formatCurrency(variant.priceAdjustment)}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                    {/* Notes */}
                    {item.notes && (
                      <div className="item-notes">
                        <span className="notes-label">Ghi chú:</span>
                        <span className="notes-text">{item.notes}</span>
                      </div>
                    )}

                    {/* Price Breakdown */}
                    <div className="item-price-breakdown">
                      <span className="price-label">Giá cơ bản:</span>
                      <span className="price-value">
                        {formatCurrency(item.basePrice)} x {item.quantity} ={" "}
                        {formatCurrency(item.basePrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Empty description="Không có món ăn" />
            )}
          </div>

          <Divider />

          {/* Total */}
          <div className="order-detail-footer">
            <div className="total-row">
              <span className="total-label">Tổng tiền:</span>
              <span className="total-value">
                {formatCurrency(orderDetail.totalPrice)}
              </span>
            </div>
          </div>
        </div>
      )}
    </ModalComponent>
  );
}
