import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Counter = ({ end }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div ref={ref}>
      {inView && <CountUp start={0} end={end} duration={2.5} separator="," />}
    </div>
  );
};

export default Counter;
