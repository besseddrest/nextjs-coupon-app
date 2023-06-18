import Coupon from "@/interfaces/coupon"

export default function CouponComponent(props: { item: Coupon, handleRedeem(index: number): void, index: number }) {
  const { id, name, description, value, isRedeemed } = props.item
  const handleRedeem = props.handleRedeem;
  const index = props.index
  return (
    <div id={`item-${ id }`} className="coupon mb-4 px-3 py-2 rounded border border-black bg-white">
      <h3 className="font-bold text-lg">{ name }</h3>
      <p className="mb-2">
        { description }
      </p>
      <div className="coupon__value mb-2"><span className="text-green-600 font-bold text-lg">{ value }</span> pts</div>
      {
        !isRedeemed
          ? <button className="mb-2 text-white bg-blue-600 border-white rounded px-3 py-2" onClick={() => handleRedeem(index) }>Redeem</button>
          : <button className="mb-2 text-white bg-gray-600 border-white rounded px-3 py-2" onClick={() => handleRedeem(index) }>Undo Redeem</button>
      }
    </div>
  )
}