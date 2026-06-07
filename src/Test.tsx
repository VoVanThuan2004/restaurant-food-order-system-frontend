import { useCountStore } from "./stores/counterStore";

function Test() {
  // const [count, setCount] = useState(0);

  // const handleIncrease = () => {
  //   setCount((c) => c + 1);
  // }

  const count = useCountStore((state) => state.count);

  const handleIncrease = useCountStore((state) => state.increase);
  const handleDecrease = useCountStore((state) => state.decrease);
  const reset = useCountStore((state) => state.reset);

  return (
    <div>
      <p>Count: {count}</p>
      <button className="bg-orange-500 px-2 py-1.5" onClick={handleIncrease}>
        +
      </button>
      <button className="bg-blue-500 px-2 py-1.5" onClick={handleDecrease}>
        -
      </button>
      <button className="bg-red-500 px-2 py-1.5" onClick={reset}>
        Reset
      </button>
    </div>
  );
}

export default Test;
