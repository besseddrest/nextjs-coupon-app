"use client"

import Coupon from "@/components/Coupon"
import { useState } from "react"

export default function Home() {
  const tempAll = new Array(5).fill(null);
  const tempRedeemed = new Array(2).fill(null);
  const [availableCoupons, setAvailableCoupons] = useState(tempAll)
  const [redeemedCoupons, setRedeemedCoupons] = useState(tempAll)

  return (
    <main className="content">
      <h1>Coupon App</h1>
      <div className="total-points-available">
        You have earned a total of X points!
      </div>
      <div className="coupons-container">
        <div className="available-coupons">
          {/* List of available coupons */}
          <h2>Available</h2>
          <div className="coupons">
            {
              availableCoupons.map((item: any, i: number) => <Coupon key={i} />)
            }
          </div>
        </div>
        <div className="redeemed-coupons">
          {/* List of redeemed coupons */}
          <h2>Redeemed</h2>
          <div className="coupons">
            {
              redeemedCoupons.map((item: any, i: number) => <Coupon key={i} />)
            }
          </div>
          <div className="total-points-redeemed">
            Total points spent: Y
          </div>
        </div>
      </div>
    </main>
  )
}
