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

  useEffect(() => {
    let pointsRedeemed = 0

    allCoupons.forEach((item: Coupon) => {
      if (item.isRedeemed) {
        pointsRedeemed = pointsRedeemed + item.value
      }
    })

    setTotalRedeemed(pointsRedeemed)
  }, [allCoupons])

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

  return (
    <main className="content h-full p-4">
      <h1 className="font-bold text-4xl mb-2">Coupon App</h1>
      <div className="total-points-available flex-auto mb-4">
        You have earned a total of <span className="font-bold text-xl">{ balance }</span> points!
      </div>
      <div className="coupons-container flex">
        <div className="available-coupons flex-auto w-2/4 pr-4">
          {/* List of available coupons */}
          <h2 className="font-bold text-2xl mb-4">Available</h2>
          <div className="coupons">
            {
              allCoupons.map((item: Coupon, i: number) => {
                if (!item.isRedeemed) return <CouponComponent handleRedeem={handleRedeem} item={item} key={i} index={i}/>
              })
            }
          </div>
        </div>
        <div className="redeemed-coupons flex-auto w-2/4 pl-4">
          {/* List of redeemed coupons */}
          <h2 className="font-bold text-2xl mb-4">Redeemed</h2>
          <div className="coupons">
            {
              allCoupons.map((item: Coupon, i: number) => {
                if (item.isRedeemed) return <CouponComponent handleRedeem={handleRedeem} item={item} key={i} index={i} />
              })
            }
          </div>
          <div className="total-points-redeemed">
            Total points spent: <span className="font-bold text-lg text-red-700">{ totalRedeemed }</span>
          </div>
        </div>
      </div>
    </main>
  )
}
