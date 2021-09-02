import React from "react";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import "./style.css"

const Orders = () => {
  return (
    <Layout sidebar>
      <Card headerLeft="ORDER_ID">
        <div
          style={{
            boxSizing: "border-box",
            padding: "100px",
          }}
        >
          <div className="orderTrack">
            <div className="orderStatus">
                <div className="point">
                    <div className="orderInfo">
                        <div className="status">Ordered</div>
                        <div className="date">Fri, 2021</div>
                    </div>
                </div>
            </div>
            <div className="orderStatus">
                <div className="point">
                    <div className="orderInfo">
                        <div className="status">Packed</div>
                        <div className="date">Fri, 2021</div>
                    </div>
                </div>
            </div>
            <div className="orderStatus">
                <div className="point">
                    <div className="orderInfo">
                        <div className="status">Ordered</div>
                        <div className="date">Fri, 2021</div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </Card>
    </Layout>
  );
};

export default Orders;
