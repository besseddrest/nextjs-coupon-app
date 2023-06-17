import Coupon from "@/interfaces/coupon"

export default function CouponComponent(props: { item: Coupon, handleRedeem(index: number): void, index: number }) {
  const { id, name, description, value } = props.item
  const handleReem = props.handleRedeem;
  const index = props.index
  return (
    <div id={`item-${ id }`} className="coupon">
      <h3>{ name }</h3>
      <p>
        { description }
      </p>
      <div className="coupon__value">{ value } pts</div>
      <button onClick={() => handleReem(index) }>Redeem</button>
    </div>
  )
}