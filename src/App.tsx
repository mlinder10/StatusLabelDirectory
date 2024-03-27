import useMonday from "./hooks/useMonday"

export default function App() {
  const { bid } = useMonday()

  return <div>Hello World {bid}</div>
}