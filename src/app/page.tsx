"use client"

import CouponComponent from "@/components/Coupon"
import { useEffect, useState } from "react"
import { coupons as couponData } from "../data/coupons"
import Coupon from "../interfaces/coupon"

const AVAILABLE_BALANCE = 25000;

export default function Home() {
  const [allCoupons, setAllCoupons] = useState<Coupon[]>(couponData)
  const [balance, setBalance] = useState<number>(AVAILABLE_BALANCE)
  const [totalRedeemed, setTotalRedeemed] = useState<number | null>(null)

  function handleRedeem(index: number) {
    const tempCoupons = [...allCoupons]
    let pointsRedeemed = tempCoupons[index].value;

    tempCoupons[index].isRedeemed = !tempCoupons[index].isRedeemed
    calculateBalances(pointsRedeemed);
    setAllCoupons([...tempCoupons])
  }

  function calculateBalances(points: number) {
    setBalance(balance - points);
    setTotalRedeemed(totalRedeemed ? totalRedeemed + points : points);    
  }

  useEffect(() => {
    let pointsRedeemed = 0

    allCoupons.forEach((item: Coupon) => {
      if (item.isRedeemed) {
        pointsRedeemed = pointsRedeemed + item.value
      }
    })

    setTotalRedeemed(pointsRedeemed)
  }, [allCoupons])

  return (
    <main className="content">
      <h1>Coupon App</h1>
      <div className="total-points-available flex-auto">
        You have earned a total of { balance } points!
      </div>
      <div className="coupons-container flex">
        <div className="available-coupons flex-auto">
          {/* List of available coupons */}
          <h2>Available</h2>
          <div className="coupons">
            {
              allCoupons.map((item: Coupon, i: number) => {
                if (!item.isRedeemed) return <CouponComponent handleRedeem={handleRedeem} item={item} key={i} index={i}/>
              })
            }
          </div>
        </div>
        <div className="redeemed-coupons flex-auto">
          {/* List of redeemed coupons */}
          <h2>Redeemed</h2>
          <div className="coupons">
            {
              allCoupons.map((item: Coupon, i: number) => {
                if (item.isRedeemed) return <CouponComponent handleRedeem={handleRedeem} item={item} key={i} index={i} />
              })
            }
          </div>
          <div className="total-points-redeemed">
            Total points spent: { totalRedeemed }
          </div>
        </div>
      </div>
    </main>
  )
}
