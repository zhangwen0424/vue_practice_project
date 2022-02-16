/*
 * 订单路由
 * /order
 * @Date: 2022-02-16 15:33:32
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-02-16 15:41:50
 * @FilePath: /vue_practice_project/src/router/order.js
 */
import Order from "@/pages/Order/Order";

const orderRoute = [
  {
    path: "/order",
    component: Order,
    meta: {
      title: "订单"
    }
  }
];

export default orderRoute;
