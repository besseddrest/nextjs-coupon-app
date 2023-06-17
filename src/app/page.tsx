"use client"

import CouponComponent from "@/components/Coupon"
import { useState } from "react"
import { coupons as couponData } from "../data/coupons"
import Coupon from "../interfaces/coupon"

export default function Home() {
  const [allCoupons, setAllCoupons] = useState<Coupon[]>(couponData)
  
  function handleRedeem(index: number) {
    const tempCoupons = [...allCoupons]
    tempCoupons[index].isRedeemed = !tempCoupons[index].isRedeemed
    setAllCoupons([...tempCoupons])
  }

  return (
    <main className="content flex">
      <h1>Coupon App</h1>
      <div className="total-points-available flex-auto">
        You have earned a total of X points!
      </div>
      <div className="coupons-container  flex-auto">
        <div className="available-coupons">
          {/* List of available coupons */}
          <h2>Available</h2>
          <div className="coupons">
            {
              allCoupons.map((item: Coupon, i: number) => {
                if (item.isRedeemed) return <CouponComponent handleRedeem={handleRedeem} item={item} key={i} index={i}/>
              })
            }
          </div>
        </div>
        <div className="redeemed-coupons">
          {/* List of redeemed coupons */}
          <h2>Redeemed</h2>
          <div className="coupons">
            {
              allCoupons.map((item: Coupon, i: number) => {
                if (!item.isRedeemed) return <CouponComponent handleRedeem={handleRedeem} item={item} key={i} index={i} />
              })
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
