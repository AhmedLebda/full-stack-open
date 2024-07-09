
interface TotalProps {
    total: number
}


const Total = ({total}: TotalProps) => {
  return (
    <div>Total: {total}</div>
  )
}

export default Total