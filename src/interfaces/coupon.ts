export default interface Coupon {
  id: number,
  name: string,
  description: string,
  value: number,
  isRedeemed: boolean,
  handleRedeem?(index: number): void,
}