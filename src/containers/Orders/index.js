import React, {  useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateOrder } from "../../actions";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import "./style.css";

const Orders = () => {
  const order = useSelector((state) => state.order);
  const [type, setType] = useState('');
  const dispatch = useDispatch();

  const onOrderUpdate = (orderId) => {
    const payload = {
      orderId,
      type
    }
    dispatch(updateOrder(payload));
  }
  return (
    <Layout sidebar>
      {order.orders.map((orderItem, index) => (
        <Card key={index} headerLeft={orderItem._id}>
          <div
            style={{
              boxSizing: "border-box",
              padding: "100px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="orderTrack">
              <div className="orderStatus">
                <div className="point"></div>
                <div className="orderInfo">
                  <div className="status">Ordered</div>
                  <div className="date">Fri, 2021</div>
                </div>
              </div>
              <div className="orderStatus">
                <div className="point"></div>
                <div className="orderInfo">
                  <div className="status">Packed</div>
                  <div className="date">Fri, 2021</div>
                </div>
              </div>
              <div className="orderStatus">
                <div className="point"></div>
                <div className="orderInfo">
                  <div className="status">Ordered</div>
                  <div className="date">Fri, 2021</div>
                </div>
              </div>
              <div className="orderStatus">
                <div className="point"></div>
                <div className="orderInfo">
                  <div className="status">Ordered</div>
                  <div className="date">Fri, 2021</div>
                </div>
              </div>
            </div>

            {/* Select input to apply order action */}
            <div
              style={{
                boxSizing: "border-box",
                padding: "0 50px",
              }}
            >
              <select onChange={(e) => setType(e.target.value)}>
                <option value={""}>select status</option>
                {orderItem.orderStatus.map((status) => {
                  return (
                    <>
                      {!status.isCompleted ? (
                        <option key={status.type} value={status.type}>
                          {status.type}
                        </option>
                      ) : null}
                    </>
                  );
                })}
              </select>
            </div>

            <div
              style={{
                boxSizing: "border-box",
                padding: "0 50px",
              }}
            >
              <button onClick={() => onOrderUpdate(orderItem._id)}>Confirm</button>
            </div>
          </div>
        </Card>
      ))}
    </Layout>
  );
};

export default Orders;
